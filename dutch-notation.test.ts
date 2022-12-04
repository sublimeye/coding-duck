import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

//  3 way sort / dutch notation
function sort(a: number[]): number[] {
  for (let lo = 0, mid = 0, hi = a.length - 1; mid <= hi;) {
    if (a[mid] === 0) swap(a, lo++, mid++);
    else if (a[mid] === 1) mid++;
    else if (a[mid] === 2) swap(a, mid, hi--);
  }
  return a;
}

describe("dutch notation sort", () => {
  it("should sort", () => {
    assertEquals(
      sort(
        // deno-fmt-ignore
        [
        0, 2, 1, 2, 0,
        1, 1, 0, 2, 0,
        1, 2, 0, 0, 2,
        1, 0, 1, 2, 1
      ],
      ),
      // deno-fmt-ignore
      [
        0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2
      ],
    );
  });
});
