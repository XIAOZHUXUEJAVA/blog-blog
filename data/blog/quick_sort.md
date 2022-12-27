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
 * @description: QuickSortStatic
 * @date: 2022/12/26 10:07
 * @author: zdp
 * @version: 1.0
 */
public class QuickSortStatic {
    public static void main(String[] args) {
        int[] nums = {3, 1, 2, 5, 4, 6};
        quickSort(nums, 0, nums.length - 1);
        System.out.println(Arrays.toString(nums));
    }

    public static void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    public static int partition(int[] nums, int left, int right) {
        int i = left;
        int j = right;
        while (i < j) {
            while (i < j && nums[j] >= nums[left]) {
                j--;
            }
            while (i < j && nums[j] <= nums[left]) {
                i++;
            }
            swap(nums, i, j);
        }
        swap(nums, left, i);
        return i;
    }

    public static void quickSort(int[] nums, int left, int right) {
        if (left >= right) {
            return;
        }
        ;
        int pivot = partition(nums, left, right);
        partition(nums, left, pivot - 1);
        partition(nums, pivot + 1, right);
    }
}

```
