---
title: 盛水最多的容器
date: '2023-01-11'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Container With Most Water
---

# 盛最多水的容器

## java

```java
 public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int min = Math.min(height[left], height[right]);
            int currentArea = min * (right - left);
            maxArea = Math.max(maxArea, currentArea);
            // 这个题唯一注意的点，为什么是移动最短的一条边
            // 移动最短的一条边，他的长度才有可能变大，对应的面积才会变大。注意是有可能；移动最长的那条边，是永远不会变大的，木桶原理
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
```

## go

```go
func maxArea(height []int) int {
	left := 0
	right := len(height) - 1
	maxArea := 0
	for left < right {
		min := getMin(height[left], height[right])
		currentArea := min * (right - left)
		maxArea = getMax(currentArea, maxArea)
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return maxArea
}

func getMax(num1, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}
func getMin(num1, num2 int) int {
	if num1 > num2 {
		return num2
	}
	return num1
}
```

## c++

```c
int maxArea(vector<int> &height) {
        int left = 0;
        int right = height.size() - 1;
        int maxArea = 0;
        while (left < right) {
            int minHeight = min(height[left], height[right]);
            int currentArea = minHeight * (right - left);
            maxArea = max(currentArea, maxArea);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
```
