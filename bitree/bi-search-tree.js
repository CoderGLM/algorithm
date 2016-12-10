var ROOT; // 根节点

function Node(l, r, v, p) {
    this.parent = p || null
    this.left = l || null
    this.right = r || null
    this.value = v || null
}

/*
 *
 *  插入节点
 * 
 *  @return 新插入的节点
 * 
 */
function TREE_INSERT(value, nodes) {
    nodes = nodes || [];
    if (!ROOT) {
        ROOT = new Node(null, null, value, null);
        nodes.push(ROOT);
        return ROOT
    }
    var x = ROOT,
        y = null;
    do {
        y = x;
        x = value < y.value ? y.left : y.right;
    } while (x);

    var node = new Node(null, null, value, y);
    nodes.push(node)

    if (value < y.value) y.left = node;
    else y.right = node;

    return node;
}

/*
 *  glm写，思路还算清晰，下面会将专业的代码加上
 */
function TREE_DELETE1(node) {
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
        // 修正根节点
        if (node === ROOT) {
            ROOT = node.left || node.right
        }
    } else {
        console.log('case3');
        var successor = TREE_SUCCESSOR(node);
        TREE_DELETE(successor);
        node.value = successor.value;
    }
}

/*
 *  专业删除函数
 * 
 *  @return 删除的节点
 */
function TREE_DELETE(node) {
    if (!node) return node;
    // 找到要删除的节点
    var y, x;
    if (!node.left || !node.right) {
        // NOTE: node可能是根节点哦
        y = node;
    } else {
        y = TREE_SUCCESSOR(node);
    }

    // 此时的y至多有一个子节点
    x = y.left || y.right;

    if (x) {
        x.parent = y.parent;
    }
    if (y.parent) {
        ROOT = x;
    } else {
        if (y.parent.left === y) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }
    }

    if (y !== node) {
        node.value = y.value;
    }
    return y;
}
/*
 *  获取以node为根节点的值最小的子节点
 */
function TREE_MINIMUM(node) {
    if (!node) return null;
    var x = node;
    while (x.left) {
        x = x.left;
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
function TREE_SUCCESSOR(node) {
    if (!node) return null;

    if (node.right) {
        return TREE_MINIMUM(node);
    }
    var x = node,
        y = node.parent;
    while (y && x === y.right) {
        x = y;
        y = x.parent;
    }
    return node;
}
/*
 *  中序遍历
 */
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
arr.forEach(function(item, index) {
    TREE_INSERT(item, nodes);
});
// 中序遍历
midTraverse(ROOT);
console.log('-------------------')
console.log(ROOT)

// console.log(TREE_SUCCESSOR(nodes[19]).value)

TREE_DELETE1(nodes[7]);

midTraverse(ROOT);