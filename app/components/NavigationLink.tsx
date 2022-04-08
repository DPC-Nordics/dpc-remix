import { NavLink } from "@remix-run/react";
import { type ReactNode } from "react";
import { type To } from "react-router";

export default function NavigationLink({
  to,
  children,
}: {
  to: To;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "inherit",
      })}
    >
      {children}
    </NavLink>
  );
}
