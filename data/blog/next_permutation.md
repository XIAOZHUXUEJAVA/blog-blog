---
title: 下一个排列
date: '2023-03-01'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Next Permutation
---

## Go

```go
func nextPermutation(nums []int) {
	if len(nums) < 2 {
		return
	}
	if isSorted(nums) {
		sort.Ints(nums)
        return
	}
	i := len(nums) - 2

	for i >= 0 && nums[i] >= nums[i + 1] {
		i--
	}
    if i >= 0 {
        j := len(nums) - 1

	    for j >= 0 && nums[i] >= nums[j] {
		    j--
	    }
	    nums[i], nums[j] = nums[j], nums[i]

    }
    reverse(nums, i + 1)

}

func reverse(nums []int, start int) {
	end := len(nums) - 1
	for start < end {
		nums[start], nums[end] = nums[end], nums[start]
		start++
		end--
	}
}
func isSorted(nums []int) bool {
	for i := 0; i < len(nums)-1; i++ {
		if nums[i] < nums[i+1] {
			return false
		}
	}
	return true
}
```

## Rust

```rust
use std::mem::swap;
impl Solution {
    pub fn next_permutation(nums: &mut Vec<i32>) {
        if nums.len() < 2 {
            return;
        }

        if Self::is_sorted(nums) {
            nums.sort();
            return;
        }
        let mut i = nums.len() - 2;
        while i >= 0 && nums[i] >= nums[i + 1] {
            i -= 1;
        }

        let mut j = nums.len() - 1;
        if i >= 0 {
            while j >= 0 && nums[i] >= nums[j] {
                j -= 1;
            }
            nums.swap(i, j);
        }
        nums[i+1..].sort_unstable();

    }

    pub fn is_sorted(nums: &Vec<i32>) -> bool {
        for i in 0..nums.len() - 1 {
            if nums[i] < nums[i + 1] {
                return false;
            }
        }
        return true;
    }
}
```

## c++

```c
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        if (nums.size() < 2) {
            return;
        }
        if (isSorted(nums)) {
            sort(nums.begin(), nums.end());
            return;
        }
        int i = nums.size() - 2;
        while ( i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = nums.size() - 1;
            while (j >= 0 && nums[i] >= nums[j]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
    bool isSorted(vector<int>& nums) {
        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] < nums[i + 1]) {
                return false;
            }
        }
        return true;
    }
};
```

## java

```java
class Solution {
    public void nextPermutation(int[] nums) {
        if (nums.length < 2) {
            return;
        }
        if (isSort(nums)) {
            Arrays.sort(nums);
        }
        int i = nums.length - 2;

        // 降序, 已经决定了如何找那个需要交换的数了
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = nums.length - 1;
            // 找到第一个比nums[i]大的数
            while (j >= 0 && nums[i] >= nums[j]) {
                j--;
            }
            swap(nums, i, j);
        }
        reverse(nums, i + 1);
    }
    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public void reverse(int[] nums, int start) {
        int end = nums.length - 1;

        while (start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }

    }

    // 判断是否为倒序
    public boolean isSort(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i] + 1) {
                if (i == nums.length - 2) {
                    return true;
                }
                continue;
            }
        }
        return false;
    }

}
```
