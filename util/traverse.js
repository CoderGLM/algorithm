/*
 *
 * 
 *     遍历
 * 
 * 
 * 
 */

/*
 *   中序递归遍历
 */
function TREE_INORDER(node) {
    if (!node) return;
    TREE_INORDER(node.left);
    console.log(node.value);
    TREE_INORDER(node.right);
}
/*
 *  广度优先遍历
 *
 *  Breadth First Search
 */
function TREE_BFS(node) {
    if (!node) return;
    let queue = [node],
        current;
    while (queue.length) {
        current = queue.shift();
        current.left && queue.push(current.left);
        current.right && queue.push(current.right);
        console.log(current.value);
    }
}

export {
    TREE_INORDER,
    TREE_BFS
}