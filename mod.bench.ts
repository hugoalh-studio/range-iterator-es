import rangeIterator from "./mod.ts";
Deno.bench("Big Integer 1~100", () => {
	for (const iterator of rangeIterator(1n, 100n)) {
		iterator;
	}
});
Deno.bench("Number 1~100", () => {
	for (const iterator of rangeIterator(1, 100)) {
		iterator;
	}
});
Deno.bench("Character 0~1114111", () => {
	for (const iterator of rangeIterator(String.fromCodePoint(0), String.fromCodePoint(0x10FFFF))) {
		iterator;
	}
});
Deno.bench("Big Integer 100~1", () => {
	for (const iterator of rangeIterator(100n, 1n)) {
		iterator;
	}
});
Deno.bench("Number 100~1", () => {
	for (const iterator of rangeIterator(100, 1)) {
		iterator;
	}
});
Deno.bench("Character 1114111~0", () => {
	for (const iterator of rangeIterator(String.fromCodePoint(0x10FFFF), String.fromCodePoint(0))) {
		iterator;
	}
});
