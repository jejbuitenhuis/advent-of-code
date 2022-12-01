import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const topThreeCaloriesCombined = data.split("\n\n")
	.filter( e => !!e.trim() )
	.map( e => e.split("\n") )
	.map( e => e.filter( c => !!c.trim() ) )
	.map( e => e.map( c => parseInt(c) ) )
	.map( e => e.reduce( (acc, curr) => acc + curr, 0 ) )
	.sort( (a, b) => a - b )
	.reverse()
	.slice(0, 3)
	.reduce( (acc, curr) => acc + curr, 0 );

console.log( "Top three calories combined: %d,", topThreeCaloriesCombined );
