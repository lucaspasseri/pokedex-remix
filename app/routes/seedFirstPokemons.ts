import { createPokemon } from "~/models/pokemons.server";

export async function loader() {
	for (let index = 1; index < 151; index++) {
		await createPokemon(index);
	}

	return null;
}
