import { Node } from "./node.ts";

export class LinkedList<T> {
  public hd: void | Node<T>;
  public tl: void | Node<T>;
  private nodes: number = 0;

  constructor() {
    this.hd = undefined;
    this.tl = undefined;
  }

  // Adds new element to the head of the linked list
  add(value: T): void {
    this.nodes++;
    const oldhead = this.hd;
    this.hd = new Node<T>(value);
    this.hd.next = oldhead;
    if (!oldhead) this.tl = this.hd;
  }

  addLast(value: T): void {
    this.nodes++;
    const oldlast = this.tl;
    this.tl = new Node<T>(value);
    if (!oldlast) this.hd = this.tl;
    if (oldlast) oldlast.next = this.tl;
  }

  // Removes and returns the head of the linked list
  remove(): void | T {
    if (!this.hd) return;
    if (!this.hd.next) this.tl = undefined;
    this.nodes--;
    const node = this.hd;
    this.hd = this.hd.next;
    return node.data;
  }

  forEach(fn: (n: Node<T>) => void): void {
    let node = this.hd;
    while (node) {
      fn(node);
      node = node.next;
    }
  }

  find(value: T): void | Node<T> {
    let node = this.hd;
    while (node) {
      if (node.data === value) return node;
      node = node.next;
    }
  }

  size(): number {
    return this.nodes;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}
