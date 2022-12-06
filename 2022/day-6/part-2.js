import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const START_OF_PACKET_MARKER_LENGTH = 14;

/**
 * @param {string[]} arr
 * @returns {boolean}
 */
function hasDuplicates(arr) {
	for (let i = 0; i < arr.length; i++)
		for (let j = 0; j < arr.length; j++)
			if ( i != j && arr[i] === arr[j] )
				return true;

	return false;
}

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const firstCharIndex = data.split("")
	.filter( char => /^[a-z0-9]$/i.test(char) )
	.reduce( (acc, _, index, arr) => {
		if (acc <= 0 && index + 1 > START_OF_PACKET_MARKER_LENGTH - 1) {
			const slice = arr.slice( index - START_OF_PACKET_MARKER_LENGTH + 1, index + 1 );
			const duplicates = hasDuplicates(slice);

			if (!duplicates) return index + 1;
		}

		return acc;
	}, 0 );

console.log(firstCharIndex);

