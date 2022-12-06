import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

// sort
// create aux array
// start recursive sort a, aux, lo, hi

// sort_recursive
// if lo >= hi return
// get mid as in binary search
// sort left half :: lo to mid
// sort right half :: mid+1 to hi
// merge a aux lo mid hi

// merge (a, aux, lo, mid, hi)
// copy a -> aux ::from:: lo to hi
// two pointers i, j pointing to beginning of each half
// iterate from:: lo to hi
// :: four conditions::
// 2 check if i or j reached the end of its half and take from other half
// 2 if right < less -> take right else left

function sort(a: number[]): void {
  function merge(
    a: number[],
    aux: number[],
    lo: number,
    mid: number,
    hi: number,
  ) {
    for (let k = lo; k <= hi; k++) aux[k] = a[k];

    let i = lo, j = mid + 1;
    // ----------------v this is important, we go until the end
    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = aux[j++];
      else if (j > hi) a[k] = aux[i++];
      else if (aux[j] < aux[i]) a[k] = aux[j++];
      else a[k] = aux[i++];
    }
  }
  function sortRec(
    a: number[],
    aux: number[],
    lo: number,
    hi: number,
  ) {
    if (lo >= hi) return;
    const mid = lo + Math.floor((hi - lo) / 2);
    sortRec(a, aux, lo, mid);
    sortRec(a, aux, mid + 1, hi);
    merge(a, aux, lo, mid, hi);
  }

  // imitating low level array copy creation
  const aux = new Array(a.length);
  sortRec(a, aux, 0, a.length - 1);
}

describe("merge sort", () => {
  it("sort base case", () => {
    const a = [5, 1, 2, 4, 3];
    sort(a);
    assertEquals(a, [1, 2, 3, 4, 5]);
  });
});
