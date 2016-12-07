function parent (i) {
  return Math.floor(i/2)
}

function left (i) {
  return 2*i
}

function right (i) {
  return 2*i + 1
}

function exchange (arr, i, j) {
  var temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function maxHeap (arr, i, heapSize) {
  var l = left (i)
  var r = right (i)
  var larger = i
  if (l <= heapSize && arr[l] > arr[larger]) {
    larger = l
  }
  if (r <= heapSize && arr[r] > arr[larger]) {
    larger = r
  }
  if (larger !== i) {
    exchange(arr, larger, i)
    maxHeap(arr, larger, heapSize)
  }
}

function buildMaxHeap (arr, heapSize) {
  for (let i = Math.floor(heapSize/2); i >= 1; i--) {
    maxHeap(arr, i, heapSize)
  }
}

function maxHeapSort (arr) {
  var heapSize = arr.length
  arr.unshift(Infinity)
  buildMaxHeap(arr, heapSize)
  for (let i = heapSize; i >= 1; i--) {
    exchange (arr, 1, i)
    maxHeap(arr, 1, i-1)
  }
  return arr
}

function showBiTree (arr) {
  var queue = [],
      heapSize = arr.length - 1,
      result = []
  queue.push(1)
  while (queue.length) {
    var index = queue.shift()
    result.push(arr[index])
    left(index) <= heapSize && queue.push(left(index))
    right(index) <= heapSize && queue.push(right(index))
  }
  arr.shift()
  console.log(arr)
  return result
}

showBiTree(maxHeapSort([2, 3, 1, 4, 5, 19, 9, 10, 7]))

