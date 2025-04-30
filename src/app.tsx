import { SessionContext } from "@components/auth";
import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { render } from "solid-js/web";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";

const session = new SessionContext();

const router = createRouter({
	context: {
		session
	},
	routeTree,
	// routes will be preloaded by default when the user hovers over a link or a `touchstart` event is detected on a `<Link>`.
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true
});

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

const rootElement = document.getElementById("app");
if (rootElement) {
	render(() => <App />, rootElement);
}
