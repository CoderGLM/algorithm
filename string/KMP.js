
/*
 *
 *   不多说了，很难理解
 * 
 */
function COMPUTE_PREFIX_FUNCTION(P) {
    let m = P.length;
    let k = -1;
    let prev = [-1];

    for (let q = 1; q < m; q++) {
        while (k > 0 && P[k + 1] !== P[q]) k = prev[k];
        if (P[k + 1] === P[q]) k = k + 1;
        prev[q] = k;
    }
    return prev;
}

function KMP_MATCHER(T, P) {
    let n = T.length;
    let m = P.length;
    let prev = COMPUTE_PREFIX_FUNCTION(P);
    let q = -1;

    for (let i = 0; i < n; i++) {
        while (q > 0 && P[q + 1] !== T[i]) q = prev[q];
        if (P[q + 1] === T[i]) {
            q = q + 1;
        }
        if (q === m - 1) {
            console.log('匹配完，', i - m);
            q = prev[q]; // 继续下次匹配
        }
    }
}

KMP_MATCHER('abcabcdd', 'abc');