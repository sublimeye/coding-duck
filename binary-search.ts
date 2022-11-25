import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function search(stack: number[], needle: number) {
  let lo = 0;
  let hi = stack.length - 1;
  while (lo <= hi) {
    const mid = Math.floor(lo + ((hi - lo) / 2));
    if (needle < stack[mid]) hi = mid - 1;
    else if (needle > stack[mid]) lo = mid + 1;
    else return mid;
  }
  return -1;
}

function search2(a: number[], key: number): number {
  let [lo, hi] = [0, a.length - 1];
  while (lo <= hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);
    if (key < a[mid]) hi = mid - 1;
    else if (key > a[mid]) lo = mid + 1;
    else return mid;
  }
  return -1;
}

Deno.test("Testing Binary Search", () => {
  assertEquals(search([1, 5, 10, 20, 30], 5), 1);
  assertEquals(search([], 10), -1);
  assertEquals(search([10], 10), 0);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 7), 6);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 1), 0);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 4), 3);
});

Deno.test("Testing Binary Search reimplementation", () => {
  assertEquals(search([1, 5, 10, 20, 30], 5), 1);
  assertEquals(search([], 10), -1);
  assertEquals(search([10], 10), 0);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 7), 6);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 1), 0);
  assertEquals(search([1, 2, 3, 4, 5, 6, 7], 4), 3);
});
