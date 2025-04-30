import { createEffect, createSignal } from "solid-js";

export function useSessionStorage<T>(key: string, initialValue: T) {
	const [state, setState] = createSignal<T>(
		(() => {
			const stored = sessionStorage.getItem(key);
			return stored && stored !== "undefined" ? JSON.parse(stored) : initialValue;
		})()
	);

	createEffect(() => {
		// Store the new serialized value any time setState() is called
		sessionStorage.setItem(key, JSON.stringify(state()));
	});

	return [state, setState];
}
