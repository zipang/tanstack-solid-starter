import { Avatar, Link } from "@components/base";
import { useSession } from "@lib/auth/useSession";
import { type Component, Show } from "solid-js";

export const LoginButton: Component = () => (
	<Link
		to="/login"
		params={{
			redirect: "/dashboard"
		}}
		preload="intent"
		fontWeight="bolder"
		textDecoration="none"
	>
		LOGIN
	</Link>
);

/**
 * Display an Avatar for the currently logged User
 * or the LOGIN button
 */
export const UserActions: Component = () => {
	const session = useSession();

	return (
		<Show when={!session.isEmpty()} fallback={<LoginButton />}>
			<Show when={session.isLive()} fallback={<div>Loading...</div>}>
				<Avatar image={session.user()?.image} name={session.user()?.name} />
			</Show>
		</Show>
	);
};

export default UserActions;
