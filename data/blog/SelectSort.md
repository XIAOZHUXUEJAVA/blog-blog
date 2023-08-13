---
title: Selection Sort
date: '2023-08-13'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Selection Sort
---

# Selection Sort

Selection sort is a classic sorting algorithm, the followings are my implementation in `Java`, `Go` and `Rust`:

## Implementation in Java

```java
/*
     * @Title: selectSort
     * @Description: TODO
     * @Author: zdp
     * @DateTime: 2023/8/13 12:50
     * @param array
     * @return void
     * @throws
     */
    public static void selectSort(int[] array) {
        if (array == null) {
            throw new IllegalArgumentException("the input array cannot be null");
        }
        if (array.length < 2) {
            return;
        }
        for (int i = 0; i < array.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < array.length; j++) {
                if (array[j] < array[min]) {
                    // so what is the difference between `part` and `portion` ?
                    // find the smallest element in the unsorted portion/part/range of the array
                    min = j;
                }
            }
            // swap the smallest element with the first element of unsorted range in the array
            swapElementInArray(array, i, min);
        }
    }

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
        if (array == null) {
            throw new IllegalArgumentException("the input array can not ne null");
        }

        if (firstIndex < 0 || firstIndex >= array.length || secondIndex < 0 || secondIndex >= array.length) {
            throw new IllegalArgumentException("Invalid index values");
        }

        int tempElement = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = tempElement;
    }
```

## Implementation in Go

```go
func selectSort(nums []int) error {
	if nums == nil {
		return fmt.Errorf("the input nums cannot be null")
	}

	n := len(nums)
	if n < 2 {
		return nil
	}

	for i := 0; i < n-1; i++ {
		min := i
		for j := i + 1; j < n; j++ {
			if nums[j] < nums[min] {
				min = j
			}
		}
		nums[min], nums[i] = nums[i], nums[min]
	}
	return nil
}

```

## Implementation in Rust

```rust\
fn select_sort(nums: &mut [i32]) {
    if nums.len() < 2 {
        return;
    }
    let len = nums.len();
    for i in 0..len - 1 {
        let mut min = i;
        for j in i + 1..len {
            if nums[j] < nums[min] {
                min = j
            }
        }
        nums.swap(i, min);
    }
}
```
