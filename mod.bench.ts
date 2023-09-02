import rangeIterator from "./mod.ts";
Deno.bench("Number 1~9", () => {
	for (const iterator of rangeIterator(1, 9)) {
		iterator;
	}
});
Deno.bench("Big Integer 1~9 End Exclusive", () => {
	for (const iterator of rangeIterator(1n, 9n, { endExclusive: true })) {
		iterator;
	}
});
Deno.bench("Number 1~9 Step 0.5", () => {
	for (const iterator of rangeIterator(1, 9, { step: 0.5 })) {
		iterator;
	}
});
Deno.bench("Character a~z", () => {
	for (const iterator of rangeIterator("a", "z")) {
		iterator;
	}
});
Deno.bench("Number 9~1", () => {
	for (const iterator of rangeIterator(9, 1)) {
		iterator;
	}
});
Deno.bench("Big Integer 9~1 End Exclusive", () => {
	for (const iterator of rangeIterator(9n, 1n, { endExclusive: true })) {
		iterator;
	}
});
Deno.bench("Number 9~1 Step 0.5", () => {
	for (const iterator of rangeIterator(9, 1, { step: 0.5 })) {
		iterator;
	}
});
Deno.bench("Character z~a", () => {
	for (const iterator of rangeIterator("z", "a")) {
		iterator;
	}
});

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
Deno.bench("Character CodePoint 0~1114111", () => {
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
Deno.bench("Character CodePoint 1114111~0", () => {
	for (const iterator of rangeIterator(String.fromCodePoint(0x10FFFF), String.fromCodePoint(0))) {
		iterator;
	}
});
