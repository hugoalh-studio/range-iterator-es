import rangeIterator from "./mod.ts";
Deno.bench({
	name: "0",
	fn: () => {
		for (let iterator of rangeIterator(1n, 9n)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "1",
	fn: () => {
		for (let iterator of rangeIterator(1, 9)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "2",
	fn: () => {
		for (let iterator of rangeIterator(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "3",
	fn: () => {
		for (let iterator of rangeIterator(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0.001)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "4",
	fn: () => {
		for (let iterator of rangeIterator(String.fromCodePoint(0), String.fromCodePoint(0x10FFFF))) {
			iterator;
		}
	}
});
Deno.bench({
	name: "5",
	fn: () => {
		for (let iterator of rangeIterator(BigInt(Number.MIN_SAFE_INTEGER), BigInt(Number.MAX_SAFE_INTEGER))) {
			iterator;
		}
	}
});
