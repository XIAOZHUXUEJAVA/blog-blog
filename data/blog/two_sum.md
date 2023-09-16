---
title: 两数之和
date: '2022-12-08'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Two Sum
---

## java

```java
package com.zhu.algorithms.leetcode.array;

import java.util.Arrays;
import java.util.HashMap;

/**
 * @description: TwoSum
 * @date: 2022/12/8 15:55
 * @author: zdp
 * @version: 1.0
 */
public class TwoSum {
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        TwoSum test = new TwoSum();
        int[] res = test.twoSumUseDoublePointer(nums, 9);
        for (int re : res) {
            System.out.println(re);
        }
    }


    /*
     * @Title: twoSumUseDoublePointer
     * @Description: 返回的如果是具体的数，而不是坐标的话，我们可以使用双指针的方法
     * @Author: zdp
     * @DateTime: 2022/12/8 17:32
     * @param nums
     * @param target
     * @return int[]
     * @throws
     */
    public int[] twoSumUseDoublePointer(int[] nums, int target) {
        Arrays.sort(nums);
        int low = 0;
        int high = nums.length - 1;
        while (low < high) {
            int sum = nums[low] + nums[high];
            if (sum > target) {
                high--;
            } else if (sum < target) {
                low++;
            } else if (sum == target) {
                return new int[]{nums[low], nums[high]};
            }
        }
        return null;
    }
    /*
     * @Title: twoSumUseHashMap
     * @Description: 使用HashMap
     * @Author: zdp
     * @DateTime: 2022/12/8 17:19
     * @param nums
     * @param target
     * @return int[]
     * @throws
     */
    public int[] twoSumUseHashMap(int[] nums, int target) {
        HashMap<Integer, Integer> valToIndex = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (valToIndex.containsKey(need)) {
                return new int[]{valToIndex.get(need), i};
            }
            valToIndex.put(nums[i], i);
        }
        return null;
    }


    /*
     * @Title: twoSum
     * @Description: 直接用两个for循环暴力求解
     * @Author: zdp
     * @DateTime: 2022/12/8 17:10
     * @param nums
     * @param target
     * @return int[]
     * @throws
     */
    public int[] twoSum(int[] nums, int target) {
        int[] res = new int[2];
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (target - nums[i] == nums[j]) {
                    res[0] = nums[i];
                    res[1] = nums[j];
                    return res;
                }
            }
        }
        return res;
    }
}


```

## go

```go
package arrays

//
// @Title twoSum
// @Description
// @Author zdp 2022-12-08 17:54:28
// @Param nums
// @Param target
// @Return []int
//
func twoSum(nums []int, target int) []int {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return nil
}
//
// @Title twoSumUseMap
// @Description
// @Author zdp 2022-12-08 17:54:34
// @Param nums
// @Param target
// @Return []int
//
func twoSumUseMap(nums []int, target int) []int {
	valToIndex := map[int]int{}
	for i, el := range nums {
		need := target - el
		index, ok := valToIndex[need]
		if ok {
			return []int{index, i}
		}
		valToIndex[el] = i
	}
	return nil
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/8.
//
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class TwoSum {
public:
    vector<int> twoSumUseMap(vector<int>& nums, int target) {
        unordered_map<int, int> valToIndex;
        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];
            // 新语法， 参考 chatGPT
            auto it = valToIndex.find(need);
            if (it != valToIndex.end()) {
                return {it->second, i};
            }
            valToIndex[nums[i]] = i;
        }
        return {};
    }
    vector<int> twoSum(vector<int>& nums, int target) {
        int size = nums.size();
        for (int i = 0; i < size; i++) {
            for (int j = i + 1; j < size; j++) {
                if (target - nums[j] == nums[i]) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};



int main() {
    TwoSum test;
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = test.twoSum(nums, 9);
    for (const auto &item: res) {
        cout<<item<<endl;
    }
    vector<int> res1 = test.twoSumUseMap(nums, 9);
    for (const auto &item: res1) {
        cout<<item<<endl;
    }
}
```
