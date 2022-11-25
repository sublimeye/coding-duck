/**
 * category: dynamic programming
 * problem: knapsack
 *
 * description: Given a list of n items and their weights,
 * find all sums that can be formed using their weights.
 *
 * Example
Input:
weights = [1, 3, 3, 5]
Output: [0, 1, 3, 4, 5, 6, 7, 8, 9, 11, 12]

Explanation:
We can form all sums from 0 to 12 except 2 and 10.
Here is a short explanation for the sums:

0: use none of the weights
1: use item with weight 1
3: use item with weight 3
4: use weights 1 + 3 = 4
5: use item with weight 5
6: use weights 3 + 3 = 6
7: use weights 1 + 3 + 3 = 7
8: use weights 3 + 5 = 8
9: use weights 1 + 3 + 5 = 9
11: use weights 3 + 3 + 5 = 11
12: use all weights
 */

import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function knapsack1(weights: number[], memo: number[] = []): number[] {
  function sum(memo: number[]): number {
    if (!memo.length) return 0;
    return memo.reduce((a, n) => a + n, 0);
  }

  for (let i = 0; i < weights.length - 1; i++) {
    const [_first, ...tail] = weights;
    memo.push(weights[i]);
    memo.push(weights[i] + sum(tail));
    memo.push(sum(tail));
  }
  return memo;
}

Deno.test("knapsack", () => {
  const f = knapsack1;
  // assertEquals(f([1, 3, 3, 5]), [0, 1, 3, 4, 5, 6, 7, 8, 9, 11, 12]);
  assertEquals(f([1, 3, 5]), [5, 5]);
});
