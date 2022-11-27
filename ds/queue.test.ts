import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { Queue as QueueLinkedList } from "./queueLinkedList.ts";
import { Queue as QueueArray } from "./queueArray.ts";

describe("queue as linked list", () => {
  it("should work with base cases", () => {
    const s = new QueueLinkedList<number>();
    assertEquals(s.size(), 0);
    s.enqueue(5);
    s.enqueue(10);
    s.enqueue(15);
    s.enqueue(20);
    assertEquals(s.size(), 4);
    assertEquals(s.dequeue(), 5);
    assertEquals(s.dequeue(), 10);
    assertEquals(s.dequeue(), 15);
    assertEquals(s.dequeue(), 20);
    assertEquals(s.size(), 0);
    s.enqueue(10);
    s.dequeue();
    s.enqueue(15);
    s.dequeue();
    assertEquals(s.size(), 0);
  });
});

describe("queue as array", () => {
  it("should work with base cases", () => {
    const s = new QueueArray<number>();
    assertEquals(s.size(), 0);
    s.enqueue(5);
    s.enqueue(10);
    s.enqueue(15);
    s.enqueue(20);
    assertEquals(s.size(), 4);
    assertEquals(s.dequeue(), 5);
    assertEquals(s.dequeue(), 10);
    assertEquals(s.dequeue(), 15);
    assertEquals(s.dequeue(), 20);
    assertEquals(s.size(), 0);
    s.enqueue(10);
    s.dequeue();
    s.enqueue(15);
    s.dequeue();
    assertEquals(s.size(), 0);
  });
});
