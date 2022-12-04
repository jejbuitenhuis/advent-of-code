import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const topThreeCaloriesCombined = data.split("\n\n")
	.filter( line => !!line.trim() )
	.map( line => line.split("\n") )
	.map( elf => elf.filter( calorie => !!calorie.trim() ) )
	.map( elf => elf.map( calorie => parseInt(calorie) ) )
	.map( elf => elf.reduce( (acc, currCalorie) => acc + currCalorie, 0 ) )
	.sort( (a, b) => a - b )
	.reverse()
	.slice(0, 3)
	.reduce( (acc, currCalories) => acc + currCalories, 0 );

console.log( "Top three calories combined: %d,", topThreeCaloriesCombined );
