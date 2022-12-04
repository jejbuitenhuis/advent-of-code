import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const overlappingSections = data.split("\n")
	.filter( l => !!l.trim() )
	.map( l => l.split(",") )
	.map( l => l.map( r => r.split("-") ) )
	.map( l => l.map( r => r.map( s => parseInt(s) ) ) )
	.map( l => l.map( ([ start, end ]) =>
		// + 1 because the range is inclusive
		Array.from( { length: end - start + 1 }, (_, i) => start + i )
	) )
	.map( ([ r1, r2 ]) => ([
		r1.every( n => r2.includes(n) ),
		r2.every( n => r1.includes(n) ),
	]) )
	.filter( ([ a, b ]) => a || b );

console.log(overlappingSections.length);
