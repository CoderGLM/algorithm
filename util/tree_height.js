function treeHeight(node) {
    if (!node) return 0;
    return Math.max(treeHeight(node.left), treeHeight(right)) + 1;
}