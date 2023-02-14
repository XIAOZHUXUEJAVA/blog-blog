---
title: 最接近的三数之和
date: '2023-02-15'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Three Sum Closest
---

# 最接近的三数之和

## java

```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        if (nums.length < 3) {
            return 0;
        }
        Arrays.sort(nums);
        int diff = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length - 2; i++) {
            int sum = nums[i] + twoSumClosest(nums, i + 1, target - nums[i]);
            if (Math.abs(diff) > Math.abs(target - sum)) {
                diff = target - sum;
            }
        }
        return target - diff;
    }
    public int twoSumClosest(int[] nums, int start, int target) {
        int low = start;
        int high = nums.length - 1;
        int diff = Integer.MAX_VALUE;
        while (low < high) {
            int sum = nums[low] + nums[high];
            if (Math.abs(diff) > Math.abs(target - sum)) {
                diff = target - sum;
            }
            if (sum < target) {
                low++;
            } else {
                high--;
            }
        }
        return target - diff;
    }
}
```

## go

```go
import (
	"math"
	"sort"
)

func threeSumClosest(nums []int, target int) int {
	if len(nums) < 3 {
		return 0
	}
	// 需要排序
	sort.Ints(nums)
	diff := math.MaxInt32
	for i := 0; i < len(nums)-2; i++ {
		sum := nums[i] + twoSumClosest(nums, i+1, target-nums[i])
		if math.Abs(float64(diff)) > math.Abs(float64(target-sum)) {
			diff = target - sum
		}
	}
	return target - diff
}
func twoSumClosest(nums []int, start, target int) int {
	low := start
	high := len(nums) - 1

	diff := math.MaxInt32

	for low < high {
		sum := nums[low] + nums[high]
		if math.Abs(float64(diff)) > math.Abs(float64(target-sum)) {
			diff = target - sum
		}
		if sum < target {
			low++
		} else {
			high--
		}
	}
	return target - diff
}
```

## rust

```rust

impl Solution {
    pub fn three_sum_closest(nums: Vec<i32>, target: i32) -> i32 {
        if nums.len() < 3 {
            return 0 as i32;
        }
        let mut diff = i32::max_value();
        let mut nums = nums;
        nums.sort();

        for i in 0 ..= nums.len() - 2 {
            let sum = nums[i] + Self::two_sum_closest(&nums, i + 1, target - nums[i]);
            if diff.abs() > (target - sum).abs() {
                diff = target - sum;
            }
        }
        target - diff
    }
    pub fn two_sum_closest(nums: &[i32], start: usize, target: i32) -> i32 {
        // usize 因为下标是非负整数, 而不是i32, 所以使用usize
        let mut low = start;
        let mut high = nums.len() - 1;
        let mut diff = i32::max_value();

        while low < high {
            let sum = nums[low] + nums[high];
            if diff.abs() > (target - sum).abs() {
                diff = target - sum;
            }
            if sum < target {
                low += 1;
            } else {
                high -= 1;
            }
        }
        target - diff
    }
}
```

## c++

```c
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        if (nums.size() < 3) {
            return 0;
        }
        sort(nums.begin(), nums.end());
        int diff = INT32_MAX;
        for (int i = 0; i < nums.size() - 2; i++) {
            int sum = nums[i] + twoSumClosest(nums, i + 1, target - nums[i]);
            if (abs(diff) > abs(target - sum)) {
                diff = target - sum;
            }
        }
        return target - diff;
    }
    int twoSumClosest(vector<int>& nums, int start, int target) {
        int low = start;
        int high = nums.size() - 1;
        int diff = INT32_MAX;
        while (low < high) {
            int sum = nums[low] + nums[high];
            if (abs(diff) > abs(target - sum)) {
                diff = target - sum;
            }
            if (sum < target) {
                low++;
            } else {
                high--;
            }
        }
        return target - diff;
    }
};
```
