class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.len = 0
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
    this.len++
  }

  prepend(value) {
    const node = new Node(value, this.head)

    this.head = node

    if (!this.tail) {
      this.tail = node
    }

    this.len++
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

  insertAfter(prev, value) {
    const found = this.find(e => e === prev)
    this.#throwIf(found < 0, `No data found named ${prev}`)
    const node = new Node(value, found.next)

    if (!found) return
    let tmp = found

    if (!tmp.next) {
      this.tail = node
    } else {
      tmp.next = node
    }
    this.len++
  }

  forEach(fn) {
    for (const node of this) {
      fn(node)
    }
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
    return this.len
  }

  remove(value) {
    if (!this.head) {
      return
    }

    while (this.head && this.head.value === value) {
      this.head = this.head.next
    }

    let current = this.head

    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next
      } else {
        current = current.next
      }
    }

    if (this.tail.value === value) {
      this.tail = current
    }
  }
}