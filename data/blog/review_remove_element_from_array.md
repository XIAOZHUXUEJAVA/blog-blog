---
title: 删除数组中的指定元素-----复习
date: '2023-01-24'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Remove Element From Array
---

## java

```java
public int removeElement(int[] nums, int val) {
        int slow = 0;
        int fast = 0;
        while (fast < nums.length) {
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                slow++;
            }
            fast++;
        }
        return slow;
    }
```

## go

```go
func removeElement(nums []int, val int) int {
	slow := 0
	fast := 0
	for fast < len(nums) {
		if nums[fast] != val {
			nums[slow] = nums[fast]
			slow++
		}
		fast++
	}
	return slow
}

```

## c++

```c
int removeElement(vector<int>& nums, int val) {
        int slow = 0;
        int fast = 0;
        while (fast < nums.size()) {
            if (nums[fast] != val) {
                nums[slow] = nums[fast];
                slow++;
            }
            fast++;
        }
        return slow;
    }
```
