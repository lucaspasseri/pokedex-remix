import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
			where: { number: Number(params.pokemonNumber) },
		}),
	};
	return json(pokemon);
};

export default function PokemonRoute() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="ml-4 p-2 font-bold bg-slate-50 w-80 flex flex-col items-center">
			<h2 className="p-2 font-bold bg-slate-50 self-start">
				{data.pokemon?.number}
			</h2>

			<img
				src={data.pokemon?.image}
				width="160rem"
				height="auto"
				alt={`pokemon: ${data.pokemon?.name}`}
			/>

			<h3>{data.pokemon?.name}</h3>

			<h4>{data.pokemon?.type}</h4>
		</div>
	);
}
