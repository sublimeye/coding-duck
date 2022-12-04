import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

class Node<T> {
  left: void | Node<T> = undefined;
  middle: void | Node<T> = undefined;
  right: void | Node<T> = undefined;
  key: void | string = undefined;
  value: T | void = undefined;
  constructor(key: string) {
    this.key = key;
  }
}
class TSTrie<T> {
  root: void | Node<T> = undefined;

  #get(x: void | Node<T>, key: string, d: number): void | Node<T> {
    if (!x) return;
    const c = key[d];
    if (c < x.key) return this.#get(x.left, key, d);
    else if (c > x.key) return this.#get(x.right, key, d);
    else if (d < key.length - 1) return this.#get(x.middle, key, d + 1);
    else return x;
  }

  get(key: string): void | T {
    return this.#get(this.root, key, 0)?.value;
  }
  #put(x: void | Node<T>, key: string, value: T, d: number): Node<T> {
    const c = key[d];
    if (!x) x = new Node(c);
    if (c < x.key) x.left = this.#put(x.left, key, value, d);
    else if (c > x.key) x.right = this.#put(x.right, key, value, d);
    else if (d < key.length - 1) {
      x.middle = this.#put(x.middle, key, value, d + 1);
    } else x.value = value;
    return x;
  }

  put(key: string, value: T): void {
    this.root = this.#put(this.root, key, value, 0);
  }

  has(key: string): boolean {
    return !!this.get(key);
  }
}

describe("r way trie - ascii/unicode", () => {
  it("base put / get", () => {
    const t = new TSTrie<number>();
    t.put("spy", 10);
    assertEquals(t.get("spy"), 10);
  });
  it("should sort", () => {
    const t = new TSTrie<number>();
    t.put("one", 50);
    t.put("ona", 51);
    t.put("onb", 52);
    t.put("hh", 53);
    t.put("h", 20);
    t.put("a", 10);
    t.put("b", 30);
    // t.put("one", 10);
    // assertEquals(t.get("one"), 10);
    // t.put("ono", 20);
    // t.put("onceupon", 500);
    // t.put("h", 50);
    // t.put("jamaica", 5);
    // assertEquals(t.get("one"), 10);
    // assertEquals(t.get("onceupon"), 500);
    // assertEquals(t.get("onceupo"), undefined);
    assertEquals(t.get("h"), 20);
    assertEquals(t.get("hh"), 53);
  });
});
