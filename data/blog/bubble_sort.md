---
title: 冒泡排序
date: '2022-12-22'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: true
summary: Bubble Sort
---

## java

```java
// 未优化
public void bubbleSort(int[] nums) {
        for (int i = nums.length - 1; i > 0; i--) {
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    // 交换两个数
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
    }
// 优化后
public void bubbleSortWithFlag(int[] nums) {
        for (int i = nums.length - 1; i > 0; i--) {
            boolean flag = false;
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                    flag = true;
                }
            }
            // 说明没有交换元素, 已经达到了排序完成的状态
            if (!flag) {
                break;
            }
        }
    }


```

## go

```go
// 未优化
func bubbleSort(nums []int) {
	for i := len(nums) - 1; i > 0; i-- {
		for j := 0; j < i; j++ {
			if nums[j] > nums[j+1] {
				// 交换两个数
				nums[j], nums[j+1] = nums[j+1], nums[j]
			}
		}
	}
}

// 优化后
func bubbleSortWithFlag(nums []int) {
	for i := len(nums) - 1; i > 0; i-- {
		flag := false
		for j := 0; j < i; j++ {
			if nums[j] > nums[j+1] {
				nums[j], nums[j+1] = nums[j+1], nums[j]
				flag = true
			}
		}
		if !flag {
			break
		}
	}
}
```

## c++

```c
// 未优化
void bubbleSort(vector<int> &nums) {
        for (int i = nums.size() - 1; i > 0; i--) {
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
    }

   // 优化后
    void bubbleSortWithFlag(vector<int> &nums) {
        for (int i = nums.size() - 1; i > 0; i--) {
            bool flag = false;
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                    flag = true;
                }
            }
            if (!flag) {
                break;
            }
        }
    }
```
