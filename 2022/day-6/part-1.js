import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const START_OF_PACKET_MARKER_LENGTH = 4;

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const firstCharIndex = data.split("")
	.filter( char => /^[a-z0-9]$/i.test(char) )
	.reduce( (acc, _, index, arr) => {
		if (acc <= 0 && index + 1 > START_OF_PACKET_MARKER_LENGTH - 1) {
			const slice = arr.slice( index - START_OF_PACKET_MARKER_LENGTH + 1, index + 1 );
			const duplicates = slice.some( (char, i) =>
				slice.some( (char2, j) => i !== j && char === char2 )
			);

			if (!duplicates) return index + 1;
		}

		return acc;
	}, 0 );

console.log(firstCharIndex);
