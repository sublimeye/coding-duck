import { TStack } from "./../types/stack.ts";

import { LinkedList } from "./linkedList.ts";

export class Stack<T> implements TStack<T> {
  private stack: LinkedList<T>;

  constructor() {
    this.stack = new LinkedList<T>();
  }
  push(value: T): void {
    this.stack.add(value);
  }
  pop(): void | T {
    return this.stack.remove();
  }
  size() {
    return this.stack.size();
  }
}
