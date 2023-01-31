import { db } from "~/utils/db.server";
import { fetch } from "@remix-run/web-fetch";
import getPredecessor from "~/utils/helper/getPredecessor";

export async function createPokemon(id: number) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
		res.json()
	);

	const pokemonNumber = res.id;

	const formattedTypes = res.types.map(type => ({
		pokemonNumber: pokemonNumber,
		typeName: type.type.name,
	}));

	const predecessor = getPredecessor(Number(pokemonNumber));
	console.log({ predecessor });

	const formattedPokemon = {
		number: pokemonNumber,
		name: res.name,
		image: res.sprites.front_default,
		weight: res.weight,
		height: res.height,
		predecessorNumber: predecessor,
	};

	await db.pokemon.create({ data: formattedPokemon });

	formattedTypes.forEach(
		async type => await db.pokemonType.create({ data: type })
	);

	return null;
}
