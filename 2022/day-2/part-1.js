import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const MAPPINGS = {
	opponent: {
		A: ROCK,
		B: PAPER,
		C: SCISSORS,
	},
	self: {
		X: ROCK,
		Y: PAPER,
		Z: SCISSORS,
	},
};
const POINTS = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSORS]: 3,
	LOSS: 0,
	DRAW: 3,
	WIN: 6,
};
/** @type {Map<[ string, string ], number} */
const MATCH_MAPPINGS = new Map();
MATCH_MAPPINGS.set(`${ROCK}:${ROCK}`, POINTS.DRAW);
MATCH_MAPPINGS.set(`${ROCK}:${PAPER}`, POINTS.LOSS);
MATCH_MAPPINGS.set(`${ROCK}:${SCISSORS}`, POINTS.WIN);
MATCH_MAPPINGS.set(`${PAPER}:${ROCK}`, POINTS.WIN);
MATCH_MAPPINGS.set(`${PAPER}:${PAPER}`, POINTS.DRAW);
MATCH_MAPPINGS.set(`${PAPER}:${SCISSORS}`, POINTS.LOSS);
MATCH_MAPPINGS.set(`${SCISSORS}:${ROCK}`, POINTS.LOSS);
MATCH_MAPPINGS.set(`${SCISSORS}:${PAPER}`, POINTS.WIN);
MATCH_MAPPINGS.set(`${SCISSORS}:${SCISSORS}`, POINTS.DRAW);

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const points = data.split("\n")
	.filter( s => !!s.trim() )
	.map( s => s.split(" ") )
	.map(([ opponent, self ]) => {
		const elementOpponent = MAPPINGS.opponent[opponent];
		const elementSelf = MAPPINGS.self[self];
		const elementPoints = POINTS[elementSelf];
		const matchPoints = MATCH_MAPPINGS.get(`${elementSelf}:${elementOpponent}`);

		console.log("%s, %s, %s, %s", elementSelf, elementOpponent, elementPoints, matchPoints);

		return elementPoints + matchPoints;
	})
	.reduce( (acc, curr) => acc + curr, 0 );

console.log("Total points: %d", points);
