---
title: Bubble Sort
date: '2023-08-08'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Bubble Sort
---

# Bubble Sort

Bubble sort is a classic sorting algorithm, and the followings are my implementation in Java, Go and Rust:

## Implementation in Java

```java
/*
     * @Title: swapElementInArray
     * @Description: Swap element in a specific array
     * @Author: zdp
     * @DateTime: 2023/8/9 0:19
     * @param array: Swap element in the array
     * @param firstIndex: The position of the first element to be swapped
     * @param secondIndex: The position of the second element to be swapped
     * @return void
     * @throws IllegalArgumentException
     */
    public static void swapElementInArray(int[] array, int firstIndex, int secondIndex) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("The input array cannot be null or empty");
        }
        if (firstIndex < 0 || firstIndex >= array.length || secondIndex < 0 || secondIndex >= array.length) {
            throw new ArrayIndexOutOfBoundsException("Invalid index values");
        }
        if (firstIndex != secondIndex) {
            int tempElement = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = tempElement;
        }
    }


    /*
     * @Title: bubbleSort
     * @Description: Bubble Sort
     * @Author: zdp
     * @DateTime: 2023/8/9 0:30
     * @param array: Sort the array
     * @return void: Sorting in-place, without requiring the creation of a new array
     * @throws IllegalArgumentException
     */
    public static void bubbleSort(int[] array) {
        if (array == null) {
            throw new IllegalArgumentException("the input array can not be null");
        }
        // the array contain only one element or empty, just return
        if (array.length < 2) {
            return;
        }
        for (int i = array.length - 1; i > 0; i--) {

            // A flag to detect whether any swaps were performed during an iteration of inner loop.
            // if swaps were performed, it indicates that the remaining part of the array are already sorted.
            boolean hasSwapped = false;
            for (int j = 0; j < i; j++) {
                if (array[j] > array[j + 1]) {
                    swapElementInArray(array, j, j + 1);
                    hasSwapped = true;
                }
            }
            if (!hasSwapped) {
                break;
            }
        }
    }
```

## Implementation in Go

```go
func bubbleSort(numbers []int) error {
	if numbers == nil {
		return fmt.Errorf("the input numbers can not be null")
	}
	if len(numbers) <= 1 {
		return nil
	}
	length := len(numbers)
	for i := length - 1; i > 0; i-- {
		hasSwapped := false
		for j := 0; j < i; j++ {
			if numbers[j] > numbers[j+1] {
				numbers[j], numbers[j+1] = numbers[j+1], numbers[j]
				hasSwapped = true
			}
		}
		if !hasSwapped {
			break
		}
	}
	return nil
}

```

## Implementation in Rust

```rust
fn bubble_sort(numbers: &mut [i32]) {
    let length = numbers.len();
    if length < 2 {
        return;
    }
    for i in (1..length).rev() {
        let mut has_swapped = false;
        for j in 0..i {
            if numbers[j] > numbers[j + 1] {
                numbers.swap(j, j + 1);
                has_swapped = true;
            }
        }
        if !has_swapped {
            break;
        }
    }
}

```
