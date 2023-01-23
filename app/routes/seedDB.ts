import { createPokemon } from "~/models/pokemons.server";

export async function loader() {
	//const pokemons = await createPokemon();
	for (let index = 1; index < 151; index++) {
		await createPokemon(index);
	}

	return null;
}
