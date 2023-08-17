import { assertEquals } from "https://deno.land/std@0.198.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.198.0/assert/assert_throws.ts";
import rangeIterator from "./mod.ts";
Deno.test("0", () => {
	assertEquals(Array.from(rangeIterator(1, 9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
Deno.test("1", () => {
	assertEquals(Array.from(rangeIterator(1n, 9n, { endExclusive: true })), [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]);
});
Deno.test("2", () => {
	assertEquals(Array.from(rangeIterator(1, 9, { step: 0.5 })), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
});
Deno.test("3", () => {
	assertEquals(Array.from(rangeIterator("a", "z")), ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
});
Deno.test("4", () => {
	assertThrows(() => {
		rangeIterator(1, 9n);
	});
});
Deno.test("5", () => {
	assertThrows(() => {
		rangeIterator(1, NaN);
	});
});
Deno.test("6", () => {
	assertThrows(() => {
		rangeIterator(NaN, NaN);
	});
});
Deno.test("7", () => {
	assertThrows(() => {
		rangeIterator(1, 9, 1n);
	});
});
Deno.test("8", () => {
	assertThrows(() => {
		rangeIterator(false);
	});
});
Deno.test("9", () => {
	assertThrows(() => {
		rangeIterator(undefined);
	});
});
Deno.test("10", () => {
	assertThrows(() => {
		rangeIterator(null);
	});
});
Deno.test("11", () => {
	assertThrows(() => {
		rangeIterator({ foo: "bar" });
	});
});
