/*
 *  红黑树
 * 
 *  此树的插入、删除与二叉查找树极相似，只不过多了一步修正
 * 
 * 
 */
import { TREE_SUCCESSOR } from "../util/search";
import { TREE_INORDER } from "../util/traverse";

const BLACK = "black";
const RED = "red";

let ROOT = null;

function Node({ color, left, right, value, parent }) {
    this.color = color;
    this.left = left || null;
    this.right = right || null;
    this.value = value;
    this.parent = parent || null;
}
/*
 *  左旋
 */
function RB_LROTATE(node) {
    if (!node) return null;

    let rchild = node.right;
    node.right = rchild.left;
    if (rchild.left) {
        rchild.left.parent = node;
    }
    rchild.parent = node.parent;
    rchild.left = node;
    if (!node.parent) {
        ROOT = rchild;
    } else if (node === node.parent.left) {
        node.parent.left = rchild;
    } else {
        node.parent.right = rchild;
    }
    node.parent = rchild;
    return rchild;
}
/*
 *  右旋转
 */
function RB_RROTATE(node) {
    if (!node) return;

    let lchild = node.left;
    node.left = lchild.right;
    if (lchild.right) {
        lchild.right.parent = node;
    }
    lchild.parent = node.parent;
    lchild.right = node;
    if (!node.parent) {
        ROOT = lchild;
    } else if (node.parent.left === node) {
        node.parent.left = lchild;
    } else {
        node.parent.right = lchild;
    }
    node.parent = lchild;
    return lchild;
}
/*
 *  插入
 */
function RB_INSERT(root, value) {
    if (!root) {
        ROOT = new Node({ value, color: BLACK });;
        return;
    }
    let node = new Node({ value }),
        parent = null,
        current = root;
    while (current) {
        parent = current;
        current = current.value > value ? current.left : current.right;
    }
    node.parent = parent;
    if (!parent) {
        ROOT = node;
    } else {
        parent[node.value < parent.value ? "left" : "right"] = node;
    }
    node.color = RED;
    RB_INSERT_FIXUP(root, node);
}
/*
 *  插入修正
 * 
 *  分三种情况：
 *      1. node的叔叔是红色； 
 *      2. node的叔叔是黑色，并且node是右孩子；
 *      3. node的叔叔是黑色，并且node是左孩子；
 */
function RB_INSERT_FIXUP(root, node) {
    if (!root || !node) return;
    // 如果node.parent不存在，则认为node.parent是黑色
    while (node.parent && node.parent.color === RED) {
        if (node.parent.parent.left === node.parent) { // 这是父节点是左子树的情况
            let parent = node.parent,
                uncle = parent.parent.right;
            // uncle如果不存在则认为是黑色
            if (uncle && uncle.color === RED) {
                parent.color = BLACK;
                uncle.color = BLACK;
                parent.parent.color = RED;
                node = parent.parent;
            } else {
                if (parent.right === node) { // CASE 2
                    node = parent;
                    console.log("CASE2");
                    RB_LROTATE(node);
                    parent = node.parent;
                }
                // CASE 3 (可以由CASE2转换)
                parent.color = BLACK;
                parent.parent.color = RED;
                RB_RROTATE(parent.parent);
            }
        } else { // 这是父节点是右子树的情况
            let parent = node.parent,
                uncle = parent.parent.left;
            if (uncle && uncle.color === RED) {
                parent.parent.color = RED;
                parent.color = uncle.color = BLACK;
                node = parent.parent;
            } else {
                if (parent.left === node) {
                    node = parent;
                    RB_RROTATE(node);
                    parent = node.parent;
                }
                parent.color = BLACK;
                parent.parent.color = RED;
                console.log("CASE3");
                RB_LROTATE(parent.parent);
            }
        }
    }
    root.color = BLACK;
}
/*
 *  删除节点
 * 
 *  @return 返回删除的节点
 */
function RB_DELETE(root, node) {
    if (!root || !node) return;
    let y, x;
    if (!node.left || !node.right) {
        y = node;
    } else {
        y = TREE_SUCCESSOR(node);
    }

    x = y.left || y.right;
    if (x) {
        x.parent = y.parent;
    }

    if (!y.parent) {
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
    if (y.color === BLACK) {
        RB_DELETE_FIXUP(root, x);
    }
    return y;
}
/*
 *
 *  删除函数修正
 * 
 *  分四种情况：
 *      1. x的兄弟w是红色的；
 *      2. x的兄弟w是黑色的，而且w的两个孩子都是黑色的；
 *      3. x的兄弟w是黑色的，而且w的左孩子是红色的，右孩子是黑色的；
 *      4. x的兄弟w是黑色的，而且w的右孩子是红色的；
 */
function RB_DELETE_FIXUP(root, x) {

}

var arr = [10, 3, 9, 28, 14, 11, 100, 1, 15, 30, 2, 47, 0];
arr.forEach((value, index) => {
    RB_INSERT(ROOT, value);
})
TREE_INORDER(ROOT);