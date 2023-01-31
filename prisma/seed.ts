//import { PrismaClient } from "@prisma/client";
import { createPokemonTypeTable } from "~/models/types.server";
import { createPokemon } from "~/models/pokemons.server";
//const db = new PrismaClient();
// export async function createPokemonTypeTablePromise() {
// 	await createPokemonTypeTable();
// }

export async function initializePokemonsPromise() {}
async function seed() {
	//await Promise.all([createPokemonTypeTablePromise, initializePokemonsPromise]);

	await createPokemonTypeTable();

	for (let index = 1; index < 151; index++) {
		await createPokemon(index);
	}
	// await Promise.all(
	// 	getPokemons().map(pokemon => {
	// 		return db.pokemon.create({ data: pokemon });
	// 	})
	// );
}

seed();

// function getPokemons() {
// 	return [
// 		{
// 			name: "Bulbassauro",
// 			number: 1,
// 		},
// 		{
// 			name: "Ivyssauro",
// 			number: 2,
// 		},
// 		{
// 			name: "Venossauro",
// 			number: 3,
// 		},
// 		{
// 			name: "Charmander",
// 			number: 4,
// 		},
// 		{
// 			name: "Charmileon",
// 			number: 5,
// 		},
// 		{
// 			name: "Charizard",
// 			number: 6,
// 		},
// 		{
// 			name: "Squirtle",
// 			number: 7,
// 		},
// 		{
// 			name: "Watertle",
// 			number: 8,
// 		},
// 		{
// 			name: "Blastoise",
// 			number: 9,
// 		},
// 	];
//}
