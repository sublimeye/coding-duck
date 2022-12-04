class DLinkedNode {
  prev = null;
  next = null;
}

class LRUCache {
  cache = new Map();
  size = 0;
  head = new DLinkedNode();
  tail = new DLinkedNode();

  constructor(capacity) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addToHead(node) {
    node.next = this.head.next;

    if (this.head.next) {
      this.head.next.prev = node;
    }

    this.head.next = node;
    node.prev = this.head;
  }
  /**
   * Some of this checks can be removed (if (beforeNode), etc) -
   * used to provide consistency with TypeScript (might be a better of having)
   * optional prev/next etc properties
   */

  deleteNode(node) {
    if (!node) return null;
    const beforeNode = node.prev;
    const afterNode = node.next;

    if (beforeNode) {
      beforeNode.next = afterNode;
    }

    if (afterNode) {
      afterNode.prev = beforeNode;
    }

    node.prev = null;
    node.next = null;
    return node;
  }

  popTail() {
    let node = this.tail.prev;
    return this.deleteNode(node);
  }

  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1; // move to head = update priority

    this.deleteNode(node);
    this.addToHead(node);
    return node.value;
  }

  put(key, value) {
    const node = this.cache.get(key);

    if (node) {
      // overwrite value
      node.value = value;
      this.deleteNode(node);
      this.addToHead(node);
    } else {
      const node = new DLinkedNode();
      node.key = key;
      node.value = value;
      this.cache.set(key, node);
      this.addToHead(node);
      this.size++;

      if (this.size > this.capacity) {
        const preTail = this.popTail();

        if (preTail && preTail.key !== undefined) {
          this.cache.delete(preTail.key);
        }

        this.size--;
      }
    }
  }
}
