import { Queue as TQueue } from "../types/stack.ts";

export class EmptyStackArrayError extends Error {}
// Playground: logic is following languages where array must be a fixed size
const INIT_CAPACITY = 8;
export class Queue<T> implements TQueue<T> {
  private array: (T | void)[];
  private head = 0;
  private tail = 0;

  constructor() {
    this.array = new Array<T>(INIT_CAPACITY);
  }

  // add to the tail
  enqueue(value: T): void {
    if (this.tail === this.array.length) this.resize(this.array.length * 2);
    this.array[this.tail] = value;
    this.tail++;
  }

  // remove and return from the head
  dequeue(): void | T {
    if (this.size() === 0) throw new EmptyStackArrayError();

    const item = this.array[this.head];
    this.array[this.head] = undefined; // emulating free-reference hack
    this.head++;

    if (
      this.array.length > INIT_CAPACITY && this.size() <= this.array.length / 4
    ) {
      this.resize(this.array.length / 2);
    }
    return item;
  }

  size(): number {
    return this.tail - this.head;
  }

  private resize(size: number): void {
    const resized = new Array(size);
    let j = 0;
    for (let i = this.head; i < this.tail; i++, j++) {
      resized[j] = this.array[i];
    }
    this.array = resized;
    this.head = 0;
    this.tail = j;
  }
}
