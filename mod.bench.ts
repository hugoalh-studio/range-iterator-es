import rangeIterator from "./mod.ts";
Deno.bench({
	name: "0",
	fn: () => {
		Array.from(rangeIterator(1n, 9n))
	}
});
Deno.bench({
	name: "1",
	fn: () => {
		Array.from(rangeIterator(1, 9))
	}
});
Deno.bench({
	name: "2",
	fn: () => {
		Array.from(rangeIterator(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER))
	}
});
Deno.bench({
	name: "3",
	fn: () => {
		Array.from(rangeIterator(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0.001))
	}
});
Deno.bench({
	name: "4",
	fn: () => {
		Array.from(rangeIterator(String.fromCodePoint(0), String.fromCodePoint(0x10FFFF)))
	}
});
