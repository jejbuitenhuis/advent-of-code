import File from "./File";

export default class Dir extends File {
	/**
	 * @param {string} name
	 */
	constructor(name) {
		super(name, 0);

		/** @type {File[]} */
		this._files = [];
	}

	get size() {
		return this._files.reduce( (acc, curr) => acc + curr.size, 0 );
	}

	get children() {
		return this._files;
	}

	/**
	 * @param {File} file
	 */
	addFile(file) {
		this._files.push(file);
	}

	toString() {
		return `${this._name} (dir)`;
	}
}
