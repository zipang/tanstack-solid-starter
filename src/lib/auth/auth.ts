import { betterAuth } from "better-auth";

const SECRETS = [
	"GITHUB_CLIENT_ID",
	"GITHUB_CLIENT_SECRET",
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET"
];

const ENV = import.meta.env;

type EnvStatus = [boolean, string];

export const checkEnvironnement: () => EnvStatus = () => {
	const missingSecrets = SECRETS.filter((secret) => !(secret in ENV));

	if (missingSecrets.length > 0) {
		return [
			false,
			`Missing environnement variables. 
Add the required variables to your env: 
'${missingSecrets.join("', '")}'`
		];
	}

	return [true, "Environment variables are present!"];
};

const {
	GITHUB_CLIENT_ID = "unknown",
	GITHUB_CLIENT_SECRET = "unknown",
	GOOGLE_CLIENT_ID = "unknown",
	GOOGLE_CLIENT_SECRET = "unknown"
} = ENV;

export const auth = betterAuth({
	basePath: "/api/auth",
	session: {
		// @see https://www.better-auth.com/docs/guides/optimizing-for-performance#cookie-cache
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60 // Cache duration in seconds
		}
	},
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	}
});
