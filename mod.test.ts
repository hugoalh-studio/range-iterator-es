import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.201.0/assert/assert_throws.ts";
import rangeIterator from "./mod.ts";
Deno.test("Equal 1", () => {
	assertEquals(Array.from(rangeIterator(1, 9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
Deno.test("Equal 2", () => {
	assertEquals(Array.from(rangeIterator(1n, 9n, { endExclusive: true })), [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]);
});
Deno.test("Equal 3", () => {
	assertEquals(Array.from(rangeIterator(1, 9, { step: 0.5 })), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
});
Deno.test("Equal 4", () => {
	assertEquals(Array.from(rangeIterator("a", "z")), ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
});
Deno.test("Equal 5", () => {
	assertEquals(Array.from(rangeIterator(9, 1)), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
});
Deno.test("Equal 6", () => {
	assertEquals(Array.from(rangeIterator(9n, 1n, { endExclusive: true })), [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]);
});
Deno.test("Equal 7", () => {
	assertEquals(Array.from(rangeIterator(9, 1, { step: 0.5 })), [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]);
});
Deno.test("Equal 8", () => {
	assertEquals(Array.from(rangeIterator("z", "a")), ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"]);
});
Deno.test("Throw 1", () => {
	assertThrows(() => {
		rangeIterator(1, 9n);
	});
});
Deno.test("Throw 2", () => {
	assertThrows(() => {
		rangeIterator(1, NaN);
	});
});
Deno.test("Throw 3", () => {
	assertThrows(() => {
		rangeIterator(NaN, NaN);
	});
});
Deno.test("Throw 4", () => {
	assertThrows(() => {
		rangeIterator(1, 9, 1n);
	});
});
Deno.test("Throw 5", () => {
	assertThrows(() => {
		rangeIterator(false);
	});
});
Deno.test("Throw 6", () => {
	assertThrows(() => {
		rangeIterator(undefined);
	});
});
Deno.test("Throw 7", () => {
	assertThrows(() => {
		rangeIterator(null);
	});
});
Deno.test("Throw 8", () => {
	assertThrows(() => {
		rangeIterator({ foo: "bar" });
	});
});
