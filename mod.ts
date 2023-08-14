/**
 * @access private
 * @param {string} name
 * @param {string} value
 * @returns {number}
 */
function checkCharacter(name: string, value: string): number {
	let valueSplit: string[] = [...value];
	if (valueSplit.length !== 1) {
		throw new SyntaxError(`\`${valueSplit.join(" ")}\` (argument \`${name}\`) must be a string which is in code point range 0 ~ 1114111!`);
	}
	return value.codePointAt(0) as number;
}
/**
 * @access private
 * @template {bigint | number} T
 * @param {T} start
 * @param {T} end
 * @param {T} step
 * @param {boolean} endExclusive
 * @returns {Generator<T, void, unknown>}
 */
function* rangeLooper<T extends bigint | number>(start: T, end: T, step: T, endExclusive: boolean): Generator<T, void, unknown> {
	//@ts-ignore Both types are compatible.
	for (let current: T = start; current <= end; current += step) {
		if (!(endExclusive && current === end)) {
			yield current;
		}
	}
}
/**
 * Range iterator options.
 */
export interface RangeIteratorOptions<T> {
	/**
	 * Whether to exclusive end.
	 * @default false
	 */
	endExclusive?: boolean;
	/**
	 * Step of decrement/increment.
	 * @default 1n // Big integer.
	 * @default 1 // Number/String.
	 */
	step?: T extends bigint ? bigint : number;
	/** @alias endExclusive */exclusiveEnd?: RangeIteratorOptions<T>["endExclusive"];
}
/**
 * Range iterator.
 * @template {bigint | number | string} T
 * @param {T} start Start.
 * @param {T} end End.
 * @param {RangeIteratorOptions<T>["step"]} [step] Step.
 * @returns {Generator<T, void, unknown>}
 */
export function rangeIterator<T extends bigint | number | string>(start: T, end: T, step?: RangeIteratorOptions<T>["step"]): Generator<T, void, unknown>;
/**
 * Range iterator.
 * @template {bigint | number | string} T
 * @param {T} start Start.
 * @param {T} end End.
 * @param {RangeIteratorOptions<T>} [options] Options.
 * @returns {Generator<T, void, unknown>}
 */
export function rangeIterator<T extends bigint | number | string>(start: T, end: T, options?: RangeIteratorOptions<T>): Generator<T, void, unknown>;
export function* rangeIterator<T extends bigint | number | string>(start: T, end: T, options: RangeIteratorOptions<T>["step"] | RangeIteratorOptions<T> = {}): Generator<T, void, unknown> {
	if (
		typeof options === "bigint" ||
		typeof options === "number"
	) {
		options = {
			step: options
		};
	}
	let endExclusive = false;
	options.endExclusive ??= options.exclusiveEnd;
	if (typeof options.endExclusive === "boolean") {
		endExclusive = options.endExclusive;
	} else if (typeof options.endExclusive !== "undefined") {
		throw new TypeError(`Argument \`options.endExclusive\` must be type of boolean or undefined!`);
	}
	if (typeof start === "bigint" && typeof end === "bigint") {
		let step: bigint = (start > end) ? -1n : 1n;
		if (typeof options.step === "bigint") {
			if (!(options.step > 0n)) {
				throw new RangeError(`Argument \`options.step\` must be a bigint which is > 0n!`);
			}
			step = (start > end) ? -options.step : options.step;
		} else if (typeof options.step !== "undefined") {
			throw new TypeError(`Argument \`options.step\` must be type of bigint or undefined!`);
		}
		for (let item of rangeLooper<bigint>(start, end, step, endExclusive)) {
			yield item as T;
		}
	} else {
		let endAsNumber: number;
		let startAsNumber: number;
		let resultIsCharacter = false;
		if (typeof start === "number" && !Number.isNaN(start) && typeof end === "number" && !Number.isNaN(end)) {
			endAsNumber = end;
			startAsNumber = start;
		} else if (typeof start === "string" && typeof end === "string") {
			resultIsCharacter = true;
			startAsNumber = checkCharacter("start", start);
			endAsNumber = checkCharacter("end", end);
		} else {
			throw new TypeError(`Arguments \`start\` and \`end\` must be type of bigints, numbers, or strings (character)!`);
		}
		let step: number = (startAsNumber > endAsNumber) ? -1 : 1;
		if (typeof options.step === "number" && !Number.isNaN(options.step)) {
			if (!(options.step > 0)) {
				throw new RangeError(`Argument \`options.step\` must be a number which is > 0!`);
			}
			step = (startAsNumber > endAsNumber) ? -options.step : options.step;
		} else if (typeof options.step !== "undefined") {
			throw new TypeError(`Argument \`options.step\` must be type of number or undefined!`);
		}
		for (let item of rangeLooper<number>(startAsNumber, endAsNumber, step, endExclusive)) {
			if (resultIsCharacter) {
				yield String.fromCodePoint(item) as T;
			} else {
				yield item as T;
			}
		}
	}
}
export default rangeIterator;
