import { AppHeader } from "@components/app";
import { Box, Button, Container, Heading, Text, VStack } from "@components/base";
import { useSession } from "@lib/auth/useSession";
import { type RouteComponent, createFileRoute } from "@tanstack/solid-router";

const TITLE = "Dashboard";

const loader = async () => {
	// TODO: Implement fetching the User dashboard data
	return null;
};

const DashboardPage: RouteComponent = (props) => {
	const session = useSession();

	return (
		<main>
			<AppHeader />

			<Box as="section" height="dvh" border="1px solid #ccc">
				<Container>
					<Heading color="black">{TITLE}</Heading>
					<VStack>
						<Text>
							This is a protected route. Try login out to be automatically
							redirect to the login page.
						</Text>
						<Button
							variant="outline"
							size="xl"
							disabled={props.loading}
							onClick={() => session.signOut()}
						>
							Logout
						</Button>
						<Text>
							Try clicking the button below to set the logged user to John
							DOE.
						</Text>
						<Button
							variant="outline"
							size="xl"
							disabled={props.loading}
							onClick={() =>
								session.update({
									token: "token",
									expires: new Date().toISOString(),

									user: {
										id: "1",
										email: "john.doe@johns.com",
										name: "John DOE",
										image: "https://avatars.githubusercontent.com/u/149215215?v=4"
									}
								})
							}
						>
							Log John Doe
						</Button>
					</VStack>
				</Container>
			</Box>
		</main>
	);
};

/**
 * Export a file route for the path /dashboard
 */
export const Route = createFileRoute("/_protected/dashboard")({
	loader,
	component: DashboardPage
});
