---
title: Insertion Sort
date: '2023-08-13'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Insertion Sort
---

# Insertion Sort

Insertion sort is a classic sorting algorithm, the followings are my implementation in Java, Go, Rust.

## Implementation in Java

```java
/*
     * @Title: insertSort
     * @Description: Insertion sort is usually faster and efficient with smaller amounts of elements
     * @Author: zdp
     * @DateTime: 2023/8/12 8:35
     * @param array
     * @return void
     * @throws
     */
    public static void insertSort(int[] array) {
        if (array == null) {
            throw new IllegalArgumentException("the input array cannot be null");
        }

        if (array.length < 2) {
            return;
        }
        for (int i = 1; i < array.length; i++) {
            // insert `baseElement` into the part of our previously sorted array
            // for instance:
            // 1 3 4 2 5
            // baseElement: 2
            // the part of our previously sorted array: 1 3 4
            // insert `2` into `1 3 4` -> `1 2 3 4`
            int baseElement = array[i];
            int j = i - 1;
            while (j >= 0 && array[j] > baseElement) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = baseElement;
        }
    }
```

## Implementation in Go

```go
func insertSort(nums []int) {
	if len(nums) < 2 {
		return
	}
	for i := 1; i < len(nums); i++ {
		key := nums[i]
		j := i - 1
		for j >= 0 && nums[j] > key {
			nums[j+1] = nums[j]
			j--
		}
		nums[j+1] = key
	}
}
```

## Implementation in Rust

```rust
fn insert_sort(nums: &mut [i32]) {
    let len = nums.len();
    if len < 2 {
        return;
    }
    for i in 1..len {
        let base_key = nums[i];
        let mut j = i as i32 - 1;
        while j >= 0 && nums[j as usize] > base_key {
            nums[(j + 1) as usize] = nums[j as usize];
            j -= 1;
        }
        nums[(j + 1) as usize] = base_key;
    }

}
```
