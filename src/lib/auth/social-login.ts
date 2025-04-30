import { useSession } from "@lib/auth/useSession";
import { authClient } from "./auth-client";

export type SocialProviderKey = "google" | "apple" | "github" | "microsoft";

/**
 * Extract the `?redirect` parameter from the current window URL
 */
function extractRedirectURL() {
	const currentLocation = new URL(window.location.href);
	const redirect = new URLSearchParams(currentLocation.search).get("redirect");

	if (redirect) {
		return new URL(redirect, currentLocation).href;
	}

	// No redirect : take the current URL as the redirect target
	return currentLocation.origin;
}

type SignInProps = typeof authClient.signIn.social;

/**
 * Generate the Event Handler to triger a social login with the specified provider
 * @param provider
 * @returns () => void
 */
const makeSocialSignIn = (provider: SocialProviderKey) => async (props: SignInProps) => {
	const session = useSession();
	console.log("Retrieved the session instance");

	session.setPending();

	const resp = await authClient.signIn.social({
		...props,
		provider,
		callbackURL: extractRedirectURL()
	});

	console.log("makeSocialSignIn response", JSON.stringify(resp, null, "\t"));
	return resp;
};

export const googleSignIn = makeSocialSignIn("google");
export const appleSignIn = makeSocialSignIn("apple");
export const githubSignIn = makeSocialSignIn("github");
export const microsoftSignIn = makeSocialSignIn("microsoft");
