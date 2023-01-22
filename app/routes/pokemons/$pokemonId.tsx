import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
//import { Outlet, Link } from "@remix-run/react";
import indexStylesUrl from "~/styles/index.css";
import tailwindStylesUrl from "~/styles/app.css";
import { db } from "~/utils/db.server";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: indexStylesUrl },
		{ rel: "stylesheet", href: tailwindStylesUrl },
	];
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
		<div
			className="p-2 text-3xl font-bold underline bg-slate-50"
			style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
		>
			<h1 className="p-2 text-3xl font-bold underline bg-slate-50">
				Welcome to Remix 1
			</h1>
			<div className="p-2 text-3xl font-bold underline bg-slate-50">
				{data.pokemon?.name}
			</div>
			<div className="p-2 text-3xl font-bold underline bg-slate-50">
				{data.pokemon?.number}
			</div>
		</div>
	);
}
