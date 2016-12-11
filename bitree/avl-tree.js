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
    rchild.height = Math.mas(rchild.left, rchild.right) + 1;

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