import { AppHeader, AppLayout } from "@components/app";
import { Container, Heading, Link, Text } from "@components/base";
import { BackgroundImage, HeroSection, TwoColumnsSection } from "@components/ui";
import { createFileRoute } from "@tanstack/solid-router";

const TITLE = "Home";

const HomePage = () => (
	<AppLayout title={TITLE}>
		<main>
			<AppHeader />

			<HeroSection
				title={TITLE}
				subtitle="Create something great"
				backgroundImage={{
					src: "/wintery-sunburst.svg",
					mode: "cover"
				}}
			/>

			<TwoColumnsSection columns={2}>
				<BackgroundImage src="/panda-logo.svg" />

				<>
					<Heading size="xxl">Panda CSS</Heading>
					<Text>
						Panda CSS is an incredible CSS-in-JS solution with no javascript
						in the final build page. Panda CSS rely on a pre-compilation stage
						to generate only the needed CSS class names in the final bundle.
					</Text>
				</>
			</TwoColumnsSection>

			<Container marginTop="100px">
				<Heading color="black">{TITLE}</Heading>
				<Text color="#333">
					Visit&nbsp;
					<Link href="https://start.solidjs.com">start.solidjs.com</Link>
					&nbsp; to learn how to build SolidStart apps.
				</Text>
			</Container>
		</main>
	</AppLayout>
);

export const Route = createFileRoute("/")({
	component: HomePage
});
