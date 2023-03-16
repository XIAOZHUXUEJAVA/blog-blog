---
title: 剑指Offer-算法篇-Day05
date: '2023-03-15'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 剑指 Offer-算法篇-Day05

## 二维数组中的查找

```java
class Solution {

    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        if (matrix.length < 1) {
            return false;
        }
        int m = matrix.length;
        int n = matrix[0].length;
        // 不能回退的话，从左上角只能往下或者往右，一直在变大
        // 所以我们选择从右上角开始，往左变小，往右变大
        int i = 0;
        int j = n - 1;
        while (i < m && j >= 0) {
            if (target == matrix[i][j]) {
                return true;
            } else if (target > matrix[i][j]) { // target 大的话 往下找
                i++;
            } else if (target < matrix[i][j]) { // target 小的话 往左找
                j--;
            }
        }
        return false;
    }
}
```

## 旋转数组中的最小数字

```java
class Solution {
    public int minArray(int[] nums) {
        // 5 3 < 5 说明左边有序，在右边
        // 那就在右边找，
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < nums[right]) {
                right = mid;

            } else if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else if (nums[right] == nums[mid]) {
                right = right - 1;
            }
        }
        return nums[left];
    }
}
```

## 第一个只出现一次的字符

```java
class Solution {
    public char firstUniqChar(String s) {
        HashMap<Character, Boolean> map = new HashMap<>();
        char[] arr = s.toCharArray();
        for (char a : arr) {
            map.put(a, !map.containsKey(a));
        }
        for (char a : arr) {
            if (map.get(a)) {
                return a;
            }
        }
        return ' ';
    }
}
```
