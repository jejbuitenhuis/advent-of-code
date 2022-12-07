export default class File {
	/**
	 * @param {string} name
	 * @param {number} size
	 */
	constructor(name, size) {
		this._name = name;
		this._size = size;
	}

	get name() {
		return this._name;
	}

	get size() {
		return this._size;
	}

	toString() {
		return `${this._name} (file, size=${this._size})`;
	}
}
