import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

function less(a: number, b: number): boolean {
  return a < b;
}

// Selection Sort O(n^2/2)
function sort(a: number[]): number[] {
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (less(a[j], a[min])) min = j;
    }
    swap(a, i, min);
  }
  return a;
}

describe("selection sort", () => {
  it("should sort", () => {
    assertEquals(sort([5, 1, 3, 7]), [1, 3, 5, 7]);
    assertEquals(sort([]), []);
    assertEquals(sort([1]), [1]);
    assertEquals(sort([1, 2, 3]), [1, 2, 3]);
    assertEquals(sort([3, 2, 1]), [1, 2, 3]);
  });
});
