import { TREE_INORDER, TREE_BFS } from '../util/traverse';
import { TREE_MAXIMUM, TREE_MINIMUM } from '../util/search';

var ROOT;

function LChildHeight(node) {
    return node.left && node.left.height || 0;
}

function RChildHeight(node) {
    return node.right && node.right.height || 0;
}

function Node(left, right, height, value) {
    if (!this instanceof Node) {
        return new Node(left, right, height, value);
    }
    this.left = left;
    this.right = right;
    this.height = height;
    this.value = value;
}
/*
 *
 *  各种旋转
 *
 *  参考：http://www.cnblogs.com/skywang12345/p/3576969.html
 * 
 */

function LL(node) {
    if (!node) return;

    let lchild = node.left;
    node.left = lchild.right;
    lchild.right = node;

    node.height = Math.max(node.left, node.right) + 1;
    lchild.height = Math.max(lchild.left, lchild.right) + 1;

    return lchild;
}

function RR(node) {
    if (!node) return;

    let rchild = node.right;
    node.right = rchild.left;
    rchild.left = node;

    node.height = Math.max(node.left, node.right) + 1;
    rchild.height = Math.max(rchild.left, rchild.right) + 1;

    return rchild;
}

function LR(node) {
    node.left = RR(node.left)
    return LL(node);
}

function RL(node) {
    node.right = LL(node.right);
    return RR(node);
}

/*
 *  插入
 * 
 *  @params
 *      root: 根节点
 *      value: 待插入的数值
 * 
 *  @return 根节点
 */
function TREE_INSERT(root, value) {
    if (!root) {
        root = new Node(null, null, 0, value);
    } else if (value < root.value) {
        root.left = TREE_INSERT(root.left, value);
        if (root.left.height - (root.right && root.right.height || 0) === 2) {
            if (value < root.left.value) {
                root = LL(root);
            } else {
                root = LR(root);
            }
        }
    } else if (value > root.value) {
        root.right = TREE_INSERT(root.right, value);
        if ((root.left && root.left.height || 0) - root.right.height === 2) {
            if (value > root.right.value) {
                root = RR(root);
            } else {
                root = RL(root);
            }
        }
    } else {
        throw new Error("You have alreay inserted the same `value`");
    }
    root.height = Math.max(root.left && root.left.height || 0,
        root.right && root.right.height || 0) + 1;
    return root;
}
/*
 *  删除节点
 * 
 *  @return 被删除节点
 */
function TREE_DELETE(root, node) {
    if (!root || !node) return;

    if (node.value < root.value) {
        root.left = TREE_DELETE(root.left, node);
        if (RChildHeight(root) - LChildHeight(root) === 2) {
            const rchild = root.right;
            if (RChildHeight(rchild) > LChildHeight(rchild)) {
                root = RR(root);
            } else {
                root = RL(root);
            }
        }
    } else if (node.value > root.value) {
        root.right = TREE_DELETE(root.right, node);
        if (LChildHeight(root) - RChildHeight(root) === 2) {
            const lchild = node.left;
            if (LChildHeight(lchild) > RChildHeight(rchild)) {
                root = LL(root);
            } else {
                root = LR(root);
            }
        }
    } else {
        if (root.left && root.right) {
            if (LChildHeight(root) > RChildHeight(root)) {
                const lmax = TREE_MAXIMUM(root.left);
                root.value = lmax.value;
                root.left = TREE_DELETE(root.left, lmax);
            } else {
                const rmin = TREE_MINIMUM(root.right);
                root.value = rmin.value;
                root.right = TREE_DELETE(root.right, rmin);
            }
        } else {
            root = root.left || root.right;
        }
    }
    return root;
}

let arr = [2, 33, 1, 4, 9, 7, 5, 8, 20, 0, 18, 27];
arr.forEach((value, index) => {
    var node = TREE_INSERT(ROOT, value);
    if (index === 0) {
        ROOT = node;
    }
})
TREE_BFS(ROOT);
console.log('--------------');
TREE_DELETE(ROOT, ROOT.left.left)
TREE_BFS(ROOT);