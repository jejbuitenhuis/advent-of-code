import { readFileSync } from "fs";
import { join as pathJoin } from "path";

import File from "./File";
import Dir from "./Dir";
import printFiles from "./printFiles";

const FILE = "input.txt";

const COMMAND_PREFIX = "$";
const DIR_PREFIX = "dir";
const MAX_SIZE = 100_000;

const SPACE_REQUIRED = 30_000_000;
const SPACE_FREE = 21_618_835;
const SPACE_EXTRA_REQUIRED = SPACE_REQUIRED - SPACE_FREE;

/**
 * @param {string[]} system
 * @param {number} index
 * @param {File[]} accumulator
 * @returns {File}
 */
function parseCommand(system, index, accumulator) { // {{{
	const [ currCommand, ...args ] = system[index].slice(1)
		.trim()
		.split(/ +/g);

	switch (currCommand) {
		case "cd": {
			const dirName = args[0];

			if (dirName === "..") {
				const child = accumulator.pop();
				const parent = accumulator[accumulator.length - 1];

				if (!child)
					throw new Error(`Child is undefined!`);

				if ( !(parent instanceof Dir) )
					throw new Error(`Parent is not of type Dir, found "${parent}"`);

				parent.addFile(child);
			} else {
				accumulator.push( new Dir(dirName) );

				return parseFileSystem(system, index + 1, accumulator);
			}
		}
		case "ls": {
			return parseFileSystem(system, index + 1, accumulator);
		}
		default: {
			throw new Error(`Unknown command "${currCommand}"`);
		}
	}
} // }}}

/**
 * @param {string[]} system
 * @param {number} index
 * @param {File[]} accumulator
 * @returns {File}
 */
function parseFileSystem(system, index, accumulator) { // {{{
	if (index >= system.length) {
		/** @type {Dir} */
		const rootDir = accumulator[0];

		if ( !(rootDir instanceof Dir ) )
			throw new Error(`Parent is not of type Dir, found "${parent}"`);

		// collapse trailing dirs into the root dir
		const ret =  accumulator.slice(1)
			.reduce( (acc, curr) => {
				acc.addFile(curr);

				return acc;
			}, rootDir );

		return ret;
	}

	const curr = system[index];

	if ( curr.startsWith(COMMAND_PREFIX) )
		return parseCommand(system, index, accumulator);

	if ( curr.startsWith(DIR_PREFIX) )
		return parseFileSystem(system, index + 1, accumulator);

	const [
		/* whole match */,
		fileSize,
		fileName,
	] = /^(\d+) +([a-z.]+)$/i.exec(curr);
	const file = new File( fileName, parseInt(fileSize) );
	/** @type {Dir} */
	const parent = accumulator[accumulator.length - 1];

	if ( !(parent instanceof Dir) )
		throw new Error(`Parent is not of type Dir, found "${parent}"`);

	parent.addFile(file);

	return parseFileSystem(system, index + 1, accumulator);
} // }}}

/**
 * @param {Dir} root
 * @returns {Dir[]}
 */
function getDeletionCandidates(root) {
	/** @type {Dir[]} */
	const candidates = [];

	for (const dir of root.children) {
		if (dir instanceof Dir && dir.size >= SPACE_EXTRA_REQUIRED) {
			candidates.push( dir, ...getDeletionCandidates(dir) );
		}
	}

	return candidates;
}

/**
 * @param {Dir} root
 * @returns {number}
 */
function calculateSize(root) { // {{{
	const candidates = getDeletionCandidates(root);
	let toDelete = candidates[0];

	for (let i = 1; i < candidates.length; i++)
		if ( candidates[i].size < toDelete.size )
			toDelete = candidates[i];

	return toDelete.size;
}
// }}}

const data = readFileSync( pathJoin(__dirname, FILE) )
	.toString()
	.split("\n")
	.filter(line => !!line);
const root = parseFileSystem(data, 0, []);

printFiles([ root ]);

console.log( `Size of file to delete to free up space:`, calculateSize(root) );
