import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

class Node<T> {
  next: Node<T>[] = [];
  value: T | void = undefined;
}
class TrieST<T> {
  R = 256; // in JS we don't care as arrays are dynamic
  root = new Node<T>();
  #get(root: Node<T>, key: string, d: number): void | Node<T> {
    if (!root) return;
    if (key.length === d) return root;
    const c = key.charCodeAt(d);
    return this.#get(root.next[c], key, d + 1);
  }
  get(key: string): void | T {
    const node = this.#get(this.root, key, 0);
    if (node) return node.value;
  }

  #put(x: Node<T>, key: string, value: T, d: number): Node<T> {
    if (!x) x = new Node<T>();
    if (d === key.length) {
      x.value = value;
      return x;
    }
    const c = key.charCodeAt(d);
    x.next[c] = this.#put(x.next[c], key, value, d + 1);
    return x;
  }
  put(key: string, value: T): void {
    this.#put(this.root, key, value, 0);
  }

  has(key: string): boolean {
    return !!this.get(key);
  }
}

describe("r way trie - ascii/unicode", () => {
  it("should sort", () => {
    const t = new TrieST();
    t.put("one", 10);
    t.put("ono", 20);
    t.put("onceupon", 500);
    t.put("h", 50);
    t.put("jamaica", 5);
    assertEquals(t.get("one"), 10);
    assertEquals(t.get("onceupon"), 500);
    assertEquals(t.get("onceupo"), undefined);
    assertEquals(t.has("h"), true);
  });
});
