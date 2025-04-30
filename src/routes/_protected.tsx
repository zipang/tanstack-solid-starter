import { createFileRoute, redirect } from "@tanstack/solid-router";

/**
 * Parent of all protected routes (doesn't create a path)
 */
export const Route = createFileRoute("/_protected")({
	/**
	 * Before loading any data, check that the session is alive
	 * This will also happen during prefetching (e.g. hovering over links, etc)
	 */
	beforeLoad: ({ context, location }) => {
		const session = context.session;

		// If the user is logged out, redirect them to the login page
		if (session.isEmpty()) {
			throw redirect({
				to: "/login",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href
				}
			});
		}

		session.refresh();
	}
});
