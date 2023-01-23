import { db } from "~/utils/db.server";

export async function createPokemon(id: number) {
	// const res = await fetch(
	// 	"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
	// ).then(res => res.json());

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res =>
		res.json()
	);

	//console.log({ res })

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
