import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import indexStylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export default function IndexRoute() {
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1 className="p-2 bg-slate-100">Pokedéx</h1>
			<main className="flex flex-col items-center">
				<h2 className=" ">Bem-vindo!</h2>
				<Link className="underline text-lg" to="/pokemons">
					Pokemons
				</Link>
			</main>
		</div>
	);
}
