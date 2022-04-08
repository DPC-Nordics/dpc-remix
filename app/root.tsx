import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import NavigationLink from "./components/NavigationLink";
import styles from "~/styles/index.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "DPC Remix",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1>Welcome to DPC Remix Post App</h1>
          <nav>
            <NavigationLink to={"/"}>Home</NavigationLink>
            <NavigationLink to={"posts"}>Posts</NavigationLink>
          </nav>
        </header>

        {/* All routes lives in this Outlet. */}
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
