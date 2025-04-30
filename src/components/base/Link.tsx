import { type HTMLStyledProps, styled } from "@styled-system/jsx";
// Import the Link component and its props type from TanStack Solid Router
import {
	Link as SolidLink,
	type LinkProps as TanStackLinkProps
} from "@tanstack/solid-router";
import type { ParentComponent } from "solid-js";

// Define the props for our custom Link component.
// It needs to accept all props that TanStack's Link accepts (`TanStackLinkProps`)
// AND all the style props that Panda CSS provides (`HTMLStyledProps<'a'>`).
// We use 'a' as the base element type for HTMLStyledProps because TanStack's Link ultimately renders an <a> tag.
export type LinkProps = TanStackLinkProps &
	Omit<HTMLStyledProps<"a">, keyof TanStackLinkProps>;

/**
 * A styled Link component based on TanStack Solid Router's Link.
 *
 * This component integrates the routing capabilities of `@tanstack/solid-router`
 * with the styling capabilities of Panda CSS (`@styled-system/jsx`).
 *
 * It accepts all props supported by TanStack's `Link` (like `to`, `params`, `search`, `activeProps`, etc.)
 * as well as all Panda CSS style props (like `color`, `bg`, `p`, `m`, etc.).
 *
 * TanStack's Link component automatically handles external links (absolute URLs)
 * by rendering a standard `<a>` tag, so no manual external link check is needed here.
 */
export const Link: ParentComponent<LinkProps> = styled(SolidLink);

// We no longer need the `isExternal` function or the manual component implementation
// because `styled(SolidLink)` handles wrapping the component, and SolidLink
// itself handles the distinction between internal and external links.
