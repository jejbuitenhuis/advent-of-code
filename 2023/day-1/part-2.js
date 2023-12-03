import { readFileSync } from "fs";
import { join as pathJoin } from "path";

import dbg from "../../tools/dbg";
import TraversableString from "../../tools/TraversableString";

const WORD_NUMBERS = {
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9,
};

const FILE = "input.txt";

/**
 * @param {string} input
 * @returns {number}
 */
function extractNumbers(input) {
	const str = new TraversableString(input);
	const numbers = [];

	while ( !str.empty() ) {
		for (const word in WORD_NUMBERS) {
			const num = parseInt( str.peek() );

			if ( !isNaN(num) ) {
				numbers.push(num);
				break;
			}

			const section = str.peek(word.length);

			if (section === word) {
				numbers.push( WORD_NUMBERS[word] );
				break;
			}
		}

		str.next();
	}

	return numbers;
}

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
	.map(extractNumbers)
	.map(parseNumberArray)
	.reduce((acc, curr) => acc + curr, 0)
	;

console.log(calibrationValuesSum);
