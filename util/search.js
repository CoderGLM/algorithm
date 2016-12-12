/*
 *
 * 
 *     查找
 * 
 * 
 * 
 */

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
 *  获取以node为根节点的值最大的子孙节点
 */
function TREE_MAXIMUM(node) {
    if (!node) return null;
    var x = node;
    while (x.right) {
        x = x.right;
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
    var cur = node,
        parent = node.parent;
    while (parent && cur === parent.right) {
        cur = parent;
        parent = cur.parent;
    }
    return parent;
}
/*
 *  获取node的前驱
 */
function TREE_PREDECESSOR(node) {
    if (!node) return null;
    if (node.left) {
        return TREE_MAXIMUM(node.left);
    } else {
        var parent = node.parent,
            cur = node;
        while (parent && cur === parent.left) {
            cur = parent;
            parent = cur.parent;
        }
    }
}

export {
    TREE_MINIMUM,
    TREE_MAXIMUM,
    TREE_SUCCESSOR,
    TREE_PREDECESSOR
}