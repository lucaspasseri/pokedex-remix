import type { LinksFunction } from "@remix-run/node";
//import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import indexStylesUrl from "../styles/index.css";
//import { getPokemons } from "~/models/pokemons.server";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

// export const loader = async () => {
// 	const pokemons = await getPokemons();
// 	//console.log({ pokemons });
// 	return json({
// 		pokemons: pokemons,
// 	});
// };

export default function IndexRoute() {
	//const data = useLoaderData<typeof loader>();

	//console.log({ data });

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
			<h1>Welcome to Remix 1</h1>
			<Link to="/pokemons">Pokemons</Link>
		</div>
	);
}
