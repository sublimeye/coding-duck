/**
 * category: dp
 * problem: router installation problem
 *
 * description:
 * Goal. Install WiFi routers in a row of n houses so that:
 * Minimize total cost, where:
 * cost(i) = cost to install a router at house i
 * Requirement: no two consecutive houses without a router.
 *
 * n = number of houses
 * cost = number[] array of costs to install a router at i
 * k = range (won't use it here*)
 */

import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

function minCostAtLast(costs: number[]): number {
  const yes: number[] = [0];
  const no: number[] = [0];
  const n = costs.length;

  for (let i = 1; i < n; i++) {
    yes[i] = costs[i] + Math.min(yes[i - 1], no[i - 1]);
    no[i] = yes[i - 1];
  }
  return Math.min(yes[n - 1], no[n - 1]);
}

Deno.test("router installation", () => {
  const f = minCostAtLast;
  assertEquals(f([0]), 0);
  assertEquals(f([0, 1]), 0);
  assertEquals(f([0, 1, 4]), 1);
  assertEquals(f([0, 1, 4, 12]), 4);
  assertEquals(f([0, 1, 4, 12, 8]), 12);
  assertEquals(f([0, 1, 4, 12, 8, 9]), 12);
  assertEquals(f([0, 1, 4, 12, 8, 9, 11]), 21);
});
