import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
	await Promise.all(
		getPokemons().map(pokemon => {
			return db.pokemon.create({ data: pokemon });
		})
	);
}

seed();

function getPokemons() {
	return [
		{
			name: "Bulbassauro",
			number: 1,
		},
		{
			name: "Ivyssauro",
			number: 2,
		},
		{
			name: "Venossauro",
			number: 3,
		},
		{
			name: "Charmander",
			number: 4,
		},
		{
			name: "Charmileon",
			number: 5,
		},
		{
			name: "Charizard",
			number: 6,
		},
		{
			name: "Squirtle",
			number: 7,
		},
		{
			name: "Watertle",
			number: 8,
		},
		{
			name: "Blastoise",
			number: 9,
		},
	];
}
