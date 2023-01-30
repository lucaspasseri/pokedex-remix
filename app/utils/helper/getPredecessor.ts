export default function getPredecessor(pokemonNumber: number) {
	switch (pokemonNumber) {
		case 1:
			return null;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return null;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return null;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return null;
		default:
			return null;
	}
}
