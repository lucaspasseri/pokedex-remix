import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
//import { Outlet, Link } from "@remix-run/react";
import indexStylesUrl from "~/styles/index.css";
import { db } from "~/utils/db.server";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export const loader = async ({ params }: LoaderArgs) => {
	console.log({ params });

	const pokemon = {
		pokemon: await db.pokemon.findUnique({
			where: { id: params.pokemonId },
		}),
	};

	console.log(pokemon);
	return json(pokemon);
};

export default function PokemonRoute() {
	const data = useLoaderData<typeof loader>();

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Welcome to Remix 1</h1>
			<div>{data.pokemon?.name}</div>
			<div>{data.pokemon?.number}</div>
		</div>
	);
}
