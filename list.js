class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor(value) {
    this.head = null
    this.tail = null
  }

  append(value) {
    const node = new Node(value)

    if (this.tail) {
      this.tail.next = node
    }

    if (!this.head) {
      this.head = node
    }

    this.tail = node
  }

  prepend(value) {
    const node = new Node(value, this.head)

    this.head = node

    if (!this.tail) {
      this.tail = node
    }
  }

  #throwIf = (condition, message) => {
    if (condition) {
      throw new Error(message)
    }
  };

  find(fn) {
    this.#throwIf(!this.head, 'Head is empty')

    for (const node of this) {
      if (fn(node.value)) {
        return node
      }
    }

    return -1
  }

  filter(fn) {
    this.#throwIf(!this.head, 'Head is empty')

    const list = new LinkedList()

    for (const node of this) {
      if (fn(node.value)) {
        list.append(node.value)
      }
    }

    return list
  }

  map(fn) {
    this.#throwIf(!this.head, 'Head is empty')

    const list = new LinkedList()

    for (const node of this) {
      list.append(fn(node.value))
    }

    return list
  }

  toArray() {
    return [...this]
  }

  * iterator() {
    let current = this.head;

    while (current) {
      yield current
      current = current.next
    }
  }

  [Symbol.iterator]() {
    return this.iterator()
  }

  get length() {
    return this.toArray().length
  }
}


const list = new LinkedList()

