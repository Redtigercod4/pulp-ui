import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const HomeComponent: FC = () => {
	return (
		<div>
			<p>Hello World</p>
		</div>
	);
};

const Route = createFileRoute("/")({
	component: HomeComponent,
});

export { Route };
