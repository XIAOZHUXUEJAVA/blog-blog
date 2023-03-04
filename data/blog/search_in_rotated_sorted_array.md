---
title: 搜索旋转数组
date: '2023-03-4'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Search in Rotated Sorted Array
---

# 搜索旋转数组

## java

```java
class Solution {
    public int search(int[] nums, int target) {
        if (nums.length < 1) {
            return -1;
        }

        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] >= nums[0]) { // 说明在mid之前都是递增的
                // 这个地方为什么是target >= nums[0] 才行?
                // nums[mid] >= nums[0] mid左边是递增的， 如果 target < nums[0], 说明在mid右边
                // 4 5 6 7 1 2 3 // target = 2
                if (target >= nums[0] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else if (nums[mid] < nums[0]) { // mid 之后都是有序的
                // target > nums[nums.length - 1] 的话，说明在nums[mid] 左边
                if (target > nums[mid] && target <= nums[nums.length - 1]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

## go

```go
func search(nums []int, target int) int {
	if len(nums) == 0 {
		return -1
	}

	low := 0
	high := len(nums) - 1
	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] == target {
			return mid
		} else if nums[mid] >= nums[0] { // mid 左边递增
			// 确定边界
			if target >= nums[0] && target < nums[mid] {
				high = mid - 1
			} else {
				// target < nums[0]的话， 一定在 mid右边了
				low = mid + 1
			}

		} else if nums[mid] < nums[0] { // mid 右边递增
			// 不必>= nums[mid]
			if target > nums[mid] && target <= nums[len(nums)-1] {
				low = mid + 1
			} else {
				// target < mid 肯定在左边
				// target > num[len(nums) - 1] 也在mid左边，  因为mid右边都是递增的
				high = mid - 1
			}
		}

	}
	return -1
}
```

## rust

```rust
impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let n = nums.len();
        if n < 1 {
            return -1;
        }
        let mut low = 0;
        let mut high = n - 1;
        while low <= high {
            let mid = low + (high - low) / 2;
            if nums[mid] == target {
                return mid as i32;
            } else if nums[0] <= nums[mid] {
                // 左边递增
                if nums[0] <= target && target < nums[mid] {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else if nums[0] > nums[mid] {
                // 右边递增
                if target > nums[mid] && target <= nums[n - 1] {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
```
