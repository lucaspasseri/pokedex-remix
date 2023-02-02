import { db } from "~/utils/db.server";
import { fetch } from "@remix-run/web-fetch";

export async function createPokemonTypeTable() {
	const res = await fetch("https://pokeapi.co/api/v2/type/").then(res =>
		res.json()
	);

	const types = res.results;

	console.log({ types });

	types.forEach(async type => {
		const formattedType = {
			name: type?.name,
		};

		await db.type.create({ data: formattedType });
	});

	const matchups = [];

	for (let i = 0; i < types.length; i++) {
		const res = await fetch(types[i].url).then(res => res.json());
		//console.log({ res });

		const pokemonType = types[i].name;

		console.log({ pokemonType });

		const doubleDamageFrom = res.damage_relations.double_damage_from;

		console.log({ doubleDamageFrom });

		const doubleDamageTo = res.damage_relations.double_damage_to;
		const halfDamageFrom = res.damage_relations.half_damage_from;
		const halfDamageTo = res.damage_relations.half_damage_to;
		const noDamageFrom = res.damage_relations.no_damage_from;
		const noDamageTo = res.damage_relations.no_damage_to;

		doubleDamageTo.forEach(type => {
			// const data = {
			// 	typeA: { create: { name: pokemonType } },
			// 	typeB: { create: { name: type.name } },
			// 	effectiveness: 2,
			// };

			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 2,
			};

			matchups.push(data);
		});

		halfDamageTo.forEach(type => {
			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 1 / 2,
			};

			matchups.push(data);
		});

		noDamageTo.forEach(type => {
			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 0,
			};

			matchups.push(data);
		});

		doubleDamageFrom.forEach(type => {
			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 2,
			};

			matchups.push(data);
		});

		halfDamageFrom.forEach(type => {
			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 1 / 2,
			};

			matchups.push(data);
		});

		noDamageFrom.forEach(type => {
			const data = {
				typeAName: pokemonType,
				typeBName: type.name,
				effectiveness: 0,
			};

			matchups.push(data);
		});
	}

	console.log({ matchups });

	matchups.forEach(async matchup => {
		console.log({ matchup });
		await db.matchup.create({ data: matchup });
	});

	return null;
}
