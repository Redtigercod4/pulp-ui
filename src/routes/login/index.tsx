import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const LoginComponent: FC = () => {
    return (
        <div>
            <p>Login Component</p>
        </div>
    )
};

const Route = createFileRoute("/login/")({
    component: LoginComponent,
});

export { Route }
