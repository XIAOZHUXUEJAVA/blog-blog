---
title: Heap Sort
date: '2023-08-18'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Heap Sort
---

# Heap Sort

Heap sort is a classic sorting algorithm, the followings are my implementation in Java, Go and Rust:

## Implementation in Java

```java
public class HeapSort {


    public static void heapSort(int[] array) {
        int n = array.length;

        // leaf nodes don't need to be heapified as root, so we can start hepifying directly from n / 2 - 1
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(array, n, i); // after this operation, array[0] is the largest element in the tree
        }
        for (int i = n - 1; i > 0; i--) {
            // move current root to end
            swapElementInArray(array, i, 0);
            // heapify from index `i`
            heapify(array, i, 0);
        }
    }


    /*
     * @Title: heapify
     * @Description: Heapify down from the index `i`
     * @Author: zdp
     * @DateTime: 2023/8/18 9:53
     * @param array
     * @param n
     * @param i
     * @return void
     * @throws
     */
    public static void heapify(int[] array, int n, int i) {
        int max = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && array[left] > array[max]) {
            max = left;
        }
        if (right < n && array[right] > array[max]) {
            max = right;
        }
        if (max != i) {
            swapElementInArray(array, i, max);
            // heapify recursively
            heapify(array, n, max);
        }
    }

    public static void swapElementInArray(int[] array, int firstIndex, int secondIndex) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("Ihe input array cannot be null");
        }

        if (firstIndex < 0 || firstIndex > array.length || secondIndex < 0 || secondIndex > array.length) {
            throw new IllegalArgumentException("Invalid index values");
        }
        int tempElement = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = tempElement;
    }
}


    public static void main(String[] args) {
        int[] unorderedArray = {3, 2, 1, 1, 4, 1, 7, 2, 2, 6};
        System.out.println(Arrays.toString(unorderedArray));
        heapSort(unorderedArray);
        System.out.println(Arrays.toString(unorderedArray));
    }


```

## Implementation in Go

```go
func heapSort(nums []int) {
	n := len(nums)
	for i := 0; i < n/2-1; i++ {
		heapify(nums, n, i)
	}
	for i := n - 1; i > 0; i-- {
		nums[0], nums[i] = nums[i], nums[0]
		heapify(nums, i, 0)
	}
}

func heapify(nums []int, n, i int) {
	max := i
	left := 2*i + 1
	right := 2*i + 2
	if left < n && nums[left] > nums[max] {
		max = left
	}
	if right < n && nums[right] > nums[max] {
		max = right
	}

	if max != i {
		nums[i], nums[max] = nums[max], nums[i]
		heapify(nums, n, max)
	}
}

```

## Implementation in Rust

```rust
pub struct HeapSort {}

impl HeapSort {
    pub fn heap_sort(nums: &mut [i32]) {
        let n = nums.len();
        // rev(): inclusive on the left, exclusive on the right
        for i in (0..n / 2).rev() {
            Self::heapify(nums, n, i);
        }
        for i in (1..n).rev() {
            nums.swap(0, i);
            Self::heapify(nums, i, 0);
        }
    }

    pub fn heapify(nums: &mut [i32], n: usize, i: usize) {
        let mut max: usize = i;
        let left: usize = 2 * i + 1;
        let right: usize = 2 * i + 2;
        if left < n && nums[left] > nums[max] {
            max = left;
        }
        if right < n && nums[right] > nums[max] {
            max = right;
        }
        if max != i {
            nums.swap(i, max);
            Self::heapify(nums, n, max);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::HeapSort;

    #[test]
    pub fn test_heap_sort() {
        let mut nums = [3, 1, 7, 5, 6];
        HeapSort::heap_sort(&mut nums);
        assert_eq!(nums, [1, 3, 5, 6, 7]);
    }
    #[test]
    pub fn test_insert_sort_with_same() {
        let mut nums = [4, 1, 3, 3, 10, 9];
        HeapSort::heap_sort(&mut nums);
        assert_eq!(nums, [1, 3, 3, 4, 9, 10]);
    }
}

```

**Reference Link:** https://www.geeksforgeeks.org/heap-sort/
