import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import indexStylesUrl from "~/styles/index.css";
//import type { Pokemon } from "@prisma/client";
import { db } from "~/utils/db.server";

export const loader = async () => {
	return json({
		pokemons: await db.pokemon.findMany(),
	});
};

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export default function PokemonsIndexRoute() {
	const data = useLoaderData<typeof loader>();

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Welcome to Remix 3</h1>
			<ul>
				{data.pokemons.map(pokemon => (
					<li key={pokemon.id}>
						<Link to={`/pokemons/${pokemon.id}`}>
							{pokemon.name} - {pokemon.number}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
