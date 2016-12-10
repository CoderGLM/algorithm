function Node(l, r, v, p) {
    this.parent = p || null
    this.left = l || null
    this.right = r || null
    this.value = v || null
}

function insert(root, value, nodes) {
    nodes = nodes || [];
    if (!root) {
        root = new Node(null, null, value, null);
        nodes.push(root);
        return root
    }
    var x = root,
        y = null;
    do {
        y = x;
        x = value < y.value ? y.left : y.right;
    } while (x);

    var node = new Node(null, null, value, y);
    nodes.push(node)
    if (value < y.value) y.left = node;
    else y.right = node;
    return root;
}

function del(node) {
    if (!node) return;
    if (!node.left && !node.right) {
        console.log('case1');
        if (node.parent.left === node) {
            node.parent.left = null;
        } else {
            node.parent.right = null;
        }
    } else if (!node.left || !node.right) {
        console.log('case2');
        if (node.left) {
            console.log('case2.1');
            node.left.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = node.left;
            } else {
                node.parent.right = node.left;
            }
        } else {
            console.log('case2.2');
            node.right.parent = node.parent;
            if (node.parent.left === node) {
                node.parent.left = node.right;
            } else {
                node.parent.right = node.right;
            }
        }
    } else {
        console.log('case3');
        var successor = getSuccessor(node);
        del(successor);
        node.value = successor.value;
    }
}
/*
 *  获取以node为根节点的值最小的子节点
 */
function getMin(node) {
    if (!node) return null;
    var x = null,
        y = node;
    while (y) {
        x = y;
        y = y.left;
    }
    return x;
}
/*
 *  获取node的后继节点
 * 
 *  分两种情况：
 *    1.如果node有右子树，则返回右子树的最小节点；
 *    2.如果node没有右子树，则其后继节点为最低父节点，并且node所在子树为该父节点的左子树；
 */
function getSuccessor(node) {
    if (!node) return null;

    if (node.right) {
        return getMin(node);
    } else {
        var x = node,
            y = node.parent;
        while (y && x === y.right) {
            x = y;
            y = x.parent;
        }
        return node;
    }
}

function midTraverse(node) {
    if (node) {
        midTraverse(node.left)
        console.log(node.value)
        midTraverse(node.right)
    }
}

// 构建二叉查找树
var arr = [2, 3, 8, 9, 10, 1, 11, 28, 19, 41, 32];
var nodes = [];
var root = null;
arr.forEach(function(item, index) {
    root = insert(root, item, nodes);
});
// 中序遍历
midTraverse(root);
console.log('-------------------')

// console.log(getSuccessor(nodes[19]).value)

del(nodes[7]);
midTraverse(root);