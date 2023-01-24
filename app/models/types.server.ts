import { db } from "~/utils/db.server";

export async function createPokemonTypeTable() {
	const res = await fetch("https://pokeapi.co/api/v2/type/").then(res =>
		res.json()
	);

	const types = res.results;

	types.forEach(async type => {
		const formattedType = {
			name: type?.name,
		};

		await db.type.create({ data: formattedType });
	});

	return null;
}
