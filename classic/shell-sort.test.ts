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

// similar to insertion sort
// does sorting with window h of arbitrary sizes
function sort(a: number[]): number[] {
  let n = a.length;
  let h = 1;

  while (h < n / 3) h = 3 * h + 1; // increment to the max h value

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      // j starts with i
      // j jumps back by h
      // j must be gte h (there must be next jump back)
      for (let j = i; j >= h && less(a[j], a[j - h]); j -= h) {
        swap(a, j, j - h);
      }
    }
    h = Math.floor(h / 3);
  }

  return a;
}

describe("shell sort", () => {
  it("should sort", () => {
    assertEquals(sort([5, 1, 3, 7]), [1, 3, 5, 7]);
    assertEquals(sort([]), []);
    assertEquals(sort([1]), [1]);
    assertEquals(sort([1, 2, 3]), [1, 2, 3]);
    assertEquals(sort([3, 2, 1]), [1, 2, 3]);
    assertEquals(sort([1, 1, 1]), [1, 1, 1]);
    assertEquals(sort([10, 1, 100, -50, 1, 1000]), [-50, 1, 1, 10, 100, 1000]);
    assertEquals(sort([5, 1, 3, 7]), [1, 3, 5, 7]);
    assertEquals(
      sort(
        // deno-fmt-ignore
        [
          79,  0, 22,  8,  1, 35, 46, 25,  2, 32, 59, 86,
            6, 53, 67, 95, 73, 17, 42, 72, 41, 33, 76, 63,
          14, 39, 66, 90, 61, 18, 43, 51, 19, 36, 87, 28,
          58, 69, 56, 89, 38, 83, 20, 44, 29, 68, 62, 10,
          27, 93, 99, 54, 85, 91, 30, 75, 23, 92, 81, 52,
          47, 37, 13, 71,  3, 50, 12, 65,  4, 97, 98, 55,
          11, 15, 88, 80, 49, 77, 64,  5, 24, 82, 57, 84,
          70, 48, 16,  7, 60, 78,  9, 40, 74, 31, 26, 45,
          94, 21, 34, 96
        ],
      ),
      // deno-fmt-ignore
      [
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
       36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
       48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
       60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
       72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
       84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
       96, 97, 98, 99
     ],
    );
  });
});
