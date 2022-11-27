interface TNode<T> {
  next: void | TNode<T>;
  prev: void | TNode<T>;
  data: void | T;
}

export class Node<T> implements TNode<T> {
  public data: void | T;
  public next: void | TNode<T>;
  public prev: void | TNode<T>;

  constructor(value: T) {
    this.data = value;
    this.next = undefined;
    this.prev = undefined;
  }
}
