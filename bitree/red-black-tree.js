/*
 *    红黑树
 * 
 *    性质：
 *        1.每个结点或是红色或是黑色；
 *        2.根结点是黑色的；
 *        3.每个叶结点(NIL)是黑色的；
 *        4.如果一个结点是红色的，那么它的两个儿子都是黑色的；
 *        5.对于每个节点，从该几点到其子孙节点的所有路径上包含相同数目的黑节点；
 * 
 *    此树的插入、删除与二叉查找树极相似，只不过多了一步修正
 * 
 */
import { TREE_SUCCESSOR } from "../util/search";
import { TREE_INORDER, TREE_BFS } from "../util/traverse";

const NIL = { color: BLACK };
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
    // TREE_BFS1(ROOT);
    // console.log('----------------');
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
            console.log("左树");
            let parent = node.parent,
                uncle = parent.parent.right;
            // uncle如果不存在则认为是黑色
            if (uncle && uncle.color === RED) {
                console.log("CASE 1");
                parent.color = BLACK;
                uncle.color = BLACK;
                parent.parent.color = RED;
                node = parent.parent;
            } else {
                if (parent.right === node) { // CASE 2
                    console.log("CASE2");
                    node = parent;
                    RB_LROTATE(node);
                }
                // CASE 3 (可以由CASE2转换)
                node.parent.color = BLACK;
                node.parent.parent.color = RED;
                RB_RROTATE(node.parent.parent);
                // 修正root指向
                if (!node.parent.parent) {
                    root = node.parent;
                }
            }
        } else { // 这是父节点是右子树的情况
            console.log("右树");
            let parent = node.parent,
                uncle = parent.parent.left;
            if (uncle && uncle.color === RED) {
                console.log("CASE1");
                parent.parent.color = RED;
                parent.color = uncle.color = BLACK;
                node = parent.parent;
            } else {
                if (parent.left === node) {
                    console.log("CASE2");
                    node = parent;
                    RB_RROTATE(node);
                }
                node.parent.color = BLACK;
                node.parent.parent.color = RED;
                console.log("CASE3");
                RB_LROTATE(node.parent.parent);
                // 修正root指向
                if (!node.parent.parent) {
                    root = node.parent;
                }
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
 *  因为只有在删掉黑节点的时候才需要此修复函数，所以该函数的目的就是通过调整将某个红色节点涂为黑色，然后结束
 * 
 *  分四种情况：
 *      1. x的兄弟w是红色的；
 *      2. x的兄弟w是黑色的，而且w的两个孩子都是黑色的；
 *      3. x的兄弟w是黑色的，而且w的左孩子是红色的，右孩子是黑色的；
 *      4. x的兄弟w是黑色的，而且w的右孩子是红色的；
 * 
 *  目前该函数运行良好，但是不要删除最底层节点，因为最底层节点删除后此处的x为它的子结点，但是最底层节点的子节点是null，
 *  所以不能正确fixup。出现这种问题的原因是我们假设最底层的节点指向了同一个NIL节点。
 */
function RB_DELETE_FIXUP(root, x) {
    while (x != ROOT && x.color === BLACK) {
        console.log(x);
        let parent = x.parent;
        if (x.parent.left === x) { // 如果x是左子树
            let sibling = parent.right;
            // sibling 如果为红色，必须存在，因为如果sibling不存在说明它是黑色的
            if (sibling && sibling.color === RED) { // CASE 1
                parent.color = RED;
                sibling.color = BLACK;
                RB_LROTATE(parent);
                sibling = parent.right;
            }
            // 因为子孙如果不存在，认为是黑色的
            if ((!sibling.left || sibling.left.color === BLACK) &&
                (!sibling.right || sibling.right.color === BLACK)) { // CASE 2
                sibling.color = RED;
                /*
                 *  如果此时parent是红色的，那就可以直接停止循环，并把x涂为黑色；
                 *  如果parent是黑色，那就继续循环；
                 */
                x = parent;
            } else if (sibling && sibling.left.color === RED) { // CASE 3
                sibling.left.color = BLACK;
                sibling.color = RED;
                RB_RROTATE(sibling);
            } else { // CASE 4
                sibling.color = parent.color;
                parent.color = sibling.right.color = BLACK;
                RB_LROTATE(parent);
                // 已经操作完成，将ROOT赋值给x是为了停止循环
                x = ROOT;
            }
        } else { // 如果x是右子树
            let sibling = parent.left;
            if (sibling && sibling.color === RED) {
                parent.color = RED;
                sibling.color = BLACK;
                RB_RROTATE(parent);
            } else {
                if ((!sibling.left || sibling.left.color === BLACK) &&
                    (!sibling.right || sibling.right.color === BLACK)) {
                    sibling.color = RED;
                    x = parent;
                } else if (sibling.right && sibling.right.color === RED) {
                    sibling.color = RED;
                    sibling.right.color = BLACK;
                    RB_LROTATE(sibling);
                } else {
                    sibling.color = parent.color;
                    sibling.left.color = parent.color = BLACK;
                    RB_RROTATE(parent);
                    x = ROOT;
                }
            }
        }
    }
    x.color = BLACK;
}

function TREE_BFS1(node) {
    if (!node) return;
    let queue = [node],
        current;
    while (queue.length) {
        current = queue.shift();
        current.left && queue.push(current.left);
        current.right && queue.push(current.right);
        console.log(current.value, current.color);
    }
}

// var arr = [27, 45, 78, 50, 35, 56, 90, 40, 48];
var arr = [11, 2, 14, 1, 7, 5, 8, 4, 15];
arr.forEach((value, index) => {
    RB_INSERT(ROOT, value);
});
// TREE_INORDER(ROOT);
TREE_BFS1(ROOT);
console.log('----');
RB_DELETE(ROOT, ROOT.left.right);
TREE_BFS1(ROOT);