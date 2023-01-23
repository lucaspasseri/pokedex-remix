import { db } from "~/utils/db.server";

export async function createPokemon(id: number) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
		res.json()
	);

	const formattedPokemon = {
		number: res.id,
		name: res.name,
		image: res.sprites.front_default,
		type: res.types[0].type.name,
	};

	console.log({ formattedPokemon });

	await db.pokemon.create({ data: formattedPokemon });

	return null;
}
