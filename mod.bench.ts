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
