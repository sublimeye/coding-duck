/**
 * category: dp
 * problem: coin changing
 *
 * description:
 * Given n coin denominations { d1, d2, ..., dn }
 * and a target value V, find the fewest coins
 * needed to make change for V (or report impossible).
 *
 * input
 * - denominations: [1, 5, 10, 25, 100], sum: 110
 * - ouput: 2 (100 + 10)
 */

import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function main(d: number[], V: number): number {
  let opt: number[] = Array(V + 1);
  opt[0] = 0;

  for (let v = 1; v <= V; v++) {
    opt[v] = Infinity;
    for (const di of d) {
      if (di <= v) {
        opt[v] = Math.min(opt[v], 1 + opt[v - di]);
      }
    }
  }

  return opt[V];
}

/** This solution is only applicable to coins where denomination
 * guarantee to be self divisble and unlimited value
 *
 * *WRONG* for general case
 */
function main2(d: number[], V: number): number {
  let count = 0;
  let rest = V;
  const coins = [...d].sort((a, b) => a - b).reverse();
  const output = [];

  for (const coin of coins) {
    while (rest > 0 && coin <= rest) {
      rest -= coin;
      count++;
      output.push(coin);
    }
  }

  return rest === 0 ? count : -1;
}

function main3(coins: number[], v: number): number {
  function dfs(coins: number[], rem: number, memo: number[] = []): number {
    if (rem === 0) return 0;
    if (rem < 0) return -1;
    if (memo[rem - 1] !== 0) return memo[rem - 1];
    let min = Infinity;
    for (const coin of coins) {
      const result = dfs(coins, rem - coin, memo);
      if (result >= 0 && result < min) min = result + 1;
    }
    memo[rem - 1] = min === Infinity ? -1 : min;
    return memo[rem - 1];
  }
  const memo = Array(v).fill(0);
  return dfs(coins, v, memo);
}

function main4(coins: number[], amount: number): number {
  function rec(amount: number, coinIndex: number): number {
    if (amount < 0) return 0;
    if (amount === 0) return 1;

    let combos = 0;
    for (let coin = coinIndex; coin < coins.length; coin++) {
      combos += rec(amount - coins[coin], coin);
    }
    return combos;
  }
  return rec(amount, 0);
}

Deno.test("coin change", () => {
  const f = main4;
  const t1 = performance.now();
  assertEquals(f([1, 2, 3], 10), 4);
  assertEquals(f([1, 5, 10, 25, 100], 6), 2, "6");
  assertEquals(f([1, 5, 10, 25, 100], 15), 2, "15");
  assertEquals(f([1, 5, 10, 25, 100], 19), 6);
  assertEquals(f([1, 5, 10, 25, 100], 161), 5);
  assertEquals(f([99, 98, 2], 298), 4, "smart");
  assertEquals(f([1, 5, 11], 11), 1);
  assertEquals(f([1, 5, 11], 12), 2);
  assertEquals(f([1, 7, 39], 1), 1);
  assertEquals(f([1, 7, 39], 7), 1);
  assertEquals(f([1, 7, 39], 39), 1);
  assertEquals(f([1, 7, 39], 38), 8);
  assertEquals(f([1, 7, 39], 1000), 32);
  assertEquals(f([1, 2, 4, 8], 1024), 128);
  // assertEquals(f([1, 2, 4, 8], 10240), 1280);
  // assertEquals(f([1, 2, 4, 8], 1048586), 131074);
  assertEquals(f([1, 2, 4, 8], 0), 0);
  assertEquals(f([186, 419, 83, 408], 6249), 20);

  const t2 = performance.now();
  console.log("time", t2 - t1);
});
