/*
 *
 *   最长生序子序列
 * 
 */

//  问题描述：
//      有一个乱序数组，例如：[3,1,4,8,2,10,6]，您能不能删除最少的数字，让剩下的
//      数字升序，请输出最少的数字的数量。
//  
//  样例如下：
//     
//     输入：3 1 4 8 2 10 6
//     输出：3
//

//  参考：http://blog.csdn.net/chenwenshi/article/details/6027086
//
//  @return 最长子序列长度
//
function LAS(arr) {
    if (!arr || !arr.length) return 0;

    // 数组长度
    let len = arr.length;
    // 保存到目前为止的最大长度
    let maxLen = 0;
    // 初始子序列长度都是1
    let MAX = new Array(len).fill(1);
    for (let i = 0; i < len - 1; i++) {
        let sub = 0;
        // 遍历0...i-1的子序列
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && MAX[j] > sub) {
                sub++;
            }
        }
        MAX[i] = sub + 1;
        if (MAX[i] > maxLen) {
            maxLen = MAX[i];
            console.log(maxLen, i);
        }
    }
    return maxLen;
}

let arr = [3, 1, 4, 8, 2, 10, 6];
LAS(arr);