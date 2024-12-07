function resolveCharacterCodePoint(parameterName: string, item: string): number {
	try {
		if ([...item].length !== 1) {
			throw undefined;
		}
		const result: number | undefined = item.codePointAt(0);
		if (typeof result === "undefined") {
			throw undefined;
		}
		return result;
	} catch {
		throw new RangeError(`\`${item}\` (parameter \`${parameterName}\`) is not a character which is in code point range 0 ~ 1114111!`);
	}
}
/**
 * Accept type of the range iterator.
 * @deprecated
 */
export type RangeIteratorAcceptType = bigint | number | string;
/**
 * Index type of the range iterator.
 * @deprecated
 */
export type RangeIteratorIndexType<T extends RangeIteratorAcceptType> = T extends bigint ? bigint : number;
/**
 * Options of the range iterator.
 */
export interface RangeIteratorOptions<T extends bigint | number> {
	/**
	 * Whether the end of the range is exclusive.
	 * @default {false}
	 */
	endExclusive?: boolean;
	/**
	 * Whether the start of the range is exclusive.
	 * @default {false}
	 */
	startExclusive?: boolean;
	/**
	 * Step of the decrement (`start` is smaller than `end`) or increment (`start` is bigger than `end`) of the iterate. By default, it is 1 step.
	 * 
	 * For iterate numbers, this property also accept float number.
	 */
	step?: T;
	/**
	 * Whether the end of the range is exclusive. Alias of the property {@linkcode endExclusive}.
	 * @default {false}
	 * @deprecated Use property {@linkcode endExclusive} instead.
	 */
	exclusiveEnd?: boolean;
}
function rangeLooperNumerics(start: bigint, end: bigint, step: bigint, startExclusive: boolean, endExclusive: boolean): Generator<bigint>;
function rangeLooperNumerics(start: number, end: number, step: number, startExclusive: boolean, endExclusive: boolean): Generator<number>;
function* rangeLooperNumerics(start: bigint | number, end: bigint | number, step: bigint | number, startExclusive: boolean, endExclusive: boolean): Generator<bigint | number> {
	const isReverse: boolean = start > end;
	//@ts-ignore Overloads.
	for (let current: bigint | number = start; isReverse ? (current >= end) : (current <= end); current += isReverse ? -step : step) {
		if (!(
			(startExclusive && current === start) ||
			(endExclusive && current === end)
		)) {
			yield current;
		}
	}
}
function* rangeLooperCharacters(start: number, end: number, step: number, startExclusive: boolean, endExclusive: boolean): Generator<string> {
	for (const element of rangeLooperNumerics(start, end, step, startExclusive, endExclusive)) {
		yield String.fromCodePoint(element);
	}
}
/**
 * Range iterator with big integers.
 * @param {bigint} start A big integer to start the iterate.
 * @param {bigint} end A big integer to end the iterate.
 * @param {RangeIteratorOptions<bigint>} [options] Options.
 * @returns {Generator<bigint>}
 * @example Iterate big integers from 1 to 9
 * ```ts
 * Array.from(rangeIterator(1n, 9n));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n]
 * ```
 * @example Iterate big integers from 1 to 9 with exclusive end
 * ```ts
 * Array.from(rangeIterator(1n, 9n, { endExclusive: true }));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
 * ```
 * @example Iterate big integers from 9 to 1
 * ```ts
 * Array.from(rangeIterator(9n, 1n));
 * //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n]
 * ```
 */
export function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
/**
 * Range iterator with big integers.
 * @param {bigint} start A big integer to start the iterate.
 * @param {bigint} end A big integer to end the iterate.
 * @param {bigint} step Step of the decrement/increment of the iterate.
 * @returns {Generator<bigint>}
 * @example Iterate big integers from 1 to 9 with increment by 2 steps
 * ```ts
 * Array.from(rangeIterator(1n, 9n, 2n));
 * //=> [1n, 3n, 5n, 7n, 9n]
 * ```
 * @example Iterate big integers from 9 to 1 with decrement by 2 steps
 * ```ts
 * Array.from(rangeIterator(9n, 1n, 2n));
 * //=> [9n, 7n, 5n, 3n, 1n]
 * ```
 */
export function rangeIterator(start: bigint, end: bigint, step: bigint): Generator<bigint>;
/**
 * Range iterator with numbers.
 * @param {number} start A number to start the iterate.
 * @param {number} end A number to end the iterate.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<number>}
 * @example Iterate numbers from 1 to 9
 * ```ts
 * Array.from(rangeIterator(1, 9));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 * @example Iterate numbers from 1 to 9 with exclusive end
 * ```ts
 * Array.from(rangeIterator(1, 9, { endExclusive: true }));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8]
 * ```
 * @example Iterate numbers from 9 to 1
 * ```ts
 * Array.from(rangeIterator(9, 1));
 * //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
 * ```
 */
export function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
/**
 * Range iterator with numbers.
 * @param {number} start A number to start the iterate.
 * @param {number} end A number to end the iterate.
 * @param {number} step Step of the decrement/increment of the iterate.
 * @returns {Generator<number>}
 * @example Iterate numbers from 1 to 9 with increment by 2 steps
 * ```ts
 * Array.from(rangeIterator(1, 9, 2));
 * //=> [1, 3, 5, 7, 9]
 * ```
 * @example Iterate numbers from 9 to 1 with decrement by 2 steps
 * ```ts
 * Array.from(rangeIterator(9, 1, 2));
 * //=> [9, 7, 5, 3, 1]
 * ```
 */
export function rangeIterator(start: number, end: number, step: number): Generator<number>;
/**
 * Range iterator with characters.
 * @param {string} start A character to start the iterate.
 * @param {string} end A character to end the iterate.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<string>}
 * @example Iterate characters from "a" to "g"
 * ```ts
 * Array.from(rangeIterator("a", "g"));
 * //=> ["a", "b", "c", "d", "e", "f", "g"]
 * ```
 * @example Iterate characters from "a" to "g" with exclusive end
 * ```ts
 * Array.from(rangeIterator("a", "g", { endExclusive: true }));
 * //=> ["a", "b", "c", "d", "e", "f"]
 * ```
 * @example Iterate characters from "g" to "a"
 * ```ts
 * Array.from(rangeIterator("g", "a"));
 * //=> ["g", "f", "e", "d", "c", "b", "a"]
 * ```
 */
export function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<number>): Generator<string>;
/**
 * Range iterator with characters.
 * @param {string} start A character to start the iterate.
 * @param {string} end A character to end the iterate.
 * @param {number} step Step of the decrement/increment of the iterate.
 * @returns {Generator<string>}
 * @example Iterate characters from "a" to "g" with increment by 2 steps
 * ```ts
 * Array.from(rangeIterator("a", "g", 2));
 * //=> ["a", "c", "e", "g"]
 * ```
 * @example Iterate characters from "g" to "a" with decrement by 2 steps
 * ```ts
 * Array.from(rangeIterator("g", "a", 2));
 * //=> ["g", "e", "c", "a"]
 * ```
 */
export function rangeIterator(start: string, end: string, step: number): Generator<string>;
export function rangeIterator(start: bigint | number | string, end: bigint | number | string, param2?: bigint | number | RangeIteratorOptions<bigint | number>): Generator<bigint | number | string> {
	const options: RangeIteratorOptions<bigint | number> = (
		typeof param2 === "bigint" ||
		typeof param2 === "number"
	) ? { step: param2 } : (param2 ?? {});
	const { startExclusive = false }: RangeIteratorOptions<bigint | number> = options;
	const endExclusive: boolean = options.endExclusive ?? options.exclusiveEnd ?? false;
	if (typeof start === "bigint" && typeof end === "bigint") {
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "bigint" && options.step > 0n)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a bigint which is > 0!`);
			}
		}
		return rangeLooperNumerics(start, end, options.step ?? 1n, startExclusive, endExclusive);
	}
	if (typeof start === "number" && typeof end === "number") {
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "number" && options.step > 0)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a number which is > 0!`);
			}
		}
		return rangeLooperNumerics(start, end, options.step ?? 1, startExclusive, endExclusive);
	}
	if (typeof start === "string" && typeof end === "string") {
		const startCodePoint: number = resolveCharacterCodePoint("start", start);
		const endCodePoint: number = resolveCharacterCodePoint("end", end);
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "number" && Number.isSafeInteger(options.step) && options.step > 0)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a number which is integer, safe, and > 0!`);
			}
		}
		return rangeLooperCharacters(startCodePoint, endCodePoint, options.step ?? 1, startExclusive, endExclusive);
	}
	throw new TypeError(`Parameters \`start\` and \`end\` are not bigints, numbers, or strings (character)!`);
}
export default rangeIterator;
