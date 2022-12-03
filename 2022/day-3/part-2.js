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
	.filter( s => !!s.trim() )
	.reduce( (acc, curr) => {
		const newAcc = [ ...acc ];
		let last = newAcc[newAcc.length - 1] || [];

		if ( newAcc.length <= 0 || newAcc[newAcc.length - 1].length >= 3 ) {
			newAcc.push([]);
			last = newAcc[newAcc.length - 1];
		}

		newAcc[newAcc.length - 1][last.length] = curr.split("");

		return newAcc;
	}, [] )
	.map( ([ a, b, c ]) => a.filter( i => b.includes(i) && c.includes(i) )[0] )
	.map( c => CHARACTER_PRIORITIES[c] )
	.reduce( (acc, curr) => acc + curr, 0 );

console.log(totalPriority);
