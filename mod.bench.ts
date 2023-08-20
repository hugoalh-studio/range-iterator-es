import rangeIterator from "./mod.ts";
Deno.bench({
	name: "1",
	fn: () => {
		for (let iterator of rangeIterator(1n, 100n)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "2",
	fn: () => {
		for (let iterator of rangeIterator(1, 100)) {
			iterator;
		}
	}
});
Deno.bench({
	name: "3",
	fn: () => {
		for (let iterator of rangeIterator(String.fromCodePoint(0), String.fromCodePoint(0x10FFFF))) {
			iterator;
		}
	}
});
