import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import indexStylesUrl from "~/styles/index.css";
import tailwindStylesUrl from "~/styles/app.css";
import { db } from "~/utils/db.server";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
//import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
//import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleDownSharpIcon from "@mui/icons-material/ArrowCircleDownSharp";
import ArrowCircleUpSharpIcon from "@mui/icons-material/ArrowCircleUpSharp";

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
	//const maxPokemonNumber = 150;
	const currentPathnameWithoutParams = "/pokemons/";
	const data = useLoaderData<typeof loader>();

	console.log({ data });

	return (
		<div className="ml-4 p-2 font-bold bg-slate-50 w-1/3 flex flex-col items-center">
			<div className="self-start w-full">
				<h2 className="p-2 font-bold bg-slate-50">{data.pokemon?.number}</h2>
				<div className="flex justify-center ">
					{/* <div>
						{data.pokemon && data.pokemon.number > 1 && (
							<Link
								to={
									currentPathnameWithoutParams + String(data.pokemon.number - 1)
								}
							>
								<ArrowCircleLeftOutlinedIcon fontSize="large" />
							</Link>
						)}
					</div> */}
					<div className="mr-24">
						{data.pokemon && data.pokemon.predecessor && (
							<Link
								to={
									currentPathnameWithoutParams +
									String(data.pokemon.predecessor.number)
								}
							>
								<ArrowCircleDownSharpIcon fontSize="large" />
							</Link>
						)}
					</div>
					<div>
						{data.pokemon && data.pokemon.successor.length > 0 && (
							<Link
								to={
									currentPathnameWithoutParams +
									String(data.pokemon.successor[0]?.number)
								}
							>
								<ArrowCircleUpSharpIcon fontSize="large" />
							</Link>
						)}
					</div>
					{/* <div>
						{data.pokemon && data.pokemon.number < maxPokemonNumber && (
							<Link
								to={
									currentPathnameWithoutParams + String(data.pokemon.number + 1)
								}
							>
								<ArrowCircleRightOutlinedIcon fontSize="large" />
							</Link>
						)}
					</div> */}
				</div>
			</div>

			<img
				src={data.pokemon?.image}
				width="160rem"
				height="auto"
				alt={`pokemon: ${data.pokemon?.name}`}
			/>

			<h3>{data.pokemon?.name}</h3>

			<ul>
				{data?.pokemon?.types.map(type => (
					<li key={type.id}>
						<h4>{type.typeName}</h4>
					</li>
				))}
			</ul>

			<p>Altura: {data.pokemon?.height && `${data.pokemon?.height / 10} m`}</p>
			<p>Peso: {data.pokemon?.weight && `${data.pokemon?.weight / 10} kg`}</p>
		</div>
	);
}
