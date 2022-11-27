import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { Stack as StackLinkedList } from "./stackLinkedList.ts";
import { EmptyStackArrayError, Stack as StackArray } from "./stackArray.ts";

describe("stack as linked list", () => {
  it("should work with base cases", () => {
    const s = new StackLinkedList<number>();
    assertEquals(s.size(), 0);
    assertEquals(s.pop(), undefined);
    s.push(5);
    s.push(10);
    assertEquals(s.size(), 2);
    assertEquals(s.pop(), 10);
    assertEquals(s.size(), 1);
  });
});

describe("stack as stack array", () => {
  it("should work with base cases", () => {
    const s = new StackArray<number>();
    assertEquals(s.size(), 0);
    try {
      s.pop();
    } catch (e) {
      assertEquals(e instanceof EmptyStackArrayError, true);
    }
    s.push(5);
    s.push(10);
    assertEquals(s.size(), 2);
    assertEquals(s.pop(), 10);
    assertEquals(s.size(), 1);
  });
});
