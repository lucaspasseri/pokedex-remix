import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import indexStylesUrl from "~/styles/index.css";
import tailwindStylesUrl from "~/styles/app.css";
import { db } from "~/utils/db.server";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PokemonTypeImage from "~/components/PokemonTypeImage";

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

	const matchups = {
		matchups: await db.matchup.findMany(),
	};

	const [pokemonRes, matchupsRes] = await Promise.all([pokemon, matchups]);

	return json({ pokemonRes, matchupsRes });

	// return {
	// 	pokemon: json(pokemon),
	// 	matchups: json(matchups),
	// };
};

export default function PokemonRoute() {
	const maxPokemonNumber = 150;
	const currentPathnameWithoutParams = "/pokemons/";
	const data = useLoaderData<typeof loader>();

	console.log({ data });

	const pokemon = data.pokemonRes.pokemon;
	const matchups = data.matchupsRes.matchups;

	console.log(pokemon);
	console.log(matchups);

	const filteredDefensivesMatchups = matchups.filter(matchup =>
		pokemon?.types.some(type => type.typeName === matchup.typeBName)
	);

	console.log({ filteredDefensivesMatchups });

	const effectiveMatchups = filteredDefensivesMatchups.filter(
		matchup => matchup.effectiveness > 1
	);

	const noEffectiveMatchups = filteredDefensivesMatchups.filter(
		matchup => matchup.effectiveness < 1
	);

	console.log({ effectiveMatchups, noEffectiveMatchups });

	return (
		<div className="ml-4 p-2 font-bold bg-slate-800 w-2/5 flex flex-col items-center">
			<div className="self-start w-full">
				<div className="flex justify-center items-center border-4 border-blue-900 mb-16  bg-slate-50 ">
					<div className="w-10">
						{pokemon && pokemon.number > 1 && (
							<Link
								to={currentPathnameWithoutParams + String(pokemon.number - 1)}
							>
								<ArrowLeftIcon fontSize="large" color="primary" />
							</Link>
						)}
					</div>

					<div className="w-14">
						<h2 className="p-2 font-boldmt-auto mb-auto flex justify-evenly">
							{pokemon?.number}
						</h2>
					</div>

					<div className="w-10">
						{pokemon && pokemon.number < maxPokemonNumber && (
							<Link
								to={currentPathnameWithoutParams + String(pokemon.number + 1)}
							>
								<ArrowRightIcon fontSize="large" color="primary" />
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className="flex items-center justify-evenly w-full mb-12">
				<div className="w-20 shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]">
					{pokemon && pokemon.predecessor && (
						<Link
							to={
								currentPathnameWithoutParams +
								String(pokemon.predecessor.number)
							}
						>
							<img
								src={pokemon?.predecessor.image}
								alt={`pokemon: ${pokemon?.predecessor.name}`}
							/>
						</Link>
					)}
				</div>

				<img
					className="shadow-[0_10px_50px_rgba(240,_46,_170,_0.7)]"
					src={pokemon?.image}
					width="160rem"
					height="auto"
					alt={`pokemon: ${pokemon?.name}`}
				/>
				<div className="w-20 shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]">
					{pokemon && pokemon.successor?.length > 0 && (
						<Link
							to={
								currentPathnameWithoutParams +
								String(pokemon.successor[0]?.number)
							}
						>
							<img
								src={pokemon?.successor[0].image}
								width="80rem"
								height="auto"
								alt={`pokemon: ${pokemon?.successor[0].name}`}
							/>
						</Link>
					)}
				</div>
			</div>

			<h3 className="text-slate-100">{pokemon?.name}</h3>

			<ul className="flex">
				{pokemon?.types.map(type => (
					<li key={type.id}>
						<PokemonTypeImage typeName={type.typeName} />
					</li>
				))}
			</ul>

			<p className="text-slate-100">
				Altura: {pokemon?.height && `${pokemon?.height / 10} m`}
			</p>
			<p className="text-slate-100">
				Peso: {pokemon?.weight && `${pokemon?.weight / 10} kg`}
			</p>
			{/* <div className="flex mt-8">
				<ul className="p-4 border">
					<p> Frágil contra:</p>
					{effectiveMatchups.map(matchup => (
						<li key={matchup.id}>
							<p className="text-slate-100">{matchup.typeAName}</p>
						</li>
					))}
				</ul>
				<ul className="p-4 border">
					<p> Resistente contra:</p>
					{noEffectiveMatchups.map(matchup => (
						<li key={matchup.id}>
							<p className="text-slate-100">{matchup.typeAName}</p>
						</li>
					))}
				</ul>
			</div> */}
		</div>
	);
}
