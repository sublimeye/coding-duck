import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";

/**
 * @param input  * Any live cell with fewer than two live neighbors dies, as if caused by
 * under-population.
 * Any live cell with two or three live neighbors lives on to the next
 * generation.
 * Any live cell with more than three live neighbors dies, as if by
 * over-population..
 * Any dead cell with exactly three live neighbors becomes a live cell, as if
 * by reproduction.
 *
 * Write a function to compute the next state (after one update) of the board
 * given its current state. The next state is created by applying the above
 * rules simultaneously to every cell in the current state, where births and
 * deaths occur simultaneously.
 *
 * Example:
 *
 * Input:
 * [
 * [0,1,0],
 * [0,0,1],
 * [1,1,1],
 * [0,0,0]
 * ]
 * Output:
 * [
 * [0,0,0],
 * [1,0,1],
 * [0,1,1],
 * [0,1,0]
 * ]
 *
 * Follow up:
 *
 * Could you solve it in-place? Remember that the board needs to be updated at
 * the same time: You cannot update some cells first and then use their updated
 * values to update other cells.
 * In this question, we represent the board using a 2D array. In principle, the
 * board is infinite, which would cause problems when the active area
 * encroaches the border of the array. How would you address these problems?
 */
function check(
  state: number,
): number {
  if (state === undefined) return 0;
  return state;
}

function next(m: number[][], rid: number, cid: number): number {
  const live = m[rid][cid] === 1;
  const alive = count(m, rid, cid);
  if (live) {
    if (alive < 2) return 0;
    else if (alive >= 4) return 0;
    else return 1;
  }
  if (alive === 3) return 1;
  return m[rid][cid];
}

function count(m: number[][], rid: number, cid: number): number {
  const rows = m.length - 1;
  const neighbors = [
    rid === 0 || cid === 0 ? 0 : check(m[rid - 1][cid - 1]),
    rid === 0 ? 0 : check(m[rid - 1][cid]),
    rid === 0 ? 0 : check(m[rid - 1][cid + 1]),
    check(m[rid][cid - 1]),
    check(m[rid][cid + 1]),
    rid === rows ? 0 : check(m[rid + 1][cid - 1]),
    rid === rows ? 0 : check(m[rid + 1][cid]),
    rid === rows ? 0 : check(m[rid + 1][cid + 1]),
  ];
  return neighbors.reduce((sum, n) => (sum + n), 0);
}

// simple/stupid NOT in place implementation
function gameOfLife(input: number[][]): number[][] {
  const output = [];
  for (let rowid = 0; rowid < input.length; rowid++) {
    const orow = [];
    for (let colid = 0; colid < input[rowid].length; colid++) {
      orow.push(next(input, rowid, colid));
    }
    output.push(orow);
  }
  return output;
}

Deno.test("game of life", () => {
  const blinkerin = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  const blinkerout = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
  assertEquals(
    gameOfLife(blinkerin),
    blinkerout,
  );
});
