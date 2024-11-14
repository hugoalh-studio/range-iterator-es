function resolveCharacterCodePoint(parameterName: string, item: string): number {
	try {
		const itemSplit: string[] = [...item];
		if (itemSplit.length !== 1) {
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
 */
export type RangeIteratorAcceptType = bigint | number | string;
/**
 * Index type of the range iterator.
 */
export type RangeIteratorIndexType<T extends RangeIteratorAcceptType> = T extends bigint ? bigint : number;
/**
 * Options of the range iterator.
 */
export interface RangeIteratorOptions<T extends RangeIteratorAcceptType> {
	/**
	 * Whether the end of the range is exclusive.
	 * @default {false}
	 */
	endExclusive?: boolean;
	/**
	 * Step of the decrement/increment of the iterate.
	 * @default {1n} Big integer.
	 * @default {1} Number/String.
	 */
	step?: RangeIteratorIndexType<T>;
	/**
	 * Whether the end of the range is exclusive. Alias of the property {@linkcode endExclusive}.
	 * @default {false}
	 * @deprecated Use property {@linkcode endExclusive} instead.
	 */
	exclusiveEnd?: boolean;
}
interface RangeIteratorLooperParameters<T extends RangeIteratorAcceptType> extends Required<Omit<RangeIteratorOptions<T>, "exclusiveEnd">> {
	end: RangeIteratorIndexType<T>;
	resultIsString: T extends string ? true : false;
	start: RangeIteratorIndexType<T>;
}
function* rangeLooper<T extends RangeIteratorAcceptType>({
	end,
	endExclusive,
	resultIsString,
	start,
	step
}: RangeIteratorLooperParameters<T>): Generator<T> {
	const isReverse: boolean = start > end;
	//@ts-ignore All of the types are compatible.
	for (let current: RangeIteratorLooperParameters<T>["start"] = start; isReverse ? (current >= end) : (current <= end); current += isReverse ? -step : step) {
		if (!(endExclusive && current === end)) {
			yield (resultIsString ? String.fromCodePoint(current as number) : current) as T;
		}
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
 * @param {RangeIteratorIndexType<bigint>} step Step of the decrement/increment of the iterate.
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
export function rangeIterator(start: bigint, end: bigint, step: RangeIteratorIndexType<bigint>): Generator<bigint>;
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
 * @param {RangeIteratorIndexType<number>} step Step of the decrement/increment of the iterate.
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
export function rangeIterator(start: number, end: number, step: RangeIteratorIndexType<number>): Generator<number>;
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
export function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string>;
/**
 * Range iterator with characters.
 * @param {string} start A character to start the iterate.
 * @param {string} end A character to end the iterate.
 * @param {RangeIteratorIndexType<string>} step Step of the decrement/increment of the iterate.
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
export function rangeIterator(start: string, end: string, step?: RangeIteratorIndexType<string>): Generator<string>;
export function rangeIterator<T extends RangeIteratorAcceptType>(start: T, end: T, param2?: RangeIteratorOptions<T> | RangeIteratorIndexType<T>): Generator<T> {
	const options: RangeIteratorOptions<T> = (
		typeof param2 === "bigint" ||
		typeof param2 === "number"
	) ? { step: param2 } : (param2 ?? {});
	const optionsEndExclusive: boolean = options.endExclusive ?? options.exclusiveEnd ?? false;
	if (typeof start === "bigint" && typeof end === "bigint") {
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "bigint" && options.step > 0n)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a bigint which is > 0!`);
			}
		}
		return rangeLooper<bigint>({
			end,
			endExclusive: optionsEndExclusive,
			resultIsString: false,
			start,
			step: options.step ?? 1n
		}) as Generator<T>;
	}
	let resultIsString: boolean;
	let startAsNumber: number;
	let endAsNumber: number;
	if (typeof start === "number" && typeof end === "number") {
		resultIsString = false;
		startAsNumber = start;
		endAsNumber = end;
	} else if (typeof start === "string" && typeof end === "string") {
		resultIsString = true;
		startAsNumber = resolveCharacterCodePoint("start", start);
		endAsNumber = resolveCharacterCodePoint("end", end);
	} else {
		throw new TypeError(`Parameters \`start\` and \`end\` are not bigints, numbers, or strings (character)!`);
	}
	if (typeof options.step !== "undefined") {
		if (!(typeof options.step === "number" && options.step > 0)) {
			throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a number which is > 0!`);
		}
	}
	return rangeLooper<number | string>({
		end: endAsNumber,
		endExclusive: optionsEndExclusive,
		resultIsString,
		start: startAsNumber,
		step: options.step ?? 1
	}) as Generator<T>;
}
export default rangeIterator;
