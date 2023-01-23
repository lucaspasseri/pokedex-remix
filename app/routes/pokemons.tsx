import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import indexStylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export default function PokemonsRoute() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>List de Pokemons</h1>
			<Outlet />
		</div>
	);
}
