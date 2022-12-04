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
	.map( line => [
		line.slice( 0, line.length / 2 ).split(""),
		line.slice( line.length / 2, line.length ).split(""),
	] )
	.map( ([ left, right ]) => left.filter( char => right.includes(char) )[0] )
	.map( char => CHARACTER_PRIORITIES[char] )
	.reduce( (acc, currChar) => acc + currChar, 0 );

console.log(totalPriority);
