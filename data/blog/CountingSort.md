---
title: Counting Sort
date: '2023-08-26'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Counting Sort
---

# Counting Sort

Counting sort is a classic soring algorithm. The followings are my implementation in Java, Go and Rust.

## Java

```java
/*
     * @Title: countingSort
     * @Description: Counting Sort for Non-Negative Integers
     * @Author: zdp
     * @DateTime: 2023/8/26 10:46
     * @param nums
     * @return void
     * @throws
     */
    public static void countingSort(int[] nums) {
        if (nums == null) {
            throw new IllegalArgumentException("The input array cannot be null");
        }

        if (nums.length < 2) {
            return;
        }

        int maxValue = 0;
        // search for the max number in the `nums`
        for (int num : nums) {
            maxValue = Math.max(maxValue, num);
        }
        // create an array with size of `maxValue + 1`
        // count the occurrences of each number
        int[] counts = new int[maxValue + 1];
        for (int num : nums) {
            counts[num]++;
        }

        // add element to the original array
        int sortIndex = 0;
        for (int value = 0; value < counts.length; value++) {
            for (int i = 0; i < counts[value]; i++) {
                nums[sortIndex] = value;
                sortIndex++;
            }
        }
    }



    public static void main(String[] args) {
        int[] unorderedArray = {2, 2, 1, 0, 0, 1, 5, 5, 4, 3, 3};
        System.out.println(Arrays.toString(unorderedArray));
        countingSort(unorderedArray);
        System.out.println(Arrays.toString(unorderedArray));
    }
```

## Go

```go
import "math"

func countingSort(nums []int) {
	maxValue := float64(0)
	for _, num := range nums {
		maxValue = math.Max(float64(maxValue), float64(num))
	}
	counts := make([]int, int(maxValue)+1)

	for _, num := range nums {
		counts[num]++
	}

	sortedIndex := 0
	for num := 0; num < len(counts); num++ {
		for i := 0; i < counts[num]; i++ {
			nums[sortedIndex] = num
			sortedIndex++
		}
	}
}

```

## Rust

```rust
pub struct CountingSort {}

impl CountingSort {
    pub fn counting_sort(nums: &mut [i32]) {
        let mut max_value = 0;
        for num in nums.iter() {
            max_value = max_value.max(*num);
        }
        let mut counts = vec![0; max_value as usize + 1];
        for num in nums.iter() {
            counts[*num as usize] += 1;
        }
        let mut sorted_index  = 0;
        for (num, count) in counts.iter().enumerate() {
            for _ in 0..*count {
                nums[sorted_index] = num as i32;
                sorted_index += 1;
            }
        }
    }
}
#[cfg(test)]
mod tests {
    use super::CountingSort;

    #[test]
    pub fn test_bubble_sort() {
        let mut nums = [4, 2, 1, 3, 19, 7, 10];
        CountingSort::counting_sort(&mut nums);
        assert_eq!(nums, [1, 2, 3, 4, 7, 10, 19]);
    }
}

```
