import { createAuthClient } from "better-auth/client";
import { isDev } from "solid-js/web";

export const authClient = createAuthClient({
	baseURL: isDev ? "http://localhost:3000" : undefined,
	basePath: "/api/auth"
});
