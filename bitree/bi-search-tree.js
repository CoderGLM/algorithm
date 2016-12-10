function Node(l, r, v, p) {
    this.parent = p || null
    this.left = l || null
    this.right = r || null
    this.value = v || null
}

function insert(root, value) {
    if (!root) {
        root = new Node(null, null, value, null)
        return root
    }
    var x = root,
        y = null
    do {
        y = x
        x = value < y.value ? y.left : y.right
    } while (x)

    var node = new Node(null, null, value, y)
    if (value < y.value) y.left = node
    else y.right = node
    return root;
}

function midTraverse(node) {
    if (node) {
        midTraverse(node.left)
        console.log(node.value)
        midTraverse(node.right)
    }
}

var arr = [2, 3, 8, 9, 10, 1, 11, 28, 19, 41, 32]
var root = null
arr.forEach(function(item, index) {
    root = insert(root, item)
})

midTraverse(root)