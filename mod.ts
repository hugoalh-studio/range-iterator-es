/**
 * @access private
 */
type RangeIndexType<T> = T extends bigint ? bigint : number;
/**
 * Resolve code point of the character.
 * @access private
 * @param {string} argumentName Argument name.
 * @param {string} value Character.
 * @returns {number} Code point of the character.
 */
function resolveCharacterCodePoint(argumentName: string, value: string): number {
	try {
		const valueSplit: string[] = [...value];
		if (valueSplit.length !== 1) {
			throw undefined;
		}
		const characterCodePoint: number | undefined = value.codePointAt(0);
		if (typeof characterCodePoint === "undefined") {
			throw undefined;
		}
		return characterCodePoint;
	} catch {
		throw new RangeError(`\`${value}\` (argument \`${argumentName}\`) is not a character which is in code point range 0 ~ 1114111!`);
	}
}
/**
 * @access private
 */
interface RangeLooperParameters<T extends bigint | number | string> {
	end: RangeIndexType<T>;
	endExclusive: boolean;
	resultIsString: T extends string ? true : false;
	start: RangeIndexType<T>;
	step: RangeIndexType<T>;
}
/**
 * @access private
 * @template {bigint | number | string} T
 * @param {RangeLooperParameters<T>} param0
 * @returns {Generator<T>}
 */
function* rangeLooper<T extends bigint | number | string>({ end, endExclusive, resultIsString, start, step }: RangeLooperParameters<T>): Generator<T> {
	const isReverse: boolean = start > end;
	//@ts-ignore All of the types are compatible.
	for (let current: RangeLooperParameters<T>["start"] = start; isReverse ? (current >= end) : (current <= end); current += isReverse ? -step : step) {
		if (!(endExclusive && current === end)) {
			if (resultIsString) {
				yield String.fromCodePoint(current as number) as T;
			} else {
				yield current as T;
			}
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
	step?: RangeIndexType<T>;
	/** @alias endExclusive */exclusiveEnd?: this["endExclusive"];
}
/**
 * Range iterator with big integers.
 * @param {bigint} start Start.
 * @param {bigint} end End.
 * @param {RangeIteratorOptions<bigint>["step"]} [step] Step.
 * @returns {Generator<bigint>}
 * @example
 * Array.from(rangeIterator(1n, 9n));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n]
 * @example
 * Array.from(rangeIterator(1n, 9n, 2n));
 * //=> [1n, 3n, 5n, 7n, 9n]
 * @example
 * Array.from(rangeIterator(9n, 1n));
 * //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n]
 * @example
 * Array.from(rangeIterator(9n, 1n, 2n));
 * //=> [9n, 7n, 5n, 3n, 1n]
 */
export function rangeIterator(start: bigint, end: bigint, step?: RangeIteratorOptions<bigint>["step"]): Generator<bigint>;
/**
 * Range iterator with numbers.
 * @param {number} start Start.
 * @param {number} end End.
 * @param {RangeIteratorOptions<number>["step"]} [step] Step.
 * @returns {Generator<number>}
 * @example
 * Array.from(rangeIterator(1, 9));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @example
 * Array.from(rangeIterator(1, 9, 2));
 * //=> [1, 3, 5, 7, 9]
 * @example
 * Array.from(rangeIterator(9, 1));
 * //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
 * @example
 * Array.from(rangeIterator(9, 1, 2));
 * //=> [9, 7, 5, 3, 1]
 */
export function rangeIterator(start: number, end: number, step?: RangeIteratorOptions<number>["step"]): Generator<number>;
/**
 * Range iterator with characters.
 * @param {string} start Start.
 * @param {string} end End.
 * @param {RangeIteratorOptions<number>["step"]} [step] Step.
 * @returns {Generator<string>}
 * @example
 * Array.from(rangeIterator("a", "g"));
 * //=> ["a", "b", "c", "d", "e", "f", "g"]
 * @example
 * Array.from(rangeIterator("a", "g", 2));
 * //=> ["a", "c", "e", "g"]
 * @example
 * Array.from(rangeIterator("g", "a"));
 * //=> ["g", "f", "e", "d", "c", "b", "a"]
 * @example
 * Array.from(rangeIterator("g", "a", 2));
 * //=> ["g", "e", "c", "a"]
 */
export function rangeIterator(start: string, end: string, step?: RangeIteratorOptions<string>["step"]): Generator<string>;
/**
 * Range iterator with big integers.
 * @param {bigint} start Start.
 * @param {bigint} end End.
 * @param {RangeIteratorOptions<bigint>} [options] Options.
 * @returns {Generator<bigint>}
 * @example
 * Array.from(rangeIterator(1n, 9n, { endExclusive: true }));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
 */
export function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
/**
 * Range iterator with numbers.
 * @param {number} start Start.
 * @param {number} end End.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<number>}
 * @example
 * Array.from(rangeIterator(1, 9, { endExclusive: true }));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8]
 */
export function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
/**
 * Range iterator with characters.
 * @param {string} start Start.
 * @param {string} end End.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<string>}
 */
export function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string>;
export function rangeIterator<T extends bigint | number | string>(start: T, end: T, options: RangeIteratorOptions<T>["step"] | RangeIteratorOptions<T> = {}): Generator<T> {
	if (typeof options !== "object") {
		options = { step: options };
	}
	const optionsEndExclusive: boolean = options.endExclusive ?? options.exclusiveEnd ?? false;
	if (typeof start === "bigint" && typeof end === "bigint") {
		let step = 1n;
		if (typeof options.step !== "undefined") {
			if (!(options.step > 0n)) {
				throw new RangeError(`Argument \`options.step\` is not a bigint which is > 0!`);
			}
			step = options.step as bigint;
		}
		return rangeLooper<bigint>({
			end,
			endExclusive: optionsEndExclusive,
			resultIsString: false,
			start,
			step
		}) as Generator<T>;
	}
	let resultIsString = false;
	let startAsNumber: number;
	let endAsNumber: number;
	if (typeof start === "number" && typeof end === "number") {
		startAsNumber = start;
		endAsNumber = end;
	} else if (typeof start === "string" && typeof end === "string") {
		resultIsString = true;
		startAsNumber = resolveCharacterCodePoint("start", start);
		endAsNumber = resolveCharacterCodePoint("end", end);
	} else {
		throw new TypeError(`Arguments \`start\` and \`end\` are not bigints, numbers, or strings (character)!`);
	}
	let step = 1;
	if (typeof options.step !== "undefined") {
		if (!(options.step > 0)) {
			throw new RangeError(`Argument \`options.step\` is not a number which is > 0!`);
		}
		step = options.step as number;
	}
	if (resultIsString) {
		return rangeLooper<string>({
			end: endAsNumber,
			endExclusive: optionsEndExclusive,
			resultIsString: true,
			start: startAsNumber,
			step
		}) as Generator<T>;
	}
	return rangeLooper<number>({
		end: endAsNumber,
		endExclusive: optionsEndExclusive,
		resultIsString: false,
		start: startAsNumber,
		step
	}) as Generator<T>;
}
export default rangeIterator;
