function left (node) {
  return node.left
}

function right (node) {
  return node.right
}

function parent (node) {
  return node.parent
}

function key (node) {
  return node.value
}

function Node () {
  this.parent = null
  this.left = null
  this.right = null
  this.value = NaN
}

function insert (root, value) {
  if (!root) {
    root = new Node()
    root.value = value
    return root
  }
  var y = root,
      x = null
  do {
    x = y
    if (value < key(x)) {
      y = left(x)
    } else {
      y = right(x)
    }
  } while (y)

  if (value < key(x)) {
    x.left = new Node()
    x.left.value = value
  } else {
    x.right = new Node()
    x.right.value = value
  }
}
