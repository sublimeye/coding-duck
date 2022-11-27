import { Queue as TQueue } from "./../types/stack.ts";
import { LinkedList } from "./linkedList.ts";

export class Queue<T> implements TQueue<T> {
  private queue: LinkedList<T>;
  constructor() {
    this.queue = new LinkedList<T>();
  }
  enqueue(value: T): void {
    this.queue.addLast(value);
  }
  dequeue(): void | T {
    return this.queue.remove();
  }
  size() {
    return this.queue.size();
  }
}
