---
title: Quick Sort
date: '2023-08-11'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Quick Sort
---

# Quick Sort

Quick Sort is a classic sorting algorithm, and the followings are my implementation in Java, Go, and Rust:

## Implementation in Java

```java

public class QuickSort {


    /*
     * @Title: checkValidArguments
     * @Description: Check whether the input parameters are valid
     * @Author: zdp
     * @DateTime: 2023/8/10 9:11
     * @param array
     * @param firstIndex
     * @param secondIndex
     * @return void
     * @throws IllegalArgumentException
     */
    public static void checkValidArguments(int[] array, int firstIndex, int secondIndex) {
        if (array == null) {
            throw new IllegalArgumentException("The input array cannot be null");
        }

        if (firstIndex < 0 || firstIndex >= array.length || secondIndex < 0 || secondIndex >= array.length) {
            throw new IllegalArgumentException("Invalid index values");
        }
    }


    /*
     * @Title: swapElementInArray
     * @Description: Swap element in a specified array
     * @Author: zdp
     * @DateTime: 2023/8/9 0:19
     * @param array: Swap element in the array
     * @param firstIndex: The position of the first element to be swapped
     * @param secondIndex: The position of the second element to be swapped
     * @return void
     * @throws IllegalArgumentException
     */
    public static void swapElementInArray(int[] array, int firstIndex, int secondIndex) {
        // check whether the input parameters are valid
        checkValidArguments(array, firstIndex, secondIndex);
        int tempElement = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = tempElement;
    }


    /*
     * @Title: partition
     * @Description: Divide the input array into two parts with the specified pivot element
     * @Author: zdp
     * @DateTime: 2023/8/10 9:28
     * @param array
     * @param leftIndex
     * @param rightIndex
     * @return int
     * @throws
     */
    public static int partition(int[] array, int leftIndex, int rightIndex) {
        // check whether the input parameters are valid
        checkValidArguments(array, leftIndex, rightIndex);
        int i = leftIndex;
        int j = rightIndex;

        // specify array[leftIndex] as the pivot element
        while (i < j) {
            // search for the first element smaller than the pivot element from right to left
            while (i < j && array[j] >= array[leftIndex]) {
                j--;
            }
            // search for the first element larger than the pivot element from left to right
            while (i < j && array[i] <= array[leftIndex]) {
                i++;
            }

            // swap the two elements
            swapElementInArray(array, i, j);
        }
        // swap the pivot element to the dividing line of two subarrays
        swapElementInArray(array, i, leftIndex);
        // return i: the new index of pivot element
        return i;

        // the elements on the pivot element left are less than or equal to the pivot element
        // the elements on the pivot element right are greater than or equal to the pivot element
    }


    public static void quickSort(int[] array, int leftIndex, int rightIndex) {
        if (leftIndex >= rightIndex) {
            return;
        }
        // perform quicksort on the either side of the pivot element
        int pivotIndex = partition(array, leftIndex, rightIndex);
        quickSort(array, leftIndex, pivotIndex - 1);
        quickSort(array, pivotIndex + 1, rightIndex);
    }


    public static void main(String[] args) {
        int[] array = {2, 1, 1, 4, 3, 3, 9, 7, 5};
        System.out.println("未排序: " + Arrays.toString(array));
        quickSort(array, 0, array.length - 1);
        System.out.println("排序后: " + Arrays.toString(array));
    }
}

```

## Implementation In Go

```go
func partition(numbers []int, leftIndex, rightIndex int) int {
	i, j := leftIndex, rightIndex
	for i < j {
		for i < j && numbers[j] >= numbers[leftIndex] {
			j--
		}
		for i < j && numbers[i] <= numbers[leftIndex] {
			i++
		}
		numbers[i], numbers[j] = numbers[j], numbers[i]
	}
	numbers[i], numbers[leftIndex] = numbers[leftIndex], numbers[i]
	return i
}

func quickSort(numbers []int, leftIndex, rightIndex int) {
	if leftIndex >= rightIndex {
		return
	}
	pivotIndex := partition(numbers, leftIndex, rightIndex)
	quickSort(numbers, leftIndex, pivotIndex-1)
	quickSort(numbers, pivotIndex+1, rightIndex)
}
```

## Implementation In Rust

```rust
fn partition(numbers: &mut [i32], left_index: usize, right_index: usize) -> usize {
    let mut i: usize = left_index;
    let mut j: usize = right_index;

    while i < j {
        while i < j && numbers[j] >= numbers[left_index] {
            j -= 1;
        }
        while i < j && numbers[i] <= numbers[left_index] {
            i += 1;
        }
        numbers.swap(i, j);
    }

    numbers.swap(i, left_index);
    i
}

fn quick_sort(numbers: &mut [i32], left_index: usize, right_index: usize) {
    if left_index >= right_index {
        return;
    }
    let pivot_index: usize = partition(numbers, left_index, right_index);
    quick_sort(numbers, left_index, pivot_index - 1);
    quick_sort(numbers, pivot_index + 1, right_index);
}

```
