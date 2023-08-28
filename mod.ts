type RangeIndexType<T> = T extends bigint ? bigint : number;
/**
 * @access private
 * @param {string} name
 * @param {string} value
 * @returns {number}
 */
function checkCharacter(name: string, value: string): number {
	const valueSplit: string[] = [...value];
	if (valueSplit.length !== 1) {
		throw new RangeError(`\`${valueSplit.join(" ")}\` (argument \`${name}\`) is not a character which is in code point range 0 ~ 1114111!`);
	}
	return value.codePointAt(0) as number;
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
 * @param {RangeLooperParameters<T>} param
 * @returns {Generator<T, void, unknown>}
 */
function* rangeLooper<T extends bigint | number | string>(param: RangeLooperParameters<T>): Generator<T, void, unknown> {
	const isReverse: boolean = param.start > param.end;
	//@ts-ignore All of the types are compatible.
	for (let current: RangeLooperParameters<T>["start"] = param.start; isReverse ? current >= param.end : current <= param.end; current += isReverse ? -param.step : param.step) {
		if (!(param.endExclusive && current === param.end)) {
			if (param.resultIsString) {
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
 * @returns {Generator<bigint, void, unknown>}
 */
export function rangeIterator(start: bigint, end: bigint, step?: RangeIteratorOptions<bigint>["step"]): Generator<bigint, void, unknown>;
/**
 * Range iterator with numbers.
 * @param {number} start Start.
 * @param {number} end End.
 * @param {RangeIteratorOptions<number>["step"]} [step] Step.
 * @returns {Generator<number, void, unknown>}
 */
export function rangeIterator(start: number, end: number, step?: RangeIteratorOptions<number>["step"]): Generator<number, void, unknown>;
/**
 * Range iterator with characters.
 * @param {string} start Start.
 * @param {string} end End.
 * @param {RangeIteratorOptions<number>["step"]} [step] Step.
 * @returns {Generator<string, void, unknown>}
 */
export function rangeIterator(start: string, end: string, step?: RangeIteratorOptions<string>["step"]): Generator<string, void, unknown>;
/**
 * Range iterator with big integers.
 * @param {bigint} start Start.
 * @param {bigint} end End.
 * @param {RangeIteratorOptions<bigint>} [options] Options.
 * @returns {Generator<bigint, void, unknown>}
 */
export function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint, void, unknown>;
/**
 * Range iterator with numbers.
 * @param {number} start Start.
 * @param {number} end End.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<number, void, unknown>}
 */
export function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number, void, unknown>;
/**
 * Range iterator with characters.
 * @param {string} start Start.
 * @param {string} end End.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<string, void, unknown>}
 */
export function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string, void, unknown>;
export function rangeIterator<T extends bigint | number | string>(start: T, end: T, options: RangeIteratorOptions<T>["step"] | RangeIteratorOptions<T> = {}): Generator<T, void, unknown> {
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
		throw new TypeError(`Argument \`options.endExclusive\` is not a boolean or undefined!`);
	}
	if (typeof start === "bigint" && typeof end === "bigint") {
		let step = 1n;
		if (typeof options.step === "bigint") {
			if (!(options.step > 0n)) {
				throw new RangeError(`Argument \`options.step\` is not a bigint which is > 0n!`);
			}
			step = options.step;
		} else if (typeof options.step !== "undefined") {
			throw new TypeError(`Argument \`options.step\` is not a bigint or undefined!`);
		}
		return rangeLooper<bigint>({
			end,
			step,
			endExclusive,
			resultIsString: false,
			start
		}) as Generator<T, void, unknown>;
	} else {
		let endAsNumber: number;
		let startAsNumber: number;
		let resultIsString = false;
		if (typeof start === "number" && !Number.isNaN(start) && typeof end === "number" && !Number.isNaN(end)) {
			endAsNumber = end;
			startAsNumber = start;
		} else if (typeof start === "string" && typeof end === "string") {
			resultIsString = true;
			startAsNumber = checkCharacter("start", start);
			endAsNumber = checkCharacter("end", end);
		} else {
			throw new TypeError(`Arguments \`start\` and \`end\` are not bigints, numbers, or strings (character)!`);
		}
		let step = 1;
		if (typeof options.step === "number" && !Number.isNaN(options.step)) {
			if (!(options.step > 0)) {
				throw new RangeError(`Argument \`options.step\` is not a number which is > 0!`);
			}
			step = options.step;
		} else if (typeof options.step !== "undefined") {
			throw new TypeError(`Argument \`options.step\` is not a number or undefined!`);
		}
		if (resultIsString) {
			return rangeLooper<string>({
				end: endAsNumber,
				endExclusive,
				resultIsString: true,
				start: startAsNumber,
				step
			}) as Generator<T, void, unknown>;
		}
		return rangeLooper<number>({
			end: endAsNumber,
			endExclusive,
			resultIsString: false,
			start: startAsNumber,
			step
		}) as Generator<T, void, unknown>;
	}
}
export default rangeIterator;
