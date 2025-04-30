import type { SessionContext } from "@components/auth";
import { useRouteContext } from "@tanstack/solid-router";

export const useSession: () => SessionContext = () => {
	const routeContext = useRouteContext({ from: "__root__" });
	return routeContext().session;
};
