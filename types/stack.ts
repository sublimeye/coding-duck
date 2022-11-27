export interface TStack<T> {
  push(value: T): void;
  pop(): void | T;
  size(): number;
}

export interface Queue<T> {
  enqueue(value: T): void;
  dequeue(): void | T;
  size(): number;
}
