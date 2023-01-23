import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import indexStylesUrl from "../styles/index.css";
import { useNavigate } from "@remix-run/react";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export const loader = async () => {
	return json({
		pokemons: await db.pokemon.findMany(),
	});
};

export default function PokemonsRoute() {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="p-2 bg-slate-100">Pokedéx</h1>
			<button
				className="bg-slate-500 p-2 top-0 right-0 m-2 absolute"
				onClick={goBack}
			>
				Voltar
			</button>
			<div className="flex">
				<div>
					<h2 className="ml-8">Lista dos {data.pokemons.length} primeiros: </h2>
					<ul className="ml-16 bg-yellow-200 h-[42rem] w-60 p-4 overflow-y-auto">
						{data.pokemons.map(pokemon => (
							<li key={pokemon.number} className="capitalize hover:bg-red-400">
								<Link to={`/pokemons/${pokemon.number}`}>
									{pokemon.number} - {pokemon.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<Outlet />
			</div>
		</div>
	);
}
