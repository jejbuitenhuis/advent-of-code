/**
 * @param {string} message
 * @returns {(value: T) => T}
 */
export default function dbg(message) {
	return function (value) {
		if (message) {
			console.log(message, value);
		} else {
			console.log(value);
		}

		return value;
	}
}
