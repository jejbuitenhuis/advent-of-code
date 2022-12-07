import File from "./File";
import Dir from "./Dir";

function getIndent(depth) {
	return Array.from( Array(depth) )
		.map(() => "|   ")
		.join("");
}

/**
 * @param {File[]} root
 * @param {number} [depth=0]
 */
export default function printFiles(root, depth = 0) {
	/** @type {Dir[]} */
	const dirs = root.filter( f => f instanceof Dir );
	/** @type {File[]} */
	const files = root.filter( f => !(f instanceof Dir) );
	const indent = getIndent(depth);

	for (const dir of dirs) {
		console.log(
			"%s%s (dir)",
			indent,
			dir.name,
		);

		printFiles(dir.children, depth + 1);
	}

	for (const file of files)
		console.log(
			"%s%s (file, size=%d)",
			indent,
			file.name,
			file.size,
		);
}
