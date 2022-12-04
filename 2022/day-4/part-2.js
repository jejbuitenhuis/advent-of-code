import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const overlappingSections = data.split("\n")
	.filter( line => !!line.trim() )
	.map( line => line.split(",") )
	.map( line => line.map( range => range.split("-") ) )
	.map( line => line.map( range => range.map( num => parseInt(num) ) ) )
	.map( line => line.map( ([ start, end ]) =>
		// + 1 because the range is inclusive
		Array.from( { length: end - start + 1 }, (_, i) => start + i )
	) )
	.map( ([ range1, range2 ]) => ([
		range1.some( num => range2.includes(num) ),
		range2.some( num => range1.includes(num) ),
	]) )
	.filter( ([ inclRange1, inclRange2 ]) => inclRange1 || inclRange2 );

console.log(overlappingSections.length);
