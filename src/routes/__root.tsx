import type { SessionContext } from "@components/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/solid-router";
import { Show, lazy } from "solid-js";
import { isDev, isServer } from "solid-js/web";

const Devtools = lazy(() => import("@components/dev/DevTools"));

interface ApplicationContext {
	session: SessionContext;
}

export const Route = createRootRouteWithContext<ApplicationContext>()({
	component: RootComponent
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<Show when={isDev && !isServer}>
				<Devtools />
			</Show>
		</>
	);
}
