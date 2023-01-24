import { db } from "~/utils/db.server";

export async function createPokemon(id: number) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
		res.json()
	);

	const pokemonNumber = res.id;

	const formattedTypes = res.types.map(type => ({
		pokemonNumber: pokemonNumber,
		typeName: type.type.name,
	}));

	const formattedPokemon = {
		number: pokemonNumber,
		name: res.name,
		image: res.sprites.front_default,
		weight: res.weight,
		height: res.height,
	};

	await db.pokemon.create({ data: formattedPokemon });

	formattedTypes.forEach(
		async type => await db.pokemonType.create({ data: type })
	);

	return null;
}
