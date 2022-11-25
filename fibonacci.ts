/**
 * category: dynamic programming
 * problem: fibonacci
 */

import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function fib(n: number): number {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}

function fib2(n: number, dp: number[] = []): number {
  if (n < 2) return n;

  if (dp[n - 1] === undefined) {
    dp[n - 1] = fib2(n - 1, dp);
  }
  if (dp[n - 2] === undefined) {
    dp[n - 2] = fib2(n - 2, dp);
  }
  return dp[n - 2] + dp[n - 1];
}

function fib22(n: number, dp: number[] = []): number {
  if (n < 2) return n;
  if (dp[n]) return dp[n];
  return dp[n] = fib22(n - 1, dp) + fib22(n - 2, dp);
}

function fib23(n: number): number {
  const dp: number[] = [];

  const fibmemo = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (dp[n] === undefined) fibmemo(n - 1) + fibmemo(n - 2);
    return 0;
  };

  return fibmemo(n);
}

function fib3(n: number): number {
  if (n < 2) return n;

  let [first, second] = [0, 1];
  let sum = 0;
  let i = 2;

  while (i <= n) {
    sum = first + second;
    first = second;
    second = sum;
    i++;
  }

  return sum;
}

function fib32(n: number): number {
  let curr = 0, next = 1;
  for (let i = 0; i < n; i++) { // iterate from 0 .. n; iteration 0 == step 1 (curr 1, next 1)
    next = curr + next;
    curr = next - curr;
  }
  return curr;
}

function fib4(n: number): number {
  if (n < 2) return n;
  const dp = [0, 1];
  for (let i = 2; i < n + 1; i++) {
    dp.push(dp[i - 1] + dp[i - 2]);
  }
  return dp.pop()!;
}

Deno.test("fibonacci", () => {
  const f = fib32;
  const DELAY = 100;
  const t0 = performance.now();
  assertEquals(f(0), 0);
  assertEquals(f(1), 1);
  assertEquals(f(2), 1, "two");
  assertEquals(f(3), 2);
  assertEquals(f(4), 3, "four");
  assertEquals(f(5), 5);
  assertEquals(f(6), 8);
  assertEquals(f(13), 233);
  assertEquals(f(19), 4181);
  assertEquals(f(30), 832040);
  assertEquals(f(40), 102334155);
  assertEquals(f(43), 433494437);
  //   assertEquals(f(50), 12586269025);
  const t1 = performance.now();
  console.log("time", t1 - t0);
  assertEquals(t1 - t0 < DELAY, true, "executed within time constraints");
});
