import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import indexStylesUrl from "~/styles/index.css";
import tailwindStylesUrl from "~/styles/app.css";
import { db } from "~/utils/db.server";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: indexStylesUrl },
		{ rel: "stylesheet", href: tailwindStylesUrl },
	];
};

export const loader = async ({ params }: LoaderArgs) => {
	const pokemon = {
		pokemon: await db.pokemon.findUnique({
			where: { number: Number(params.pokemonNumber) },
			include: {
				types: true,
				predecessor: true,
				successor: true,
			},
		}),
	};
	return json(pokemon);
};

export default function PokemonRoute() {
	const maxPokemonNumber = 150;
	const currentPathnameWithoutParams = "/pokemons/";
	const data = useLoaderData<typeof loader>();

	console.log({ data });

	return (
		<div className="ml-4 p-2 font-bold bg-slate-800 w-2/5 flex flex-col items-center">
			<div className="self-start w-full">
				<div className="flex justify-center items-center border-4 border-blue-900 mb-16  bg-slate-50 ">
					<div className="w-10">
						{data.pokemon && data.pokemon.number > 1 && (
							<Link
								to={
									currentPathnameWithoutParams + String(data.pokemon.number - 1)
								}
							>
								<ArrowLeftIcon fontSize="large" color="primary" />
							</Link>
						)}
					</div>

					<div className="w-14">
						<h2 className="p-2 font-boldmt-auto mb-auto flex justify-evenly">
							{data.pokemon?.number}
						</h2>
					</div>

					<div className="w-10">
						{data.pokemon && data.pokemon.number < maxPokemonNumber && (
							<Link
								to={
									currentPathnameWithoutParams + String(data.pokemon.number + 1)
								}
							>
								<ArrowRightIcon fontSize="large" color="primary" />
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-evenly w-full mb-12">
				<div className="w-20 shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]">
					{data.pokemon && data.pokemon.predecessor && (
						<Link
							to={
								currentPathnameWithoutParams +
								String(data.pokemon.predecessor.number)
							}
						>
							<img
								src={data.pokemon?.predecessor.image}
								alt={`pokemon: ${data.pokemon?.predecessor.name}`}
							/>
						</Link>
					)}
				</div>

				<img
					className="shadow-[0_10px_50px_rgba(240,_46,_170,_0.7)]"
					src={data.pokemon?.image}
					width="160rem"
					height="auto"
					alt={`pokemon: ${data.pokemon?.name}`}
				/>
				<div className="w-20 shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]">
					{data.pokemon && data.pokemon.successor.length > 0 && (
						<Link
							to={
								currentPathnameWithoutParams +
								String(data.pokemon.successor[0]?.number)
							}
						>
							<img
								src={data.pokemon?.successor[0].image}
								width="80rem"
								height="auto"
								alt={`pokemon: ${data.pokemon?.successor[0].name}`}
							/>
						</Link>
					)}
				</div>
			</div>

			<h3 className="text-slate-100">{data.pokemon?.name}</h3>

			<ul>
				{data?.pokemon?.types.map(type => (
					<li key={type.id}>
						<h4 className="text-slate-100">{type.typeName}</h4>
					</li>
				))}
			</ul>

			<p className="text-slate-100">
				Altura: {data.pokemon?.height && `${data.pokemon?.height / 10} m`}
			</p>
			<p className="text-slate-100">
				Peso: {data.pokemon?.weight && `${data.pokemon?.weight / 10} kg`}
			</p>
		</div>
	);
}
