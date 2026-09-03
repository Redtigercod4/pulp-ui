import { createRootRoute, Outlet } from "@tanstack/react-router";
import type { FC } from "react";

const RootComponent: FC = () => {
	return <Outlet />;
};

const Route = createRootRoute({
	component: RootComponent,
});

export { Route };
