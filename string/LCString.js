/*
 *  最长公共子串
 *  @return 长度
 *  @reference https://my.oschina.net/leejun2005/blog/117167
 */
function LCSubstring (str1, str2) {
  var i = 0, j = 0,
      len1 = str1.length,
      len2 = str2.length,
      map = [],
      max = 0;
  
  for (var m = -1; m < len1; m++) {
    map[m] = Array(len2);
    for (var n = -1; n < len2; n++) {
      map[m][n] = 0;
    }
  }

  for (i = 0; i < len1; i++) {
    for (j = 0; j < len2; j++) {
      if (str1[i] === str2[j]) {
        map[i][j] = map[i-1][j-1] + 1;
        if (map[i][j] > max) {
          max = map[i][j];
        }
      }
    }
  }

  return max;
}

LCSubstring('abcdeaaaaa', 'esabcdeeabcdeaaa'); // 8