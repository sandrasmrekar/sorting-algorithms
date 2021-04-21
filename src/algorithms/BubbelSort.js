export function getBubbelSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  animations.push(["done"]);

  return animations;
}

const bubbleSort = (inputArr, animations) => {
  var len = inputArr.length;
  var swapped;
  do {
    swapped = false;
    for (var i = 0; i < len; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        var tmp = inputArr[i];
        animations.push([i, inputArr[i], i + 1, inputArr[i + 1], 1]);
        animations.push([i, inputArr[i], i + 1, inputArr[i + 1], 2]);
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
  return inputArr;
};
