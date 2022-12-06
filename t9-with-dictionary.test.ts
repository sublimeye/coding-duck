import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { TrieST } from "./ds/rwayTrie.test.ts";

class Node<T> {
  next: Node<T>[] = [];
  value: T | void = undefined;
}
export class Trie8Way<T> {
  R = 8;
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

function main() {
  // deno-fmt-ignore
  const words = [ "a", "about", "all", "also", "and", "as", "at", "be", "because", "but", "by", "can", "come", "could", "day", "do", "even", "find", "first", "for", "from", "get", "give", "go", "have", "he", "her", "here", "him", "his", "how", "I", "if", "in", "into", "it", "its", "just", "know", "like", "look", "make", "man", "many", "me", "more", "my", "new", "no", "not", "now", "of", "on", "one", "only", "or", "other", "our", "out", "people", "say", "see", "she", "so", "some", "take", "tell", "than", "that", "the", "their", "them", "then", "there", "these", "they", "thing", "think", "this", "those", "time", "to", "two", "up", "use", "very", "want", "way", "we", "well", "what", "when", "which", "who", "will", "with", "would", "year", "you", "your", ];
  const dict = new TrieST<number>();
  for (const w of words) dict.put(w, 0);
  const digits = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };
  const t9trie = new Trie8Way<Set<string>>();
  // prefix
  // '2'
  // '23'
  // '24'
  // '25'

  // incomplete
  function generate(tree: void | Trie8Way<Set<string>>, prefix: string) {
    if (!tree) return;
    if (!prefix) return;
  }
  // for (let d = 1; d < 2; d++) {
  // }

  // create 8 way trie
  // start building the trie
  // for (digit-char-combinations: ['th', 'tg', ...]) => get values
  // if digit-character has keys -> go one level deep // recursion
}

main();
