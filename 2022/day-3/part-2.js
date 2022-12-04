import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();

const CHARACTER_PRIORITIES = {};

for (let i = 0; i < 26; i++)
	CHARACTER_PRIORITIES[ String.fromCharCode(97 /* a */ + i) ] = i + 1;
for (let i = 0; i < 26; i++)
	CHARACTER_PRIORITIES[ String.fromCharCode(65 /* A */ + i) ] = i + 26 + 1;

const totalPriority = data.split("\n")
	.filter( line => !!line.trim() )
	.reduce( (acc, currLine) => {
		const newAcc = [ ...acc ];
		let last = newAcc[newAcc.length - 1] || [];

		if ( newAcc.length <= 0 || newAcc[newAcc.length - 1].length >= 3 ) {
			newAcc.push([]);
			last = newAcc[newAcc.length - 1];
		}

		newAcc[newAcc.length - 1][last.length] = currLine.split("");

		return newAcc;
	}, [] )
	.map( ([ left, middle, right ]) =>
		left.filter( char => middle.includes(char) && right.includes(char) )[0]
	)
	.map( char => CHARACTER_PRIORITIES[char] )
	.reduce( (acc, currChar) => acc + currChar, 0 );

console.log(totalPriority);
