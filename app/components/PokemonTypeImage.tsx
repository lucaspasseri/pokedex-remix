import { useRef, useEffect } from "react";
import pokemonTypesImages from "~/images/pokemonTypes.webp";

export default function PokemonTypeImage({ typeName }) {
	const canvasRef = useRef(null);

	const sliceX = 4;
	const sliceWidth = 298.5;
	const sliceHeight = 360;

	const slicingPosition = {
		sliceWidth: sliceWidth,
		sliceHeight: sliceHeight,
		bug: {
			x: sliceX,
			y: 0,
		},
		dark: {
			x: sliceX + sliceWidth,
			y: 0,
		},
		dragon: {
			x: sliceX + 2 * sliceWidth,
			y: 0,
		},
		electric: {
			x: sliceX + 3 * sliceWidth,
			y: 0,
		},
		fairy: {
			x: sliceX + 4 * sliceWidth,
			y: 0,
		},
		fighting: {
			x: sliceX + 5 * sliceWidth,
			y: 0,
		},
		fire: {
			x: sliceX,
			y: sliceHeight,
		},
		flying: {
			x: sliceX + sliceWidth,
			y: sliceHeight,
		},
		ghost: {
			x: sliceX + 2 * sliceWidth,
			y: sliceHeight,
		},
		grass: {
			x: sliceX + 3 * sliceWidth,
			y: sliceHeight,
		},
		ground: {
			x: sliceX + 4 * sliceWidth,
			y: sliceHeight,
		},
		ice: {
			x: sliceX + 5 * sliceWidth,
			y: sliceHeight,
		},
		normal: {
			x: sliceX,
			y: 2 * sliceHeight,
		},
		poison: {
			x: sliceX + sliceWidth,
			y: 2 * sliceHeight,
		},
		psychic: {
			x: sliceX + 2 * sliceWidth,
			y: 2 * sliceHeight,
		},
		rock: {
			x: sliceX + 3 * sliceWidth,
			y: 2 * sliceHeight,
		},
		steel: {
			x: sliceX + 4 * sliceWidth,
			y: 2 * sliceHeight,
		},
		water: {
			x: sliceX + 5 * sliceWidth,
			y: 2 * sliceHeight,
		},
	};

	useEffect(() => {
		const canvas = canvasRef.current;

		const canvasWidth = slicingPosition.sliceWidth;
		const canvasHeight = slicingPosition.sliceHeight;

		canvas.setAttribute("width", canvasWidth);
		canvas.setAttribute("height", canvasHeight);

		const ctx = canvas.getContext("2d");
		const image = new Image();
		image.src = pokemonTypesImages;
		image.onload = function () {
			ctx.drawImage(
				image,
				slicingPosition[typeName].x,
				slicingPosition[typeName].y,
				slicingPosition.sliceWidth,
				slicingPosition.sliceHeight,
				0,
				0,
				slicingPosition.sliceWidth,
				slicingPosition.sliceHeight
			);
		};
	}, []);

	return (
		<div>
			<canvas className="w-20" ref={canvasRef} />
		</div>
	);
}
