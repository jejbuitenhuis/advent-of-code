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
	.map( s => [
		s.slice( 0, s.length / 2 ).split(""),
		s.slice( s.length / 2, s.length ).split(""),
	] )
	.map( ([ a, b ]) => a.filter( i => b.includes(i) )[0] )
	.map( c => CHARACTER_PRIORITIES[c] )
	.reduce( (acc, curr) => acc + curr, 0 );

console.log(totalPriority);
