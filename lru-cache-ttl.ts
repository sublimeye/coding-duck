import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
class DLinkNode {
  prev: null | DLinkNode = null;
  next: null | DLinkNode = null;
  key: null | string = null;
  val: null | number = null;
  timeout = 0;
  constructor(
    key: null | string = null,
    val: null | number = null,
    timeout = 0,
  ) {
    this.key = key;
    this.val = val;
    this.timeout = timeout;
  }
}

export class LRUCache {
  size = 0;
  capacity: number;
  cache: Map<any, any>;
  timeouts: Map<any, any>;
  head: DLinkNode;
  tail: DLinkNode;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.timeouts = new Map();
    this.head = new DLinkNode();
    this.tail = new DLinkNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  get(key: string) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.#bump(node);
    return node.val;
  }
  put(key: string, val: number, timeout: number) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.val = val;
      node.timeout = timeout;
      this.#bump(node);
      return;
    }

    const node = new DLinkNode(key, val, timeout);
    this.#addToHead(node);
    this.cache.set(key, node);
    if (this.size > this.capacity && this.tail.prev) {
      this.#remove(this.tail.prev);
    }
  }
  #bump(node: DLinkNode) {
    this.#unlink(node);
    clearTimeout(this.timeouts.get(node.key));
    this.#addToHead(node);
  }
  #remove(node: DLinkNode) {
    if (this.cache.has(node.key)) {
      this.cache.delete(node.key);
      this.#unlink(node);
    }
  }

  #unlink(node: DLinkNode) {
    this.size--;
    let prev = node.prev;
    let next = node.next;

    if (prev) prev.next = next;
    if (next) next.prev = prev;
  }

  #addToHead(node: DLinkNode) {
    this.timeouts.set(
      node.key,
      setTimeout(() => this.#remove(node), node.timeout),
    );
    this.size++;
    node.next = this.head.next;
    node.prev = this.head;
    if (this.head.next) this.head.next.prev = node;
    this.head.next = node;
  }
}

Deno.test("lru ttl", async () => {
  const lru = new LRUCache(2);
  lru.put("1", 1, 25);
  lru.put("2", 2, 200);
  assertEquals(lru.get("1"), 1);
  assertEquals(lru.size, 2);
  await (new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 100);
  }));
  assertEquals(lru.get("1"), -1);

  lru.put("1", 1, 25);
  lru.put("1", 1, 41);
  await (new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 40);
  }));
  assertEquals(lru.get("1"), 1);

  await (new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 150);
  }));
  assertEquals(lru.get("2"), -1);
  assertEquals(lru.size, 0);
});
