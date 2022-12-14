import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

class Node<T> {
  next: Node<T>[] = [];
  value: T | void = undefined;
}
export class TrieST<T> {
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

  keys(): string[] {
    return this.#collect(this.root, "");
  }

  keysWithPrefix(prefix: string): string[] {
    const x = this.#get(this.root, prefix, 0);
    return this.#collect(x, prefix);
  }

  #collect(
    x: void | Node<T>,
    prefix: string,
    collection: string[] = [],
  ): string[] {
    if (!x) return collection;
    if (x.value !== undefined) collection.push(prefix);
    for (let c = 0; c < x.next.length; c++) {
      this.#collect(x.next[c], prefix + String.fromCharCode(c), collection);
    }
    return collection;
  }

  longestPrefix(prefix: string): string {
    const len = this.#search(this.root, prefix, 0, 0);
    return prefix.slice(0, len);
  }

  #search(x: void | Node<T>, prefix: string, d: number, len: number): number {
    if (!x) return len;
    if (x.value) len = d;
    if (len === prefix.length) return len;
    const c = prefix.charCodeAt(d);
    return this.#search(x.next[c], prefix, d + 1, len);
  }
}

describe("RWay Trie", () => {
  it("basic operations", () => {
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
  it("keys", () => {
    const t = new TrieST();
    t.put("one", 10);
    t.put("ono", 20);
    t.put("onceupon", 500);
    t.put("h", 50);
    t.put("jamaica", 5);
    assertEquals(t.keys(), ["h", "jamaica", "onceupon", "one", "ono"]);
  });

  it("keysWithPrefix", () => {
    const t = new TrieST();
    t.put("can", 1);
    t.put("cap", 2);
    t.put("cannon", 1);
    t.put("cam", 1);
    assertEquals(t.keysWithPrefix("ca"), ["cam", "can", "cannon", "cap"]);
    assertEquals(t.keysWithPrefix("cb"), []);

    t.put("one", 10);
    t.put("ono", 20);
    t.put("onceupon", 500);
    t.put("h", 50);
    t.put("jamaica", 5);
    assertEquals(t.keysWithPrefix("o"), ["onceupon", "one", "ono"]);
  });

  it("keysWithLongestPrefix", () => {
    const t = new TrieST();
    t.put("120.10", 1);
    t.put("120.10.14", 2);
    t.put("120.10.14.1", 2);
    t.put("120.10.14.2", 2);
    t.put("120.10.14.3", 2);
    t.put("120.10.14.4", 2);
    assertEquals(t.longestPrefix("120.10.20"), "120.10");
    assertEquals(t.longestPrefix("120.10.14"), "120.10.14");
    assertEquals(t.longestPrefix("120.10.14.3"), "120.10.14.3");
    assertEquals(t.longestPrefix("120.10.14.5"), "120.10.14");
  });
});
