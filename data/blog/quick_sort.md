---
title: 快速排序
date: '2022-12-25'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Quick Sort
---

# 快速排序

## java

```java
/**
 * @description: QuickSort
 * @date: 2022/12/24 23:11
 * @author: zdp
 * @version: 1.0
 */
public class QuickSort {
    public static void main(String[] args) {
//        int[] nums = {6, 4, 3, 2, 1, 5};
        int[] nums = {2, 4, 1, 0, 3, 5};
        QuickSort test = new QuickSort();
        test.quickSort(nums, 0, nums.length - 1);
        for (int num : nums) {
            System.out.println(num + " ");
        }

    }

    // 这样的写不会在函数之外交换
    // 我们可以用数组和成员变量的方法来解决
    public static void swap1(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
    }

    // 数组交换两个数
    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // 分治
    public int partition(int[] nums, int left, int right) {
        int i = left;
        int j = right;
        while (i < j) {
            // 只要右边的数比基准大，就一直循环下去，知道下表相遇
            while (i < j && nums[j] >= nums[left])
                j--;

            // 只要左边的数比基准小，就一直循环下去，直到下标相遇
            while (i < j && nums[i] <= nums[left])
                i++;

            // 在左边找到了比base大的数，在右边找到了比base小的数，交换两个数
            swap(nums, i, j);
        }
        // 最后将我们的base交换到分界处
        swap(nums, i, left);
        // 返回对应的下标
        return i;
    }

    /*
     * @Title: quickSort
     * @Description: 快速排序
     * @Author: zdp
     * @DateTime: 2022/12/28 11:53
     * @param nums
     * @param left
     * @param right
     * @return void
     * @throws
     */
    public void quickSort(int[] nums, int left, int right) {
        // 数组长度为1的时候停止
        // base case
        if (left >= right) {
            return;
        }
        int pivot = partition(nums, left, right);
        quickSort(nums, left, pivot - 1);
        quickSort(nums, pivot + 1, right);
    }

}

```

## go

```go
type QuickSort struct {
}

func (q *QuickSort) partition(nums []int, left, right int) int {
	i, j := left, right
	for i < j {
		for i < j && (nums[j] >= nums[left]) {
			j--
		}
		for i < j && (nums[i] <= nums[left]) {
			i++
		}
		nums[i], nums[j] = nums[j], nums[i]
	}
	nums[i], nums[left] = nums[left], nums[i]
	return i
}
func (q *QuickSort) quickSort(nums []int, left, right int) {
	if left >= right {
		return
	}
	// 进行一次划分，得到哨兵，由哨兵分开数组
	pivot := q.partition(nums, left, right)
	// 递归左子数组
	q.quickSort(nums, left, pivot-1)
	// 递归右子数组
	q.quickSort(nums, pivot+1, right)
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/29.
//
#include <iostream>
#include <vector>

using namespace std;

class QuickSort {
public:
    void swap(vector<int> &nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    int partition(vector<int> &nums, int left, int right) {
        int i = left;
        int j = right;
        while (i < j) {
            while (i < j && nums[j] >= nums[left]) {
                j--;
            }
            while (i < j && nums[i] <= nums[left]) {
                i++;
            }
            swap(nums, i, j);
        }
        swap(nums, i, left);
        return i;
    }

    void quickSort(vector<int> &nums, int left, int right) {
        if (left >= right) {
            return;
        }
        int pivot = partition(nums, left, right);
        quickSort(nums, left, pivot - 1);
        quickSort(nums, pivot + 1, right);
    }
};


int main() {
    QuickSort test;
    vector<int> nums = {2, 1, 3, 5, 6, 4};
    test.quickSort(nums, 0, nums.size() - 1);
    for (const auto &item: nums) {
        cout << item << " ";
    }

}
```
