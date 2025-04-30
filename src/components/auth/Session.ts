import { authClient } from "@lib/auth";
import { parseJSONString } from "@utils/validation";
import { Store, useStore } from "@tanstack/solid-store";
import { isServer } from "solid-js/web";
import { validateSession } from "./SessionSchema";

export interface SessionUser {
	id: string;
	name: string;
	email: string;
	image?: string;
}

interface EmptySession {
	status: "empty";
	user: null;
	token: null;
	created: null;
	expires: null;
}
interface PendingSession {
	status: "pending";
	user: null;
	token: null;
	created: null;
	expires: null;
}
export interface LiveSession {
	status: "alive";
	user: SessionUser;
	token: string;
	created: string;
	expires: string;
}

export type SessionState = EmptySession | PendingSession | LiveSession;

const EMPTY_SESSION = {
	status: "empty",
	user: null,
	token: null,
	created: null,
	expires: null
} as SessionState;

const PENDING_SESSION = {
	status: "pending",
	user: null,
	token: null,
	created: null,
	expires: null
} as SessionState;

/**
 * Store the session state and provides some utility methods to read and manipulate it.
 * Automatically persists the session to sessionStorage on state changes.
 */
export class SessionContext {
	private store: Store<SessionState, (cb: SessionState) => SessionState>;

	constructor() {
		// 1. Initialize state from sessionStorage (or default to EMPTY)
		const initialValue = isServer
			? EMPTY_SESSION // Avoid accessing sessionStorage on server
			: parseJSONString<SessionState>(
					sessionStorage.getItem("session"),
					validateSession,
					EMPTY_SESSION
				);

		this.store = new Store(initialValue);

		// 2. Subscribe to store changes to automatically persist
		if (!isServer) {
			this.store.subscribe(() => {
				this.writeToLocalStorage();
			});
		}

		console.log(
			"Created new session context with initial state:",
			initialValue.status
		);
	}

	/**
	 * Writes the current session state to sessionStorage.
	 * If the session status is not 'alive', it removes the item.
	 * Does nothing on the server.
	 */
	private writeToLocalStorage() {
		if (isServer) {
			return;
		}

		const currentState = this.store.state;
		try {
			switch (currentState.status) {
				case "pending":
					// This is a temporary state. Do nothing
					return;

				case "empty":
					sessionStorage.removeItem("session");
					break;

				case "alive":
					sessionStorage.setItem("session", JSON.stringify(currentState));
					console.info("Session persisted to sessionStorage:", currentState); // Optional: for debugging
			}
		} catch (error) {
			console.error(
				"Failed to stringify or save session to sessionStorage:",
				error
			);
			// Remove potentially corrupted data
			sessionStorage.removeItem("session");
		}
	}

	/**
	 * TRUE when nothing is known about the session or when there is NO logged user
	 */
	isEmpty = () => useStore(this.store, ({ status }) => status === "empty")();

	/**
	 * Shortly TRUE after a new signIn() before we retrieve the session data
	 */
	isPending = () => useStore(this.store, ({ status }) => status === "pending")();

	/**
	 * TRUE when the session is active with a logged user
	 */
	isLive = () => useStore(this.store, ({ status }) => status === "alive")();

	/**
	 * Retrieves the _current_ User or NULL if the session is not alive
	 */
	user = () => useStore(this.store, (session) => session.user)();

	/**
	 * Access some internal data like the token and expiration date, NULL if the session is not active
	 */
	data = () =>
		useStore(this.store, ({ status, created, expires, token }) =>
			status === "alive" ? { created, expires, token } : null
		)();

	/**
	 * Force refreshing the current session status by calling the API
	 */
	refresh() {
		if (isServer) {
			return;
		}

		// Set to pending only if currently empty, otherwise keep current state while refreshing
		if (this.isEmpty()) {
			this.setPending(); // Note: setPending already updates the store, triggering writeToLocalStorage
		}

		authClient
			.getSession()
			.then(({ data, error }) => {
				console.log("Session retrieval result:", { data, error });
				if (data?.user && data?.session) {
					// Ensure both user and session data exist
					const user = data.user as SessionUser; // Assuming API returns compatible structure
					const session: LiveSession = {
						status: "alive",
						user,
						token: data.session.token,
						// Ensure dates are consistently stored as ISO strings
						created: new Date(data.session.createdAt).toISOString(),
						expires: new Date(data.session.expiresAt).toISOString()
					};

					// Validate before setting state (optional but good practice)
					try {
						const validatedSession = validateSession(session);
						this.store.setState(() => validatedSession);
						// Persistence is handled by the store subscription
					} catch (validationError) {
						console.error(
							"Session validation failed after refresh:",
							validationError
						);
						this.store.setState(() => EMPTY_SESSION);
						// Persistence is handled by the store subscription
					}
					return;
				}

				if (error) {
					// Don't throw here, just log and reset session
					console.error(`Session retrieval error: ${error.message}`, error);
				} else {
					console.log(
						"refresh() returned an empty or invalid session structure."
					);
				}

				// If no valid data or an error occurred, reset to empty
				this.store.setState(() => EMPTY_SESSION);
				// Persistence is handled by the store subscription
			})
			.catch((error) => {
				// Catch potential network errors or unhandled promise rejections
				console.error(
					`Unexpected error during session retrieval: ${error.message}`,
					error
				);
				this.store.setState(() => EMPTY_SESSION);
				// Persistence is handled by the store subscription
			});
	}

	/**
	 * Transition to the PENDING status (waiting for session refresh)
	 */
	setPending() {
		// Only transition from empty to pending
		if (this.store.state.status === "empty") {
			this.store.setState(() => PENDING_SESSION);
			// Persistence is handled by the store subscription
		}
	}

	/**
	 * Close the current session and force the user to log in again
	 */
	signOut() {
		if (!isServer) {
			authClient.signOut(); // Sign out on the client
		}
		this.store.setState(() => EMPTY_SESSION);
		// Persistence is handled by the store subscription
	}

	/**
	 * Update the session state.
	 * Pass `null` to reset the session to its empty state.
	 * Use Partial<LiveSession> carefully, ensure resulting state is valid.
	 */
	update(updated: Partial<LiveSession> | null) {
		if (updated === null) {
			this.store.setState(() => EMPTY_SESSION);
			// Persistence is handled by the store subscription
			return;
		}

		try {
			// Create the potential new state and validate it
			const nextState = validateSession({ ...this.store.state, ...updated });
			this.store.setState(() => nextState);
			// Persistence is handled by the store subscription
			console.info("Session updated", this.store.state); // Log the state *after* update
		} catch (err) {
			console.warn("Session update failed validation:", (err as Error).message);
			// Optionally reset or revert, but for now, just log and don't change state
		}
	}
}
