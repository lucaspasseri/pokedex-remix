import { createPokemonTypeTable } from "~/models/types.server";

export async function loader() {
	await createPokemonTypeTable();

	return null;
}
