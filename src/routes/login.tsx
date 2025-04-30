import { AppHeader, AppLayout } from "@components/app";
import { AppleLogin, GithubLogin, GoogleLogin, MicrosoftLogin } from "@components/auth";
import { Box, Button, Container, Heading, VStack } from "@components/base";
import { useSession } from "@lib/auth/useSession";
import { type RouteComponent, createFileRoute } from "@tanstack/solid-router";
import type { Component } from "solid-js";

const TITLE = "SolidJS + Panda UI Starter - LOGIN";

const QuickLogin: Component = () => {
	const session = useSession();
	const login = () => {
		session.setPending();
		console.log("Switching to pending...", session.isPending());

		setTimeout(() => {
			const now = Date.now();
			const expires_in = now + 1000 * 60 * 60 * 24 * 7;
			session.update({
				status: "alive",
				created: new Date(now).toISOString(),
				expires: new Date(expires_in).toISOString(),
				token: "1",
				user: {
					id: "1",
					name: "John Doe",
					image: "https://avatars.githubusercontent.com/u/149215215?v=4",
					email: "john.doe@johns.com"
				}
			});
			console.log("Switching to alive...", session.isLive());
		}, 2000);
	};

	return (
		<Button variant="outline" onClick={login} width="100%">
			Quick Login
		</Button>
	);
};

const LoginPage: RouteComponent = () => (
	<AppLayout title={TITLE}>
		<main>
			<AppHeader />

			<Box as="section" height="dvh" bgColor="#eee">
				<Container>
					<Heading color="black">{TITLE}</Heading>
					<VStack
						border="2px solid #333"
						bgColor="white"
						minHeight="50vh"
						maxW="30rem"
						padding="2rem"
						gap="2rem"
					>
						<AppleLogin />
						<GithubLogin />
						<GoogleLogin />
						<MicrosoftLogin />
						<QuickLogin />
					</VStack>
				</Container>
			</Box>
		</main>
	</AppLayout>
);

/**
 * Export a file route for the path /login
 */
export const Route = createFileRoute("/login")({
	component: LoginPage
});
