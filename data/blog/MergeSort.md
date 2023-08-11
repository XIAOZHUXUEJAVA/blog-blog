---
title: Merge Sort
date: '2023-08-11'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Merge Sort
---

# Merge Sort

Merge Sort is a classic sorting algorithm, the followings are my implementation in Java, Go and Rust.

## Implementation In Java

```java
	public static int[] mergeSort(int[] array) {

        if (array.length <= 1) {
            return array;
        }
        int midIndex = array.length >> 1;
        int[] leftArray = Arrays.copyOfRange(array, 0, midIndex);
        int[] rightArray = Arrays.copyOfRange(array, midIndex, array.length);
        return merge(mergeSort(leftArray), mergeSort(rightArray));
    }


    /*
     * @Title: merge
     * @Description: merge two sorted arrays into single sorted array
     * @Author: zdp
     * @DateTime: 2023/8/11 9:27
     * @param leftArray
     * @param rightArray
     * @return int[]
     * @throws
     */
    public static int[] merge(int[] leftArray, int[] rightArray) {
        // If one of the input arrays is null, return another one
        if (leftArray == null || leftArray.length == 0) {
            return rightArray;
        }
        if (rightArray == null || rightArray.length == 0) {
            return leftArray;
        }
        int leftIndex = 0;
        int rightIndex = 0;
        int mergedIndex = 0;
        int[] mergedArray = new int[leftArray.length + rightArray.length];

        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (leftArray[leftIndex] < rightArray[rightIndex]) {
                mergedArray[mergedIndex++] = leftArray[leftIndex++];
            } else {
                mergedArray[mergedIndex++] = rightArray[rightIndex++];
            }
        }

        // After the merging process described above, there might be remaining elements in one of the array.
        // So we need to append the elements from the array to `mergedArray`.
        // Just like this:
        //  1, 2, 3
        while (leftIndex < leftArray.length) {
            mergedArray[mergedIndex++] = leftArray[leftIndex++];
        }

        // 4, 5, 6
        while (rightIndex < rightArray.length) {
            mergedArray[mergedIndex++] = rightArray[rightIndex++];
        }
        return mergedArray;
    }


    public static void main(String[] args) {
        int[] unorderedArray = {3, 3, 2, 1, 2, 5, 5, 4, 2};
        System.out.println(Arrays.toString(unorderedArray));
        int[] sortedArray = mergeSort(unorderedArray);
        System.out.println(Arrays.toString(sortedArray));
    }
```

## Implementation In Go

```go
func merge(leftNumbers, rightNumbers []int) []int {
	if leftNumbers == nil || rightNumbers == nil {

	}
	leftIndex := 0
	rightIndex := 0
	mergedNumbers := make([]int, len(leftNumbers)+len(rightNumbers))
	for leftIndex < len(leftNumbers) && rightIndex < len(rightNumbers) {
		if leftNumbers[leftIndex] < rightNumbers[rightIndex] {
			mergedNumbers = append(mergedNumbers, leftNumbers[leftIndex])
			leftIndex++
		} else {
			mergedNumbers = append(mergedNumbers, rightNumbers[rightIndex])
			rightIndex++
		}
	}
	mergedNumbers = append(mergedNumbers, leftNumbers[leftIndex:]...)
	mergedNumbers = append(mergedNumbers, rightNumbers[rightIndex:]...)
	return mergedNumbers
}

func mergrSort(numbers []int) []int {
	if len(numbers) <= 1 {
		return numbers
	}
	middleIndex := len(numbers) >> 1
	leftNumbers := numbers[:middleIndex]
	rightNumbers := numbers[middleIndex:]
	return merge(mergrSort(leftNumbers), mergrSort(rightNumbers))
}

```

## Implementation In Rust

```rust
fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
    let mut merged_result = Vec::with_capacity(left.len() + right.len());
    let mut i: usize = 0;
    let mut j: usize = 0;

    while i < left.len() && j < right.len() {
        if left[i] < right[j] {
            merged_result.push(left[i]);
            i += 1;
        } else {
            merged_result.push(right[j]);
            j += 1;
        }
    }
    if i < left.len() {
        merged_result.extend_from_slice(&left[i..]);
    }
    if j < right.len() {
        merged_result.extend_from_slice(&right[j..]);
    }
    merged_result
}

fn merge_sort(nums: &mut [i32]) {
    if nums.len() <= 1{
        return;
    }
    let mid = nums.len() / 2;
    let (left, right) = nums.split_at_mut(mid);
    merge_sort(left);
    merge_sort(right);
    let merged = merge(left, right);
    nums.copy_from_slice(&merged[..])
}

```
