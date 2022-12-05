import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString()
	.split("\n");
// const crates = data.slice( 0, data.findIndex(line => !line) );
const crates = {
	1: [ "D", "M", "S", "Z", "R", "F", "W", "N" ],
	2: [ "W", "P", "Q", "Q", "S", ],
	3: [ "W", "R", "V", "Q", "F", "N", "J", "C" ],
	4: [ "F", "Z", "P", "C", "G", "D", "L", ],
	5: [ "T", "P", "S", ],
	6: [ "H", "D", "F", "W", "R", "L", ],
	7: [ "Z", "N", "D", "C", ],
	8: [ "W", "N", "R", "F", "V", "S", "J", "Q" ],
	9: [ "R", "M", "S", "G", "Z", "W", "V", ],
};

data.slice( data.findIndex(line => !line) + 1, data.length )
	.filter( line => !!line )
	.map( line =>
		/move (\d+) from (\d+) to (\d+)/.exec(line)
			.slice(1, 4)
			.map( num => parseInt(num) )
	)
	.forEach( ([ count, from, to ]) =>
		Array.from( Array(count) ).map( () => crates[from].pop() )
			.reverse()
			.forEach( crate => crates[to].push(crate) )
	);

const topCrates = Object.values(crates)
	.map( stack => stack[stack.length - 1] )
	.join("");

console.log(topCrates);
