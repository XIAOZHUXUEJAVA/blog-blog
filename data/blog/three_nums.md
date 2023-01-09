---
title: 三数之和
date: '2023-01-09'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Three Nums
---

没有解决，记录一下，写的也有问题，一团乱麻，心也乱了

```java
public List<List<Integer>> twoSumTargetMod(int[] nums, int start, int target) {
        int low = start;
        int high = nums.length - 1;
        List<List<Integer>> res = new LinkedList<>();
        while (low < high) {
            int sum = nums[low] + nums[high];
            int left = nums[low];
            int right = nums[high];
            if (sum > target) {
                while (low < high && nums[high] == right) {
                    high--;
                }
            } else if (sum < target) {
                while (low < high && nums[low] == left) {
                    low++;
                }
            } else if (sum == target) {
                List<Integer> list = new LinkedList<>();
                list.add(left);
                list.add(right);
                res.add(list);
                // 继续王后面找
                while (low < high && nums[low] == left) {
                    low++;
                }
                while (low < high && nums[high] == right) {
                    high--;
                }
            }
        }
        return res;
    }



    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        List<List<Integer>> res = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            // 从剩下的数中进行寻找. 因为我们已经将数组排序了
            List<List<Integer>> twoSum = twoSumTargetMod(nums, i + 1, 0 - nums[i]);
            for (List<Integer> list : twoSum) {
                list.add(nums[i]);
                res.add(list);
            }
            // 跳过第一个数字重复的情况
            // 1 1 1 3 4 5
            while (i < n - 1 && nums[i] == nums[i + 1]) {
                i++;
            }
        }
        return res;
    }
```
