import type { Component } from "solid-js";
import { VStack } from "@components/base";
import { FolderIcon } from "@components/icons";

export interface FolderProps {
	name: string;
	path: string;
	size: number;
}

export const Folder: Component<FolderProps> = (props) => (
	<VStack width={props.size} height={props.size} justifyItems="center">
		<FolderIcon />
		<legend>{props.name}</legend>
	</VStack>
);
