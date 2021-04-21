var array_length;

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  animations.push(["done"]);
  return animations;
}

/* to create MAX  array */
function heap_root(input, i, animations) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
    max = left;
  }

  if (right < array_length && input[right] > input[max]) {
    max = right;
  }

  if (max !== i) {
    swap(input, i, max, animations);
    heap_root(input, max, animations);
  }
}

function swap(input, index_A, index_B, animations) {
  animations.push([index_A, input[index_A], index_B, input[index_B], 1]);
  animations.push([index_A, input[index_A], index_B, input[index_B], 2]);
  var temp = input[index_A];
  input[index_A] = input[index_B];
  input[index_B] = temp;
}

function heapSort(input, animations) {
  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heap_root(input, i, animations);
  }

  for (i = input.length - 1; i > 0; i--) {
    swap(input, 0, i, animations);
    array_length--;

    heap_root(input, 0, animations);
  }
}
