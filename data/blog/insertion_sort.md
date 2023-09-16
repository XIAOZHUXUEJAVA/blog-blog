---
title: 插入排序
date: '2022-12-23'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Insertion Sort
---

## java

```java
/*
     * @Title: insertionSort
     * @Description: 插入排序
     * @Author: zdp
     * @DateTime: 2022/12/23 18:18
     * @param nums
     * @return void
     * @throws
     */
    public void insertionSort(int[] nums) {
        // 外层循环用于遍历所有的base，从 第二个元素开始，以此类推
        for (int i = 1; i < nums.length; i++) {
            int base = nums[i];
            int j = i - 1;
            // 比base大的元素都往后移动
            // 为了寻找比base小的元素
            // 当j = 0的时候，如果还没有找到的话 j = -1，我们就base赋值给第一个元素位置 index = 0
            while (j >=0 && nums[j] > base) {
                nums[j + 1] = nums[j];
                j--;
            }
            // 我们找到了比base小的元素的位置, 然后将我们的base插入到正确的位置即可
            nums[j + 1] = base;
        }
    }
```

## go

```go
func insertionSort(nums []int) {
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

## c++

```c
void insertionSort(vector<int> &nums) {
        for (int i = 1; i < nums.size(); i++) {
            int key = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
    }
```
