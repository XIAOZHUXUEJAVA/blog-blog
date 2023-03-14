---
title: 剑指Offer-算法篇-Day04
date: '2023-03-14'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 剑指 offer-算法-Day04

## 数组中重复的数字

非常脑残的写法

```java
class Solution {
    public int findRepeatNumber(int[] nums) {
        HashMap<Integer, Integer> map = new HashMap<>();

        int[] count = new int[nums.length];
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                res = nums[i];
                break;
            }
            map.put(nums[i], count[i] + 1);

        }
        return res;
    }
}
```

直接用 Set 就好了啊

```java
class Solution {
    public int findRepeatNumber(int[] nums) {
        Set<Integer> dic = new HashSet<>();
        for (int num : nums) {
            if (dic.contains(num)) {
                return num;
            }
            dic.add(num);
        }
        return -1;
    }
}
```

## 在排序数组中查找数字

烂

```java
class Solution {
    public int search(int[] nums, int target) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                count++;
            }
        }
        return count;
    }
}
```

更烂

```java
class Solution {
    public int search(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            if (num == target) {
                map.put(num, map.getOrDefault(num, 0) + 1);
            }

        }
        return map.getOrDefault(target, 0);
    }
}
```

好！

```java
class Solution {
     public int search(int[] nums, int target) {
        int leftBound = leftBound(nums, target);
        if (leftBound == -1) {
            return 0;
        }
        int rightBound = rightBound(nums, target);
        return rightBound - leftBound + 1;
    }


    public int leftBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (target > nums[mid]) {
                left = mid + 1;
            } else if (target < nums[mid]) {
                right = mid - 1;
            } else if (target == nums[mid]) {
                right = mid - 1; // 固定左边界，缩小右边界
            }
        }
        // nums[left] != target 带入一个分析一下就知道怎么回事了
        // 真不行记住，妈的
        if (left == nums.length || nums[left] != target) {
            return -1;
        }
        return left;
    }

    public int rightBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (target > nums[mid]) {
                left = mid + 1;
            } else if (target < nums[mid]) {
                right = mid - 1;
            } else if (target == nums[mid]) {
                left = mid + 1;
            }
        }
        if (right < 0 || nums[right] != target) {
            return -1;
        }
        return right;
    }
}
```

go 语言实现一下

```go
func search(nums []int, target int) int {
	leftBound := leftBound(nums, target)
	if leftBound == -1 {
		return 0
	}
	rightBound := rightBound(nums, target)
	return rightBound - leftBound + 1
}

func rightBound(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2
		if target > nums[mid] {
			left = mid + 1
		} else if target < nums[mid] {
			right = mid - 1
		} else if target == nums[mid] {
			left = mid + 1
		}

	}
	if right < 0 || nums[right] != target {
		return -1
	}
	return right
}

func leftBound(nums []int, target int) int {
	left := 0
	right := len(nums) - 1

	for left <= right {
		mid := left + (right-left)/2

		if target > nums[mid] {
			left = mid + 1
		} else if target < nums[mid] {
			right = mid - 1
		} else if target == nums[mid] {
			right = mid - 1
		}
	}
	if left == len(nums) || nums[left] != target {
		return -1
	}
	return left
}
```

## 缺失的数字

```java
class Solution {
    // n = 6
    // 数组的长度为 6 - 1 = 5
    // 说明下标的范围[0, n - 2] -> [0, 4]
    // 数字的范围是[0, n - 1] -> [0, 5]

    public int missingNumber(int[] nums) {

       for (int i = 0; i < nums.length; i++) {
           // 下标就是缺失的那个
           if (nums[i] != i) {
               return i;
           }
       }
       // [0,1,2,3,4,5,6,7,8] 缺9 正好就是数组的长度
       return nums.length;
    }
}
```
