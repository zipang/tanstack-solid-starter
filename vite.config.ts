import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// Add automatic support for tsconfig path aliases to Vite
		tsconfigPaths(),
		// Automatically generate the routeTree
		TanStackRouterVite({ target: "solid", autoCodeSplitting: true }),
		solidPlugin(),
	],
});
