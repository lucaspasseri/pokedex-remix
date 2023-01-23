import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import indexStylesUrl from "../styles/index.css";
import { useNavigate } from "@remix-run/react";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: indexStylesUrl }];
};

export default function PokemonsRoute() {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<div>
			<h1 className="p-2 bg-slate-100">Pokedéx</h1>
			<button
				className="bg-slate-500 p-2 top-0 right-0 m-2 absolute"
				onClick={goBack}
			>
				Voltar
			</button>
			<Outlet />
		</div>
	);
}
