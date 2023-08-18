import { assertEquals } from "https://deno.land/std@0.198.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.198.0/assert/assert_throws.ts";
import rangeIterator from "./mod.ts";
Deno.test({
	name: "P-0",
	fn: () => {
		assertEquals(Array.from(rangeIterator(1, 9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
	}
});
Deno.test({
	name: "P-1",
	fn: () => {
		assertEquals(Array.from(rangeIterator(1n, 9n, { endExclusive: true })), [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]);
	}
});
Deno.test({
	name: "P-2",
	fn: () => {
		assertEquals(Array.from(rangeIterator(1, 9, { step: 0.5 })), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
	}
});
Deno.test({
	name: "P-3",
	fn: () => {
		assertEquals(Array.from(rangeIterator("a", "z")), ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
	}
});
Deno.test({
	name: "F-1",
	fn: () => {
		assertThrows(() => {
			rangeIterator(1, 9n);
		});
	}
});
Deno.test({
	name: "F-2",
	fn: () => {
		assertThrows(() => {
			rangeIterator(1, NaN);
		});
	}
});
Deno.test({
	name: "F-3",
	fn: () => {
		assertThrows(() => {
			rangeIterator(NaN, NaN);
		});
	}
});
Deno.test({
	name: "F-4",
	fn: () => {
		assertThrows(() => {
			rangeIterator(1, 9, 1n);
		});
	}
});
Deno.test({
	name: "F-5",
	fn: () => {
		assertThrows(() => {
			rangeIterator(false);
		});
	}
});
Deno.test({
	name: "F-6",
	fn: () => {
		assertThrows(() => {
			rangeIterator(undefined);
		});
	}
});
Deno.test({
	name: "F-7",
	fn: () => {
		assertThrows(() => {
			rangeIterator(null);
		});
	}
});
Deno.test({
	name: "F-8",
	fn: () => {
		assertThrows(() => {
			rangeIterator({ foo: "bar" });
		});
	}
});
