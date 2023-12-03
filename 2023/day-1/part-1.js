import { readFileSync } from "fs";
import { join as pathJoin } from "path";

import dbg from "../../tools/dbg";

const FILE = "input.txt";

/**
 * @param {number[]} arr
 * @returns number
 */
function parseNumberArray(arr) {
	if (arr.length === 0) return 0;

	const first = arr[0];
	const last = arr[arr.length - 1];

	return parseInt(`${first}${last}`);
}

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const calibrationValuesSum = data.split("\n")
	.map(
		line => line.split("")
			.map( char => parseInt(char) )
			.filter(char => !!char)
	)
	.map(parseNumberArray)
	.reduce((acc, curr) => acc + curr, 0)
	;

console.log(calibrationValuesSum);
