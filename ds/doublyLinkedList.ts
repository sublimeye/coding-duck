import { LinkedList } from "./linkedList.ts";
import { Node } from "./node.ts";

export class DoublyLinkedList<T> extends LinkedList<T> {
  public hd: void | Node<T>;
  public tl: void | Node<T>;

  constructor() {
    super();
    this.hd = undefined;
    this.tl = undefined;
  }

  // Adds new element to the tail of the linked-list
  add(value: T) {
    const node = new Node<T>(value);
    if (this.hd) {
      node.next = this.hd;
      this.hd.prev = node;
    }
    this.hd = node;
  }

  // Removes and returns the head of the linked list
  // (should it still be pointing to the rest of the list?)
  remove() {
    if (!this.hd) return;
    const node = this.hd;
    this.hd = this.hd.next;
    if (this.hd) this.hd.prev = undefined;
    return node;
  }
}
