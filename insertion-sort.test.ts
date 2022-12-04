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

// O(n/4), fast for nearly sorted, shell-sort - improved version
// move i from the beginning to the end
// move j from i to the beginning swapping each time el is out of order
function sort(a: number[]): number[] {
  for (let i = 0; i < a.length; i++) {
    for (let j = i; j > 0; j--) {
      if (less(a[j], a[j - 1])) swap(a, j, j - 1);
      else break;
    }
  }

  return a;
}

describe("insertion sort", () => {
  it("should sort", () => {
    assertEquals(sort([5, 1, 3, 7]), [1, 3, 5, 7]);
    assertEquals(sort([]), []);
    assertEquals(sort([1]), [1]);
    assertEquals(sort([1, 2, 3]), [1, 2, 3]);
    assertEquals(sort([3, 2, 1]), [1, 2, 3]);
    assertEquals(sort([1, 1, 1]), [1, 1, 1]);
    assertEquals(sort([10, 1, 100, -50, 1, 1000]), [-50, 1, 1, 10, 100, 1000]);
  });
});
