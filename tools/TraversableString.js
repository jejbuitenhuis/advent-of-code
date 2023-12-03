export default class TraversableString {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this._originalString = str;

		this.reset();
	}

	empty() {
		return this._characters.length === 0;
	}

	next() {
		this._characters.shift();
	}

	peek(length = 1) {
		return this._characters.slice(0, length)
			.join("");
	}

	reset() {
		this._characters = this._originalString.split("");
	}
}
