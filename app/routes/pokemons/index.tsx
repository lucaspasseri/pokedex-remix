import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
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
		<div className="flex">
			<div>
				<h2 className="ml-8">Lista dos {data.pokemons.length} primeiros: </h2>
				<ul className="ml-16 bg-yellow-200 h-[42rem] w-60 p-4 overflow-y-auto">
					{data.pokemons.map(pokemon => (
						<li key={pokemon.id} className="capitalize hover:bg-red-400">
							<Link to={`/pokemons/${pokemon.id}`}>
								{pokemon.number} - {pokemon.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="border">
				<Outlet />
			</div>
		</div>
	);
}
