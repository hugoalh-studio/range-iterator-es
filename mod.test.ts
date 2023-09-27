import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";
import { rangeIterator } from "./mod.ts";
Deno.test("Number 1~9", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(1, 9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
Deno.test("BigInteger 1~9 EndExclusive", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(1n, 9n, { endExclusive: true })), [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]);
});
Deno.test("Number 1~9 Step 0.5", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(1, 9, { step: 0.5 })), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
});
Deno.test("Character a~z", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator("a", "z")), ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
});
Deno.test("Number 9~1", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(9, 1)), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
});
Deno.test("BigInteger 9~1 EndExclusive", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(9n, 1n, { endExclusive: true })), [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]);
});
Deno.test("Number 9~1 Step 0.5", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator(9, 1, { step: 0.5 })), [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]);
});
Deno.test("Character z~a", { permissions: "none" }, () => {
	assertEquals(Array.from(rangeIterator("z", "a")), ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"]);
});
