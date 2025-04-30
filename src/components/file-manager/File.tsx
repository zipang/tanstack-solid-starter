import type { Component } from "solid-js";
import { VStack } from "@components/base";
import { FileIcon } from "@components/icons";

export interface FileProps {
	name: string;
	path: string;
	size: number;
}

export const File: Component<FileProps> = (props) => (
	<VStack width={props.size} height={props.size} justifyItems="center">
		<FileIcon />
		<legend>{props.name}</legend>
	</VStack>
);
