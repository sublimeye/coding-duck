import { TStack } from "../types/stack.ts";

export class EmptyStackArrayError extends Error {}
// Playground: logic is following languages where array must be a fixed size
export class Stack<T> implements TStack<T> {
  private array: (T | void)[];
  private N = 0;

  constructor() {
    this.array = new Array<T>(this.N);
  }

  push(value: T): void {
    if (this.N === this.array.length) this.resize(this.array.length * 2);
    this.array[this.N++] = value;
  }

  pop(): void | T {
    if (this.size() === 0) throw new EmptyStackArrayError();

    const item = this.array[--this.N];
    this.array[this.N] = undefined; // pseudo hack for java where we must free up the space

    if (this.N > 0 && this.N === this.array.length / 4) {
      this.resize(this.array.length / 2);
    }
    return item;
  }

  size(): number {
    return this.N;
  }

  private resize(size: number): void {
    const resized = new Array(size);
    for (let i = 0; i < this.N; ++i) {
      resized[i] = this.array[i];
    }
    this.array = resized;
  }
}
