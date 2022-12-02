import { readFileSync } from "fs";
import { join as pathJoin } from "path";

const FILE = "input.txt";

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const LOSS = "loss";
const DRAW = "draw";
const WIN = "win";
const MAPPINGS = {
	A: ROCK,
	B: PAPER,
	C: SCISSORS,
	X: LOSS,
	Y: DRAW,
	Z: WIN,
};
const POINTS = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSORS]: 3,
	[LOSS]: 0,
	[DRAW]: 3,
	[WIN]: 6,
};
/** @type {Map<[ string, string ], number} */
const MATCH_MAPPINGS = new Map();
MATCH_MAPPINGS.set(`${ROCK}:${DRAW}`, ROCK);
MATCH_MAPPINGS.set(`${ROCK}:${LOSS}`, SCISSORS);
MATCH_MAPPINGS.set(`${ROCK}:${WIN}`, PAPER);
MATCH_MAPPINGS.set(`${PAPER}:${WIN}`, SCISSORS);
MATCH_MAPPINGS.set(`${PAPER}:${DRAW}`, PAPER);
MATCH_MAPPINGS.set(`${PAPER}:${LOSS}`, ROCK);
MATCH_MAPPINGS.set(`${SCISSORS}:${LOSS}`, PAPER);
MATCH_MAPPINGS.set(`${SCISSORS}:${WIN}`, ROCK);
MATCH_MAPPINGS.set(`${SCISSORS}:${DRAW}`, SCISSORS);

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString();
const points = data.split("\n")
	.filter( s => !!s.trim() )
	.map( s => s.split(" ") )
	.map(([ opponent, play ]) => {
		const elementOpponent = MAPPINGS[opponent];
		const outcome = MAPPINGS[play];
		const matchPoints = POINTS[outcome];
		const toPlay = MATCH_MAPPINGS.get(`${elementOpponent}:${outcome}`);

		return matchPoints + POINTS[toPlay];
	})
	.reduce( (acc, curr) => acc + curr, 0 );

console.log("Total points: %d", points);
