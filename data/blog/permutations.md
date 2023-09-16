---
title: 全排列
date: '2022-12-05'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Permutations
---

## java

```java
package com.zhu.algorithms.leetcode.backtracking;

import java.util.LinkedList;
import java.util.List;

/**
 * @description: Permutations
 * @date: 2022/12/5 15:18
 * @author: zdp
 * @version: 1.0
 */
public class Permutations {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        int[][] num = new int[3][3];
        Permutations test = new Permutations();
        List<List<Integer>> result = test.permute(nums);
        for (List<Integer> list : result) {
            System.out.println(list);
        }
    }

    List<List<Integer>> res = new LinkedList<>();

    List<List<Integer>> permute(int[] nums) {
        LinkedList<Integer> track = new LinkedList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, track, used);
        return res;
    }

    public void backtrack(int[] nums, LinkedList<Integer> track, boolean[] used) {


        // 如果一条路满了， 就加入到结果中去， basecase,相当于结束条件
        if (track.size() == nums.length) {
            res.add(new LinkedList<>(track));
            return;
        }
        // 开始遍历
        for (int i = 0; i < nums.length; i++) {

            // nums[i]已在track当中，我们就可以跳过了
            if (used[i]) {
                continue;
            }
            // nums[i]不在track中，我们将其加入，做出选择
            track.add(nums[i]);
            used[i] = true;
            // 然后去下一层寻找
            backtrack(nums, track, used);
            // 如果我们找完了下一层，把下一层的选择取消，方便我们下一次取消
            track.removeLast();
            used[i] = false;
        }
    }
}

```

## go

```go
package backtracking

var res [][]int

func permute(nums []int) [][]int {
	res = [][]int{}
	used := make([]bool, len(nums))
	var track []int
	backtrack(nums, track, used)
	return res
}

func backtrack(nums []int, track []int, used []bool) {

	if len(track) == len(nums) {
		temp := make([]int, len(track))
		// 不copy的话可能会影响后面的结果, 因为我们加入到res之后，改变track依然是可以影响res的
		copy(temp, track)
		res = append(res, temp)
		return
	}
	// 也可以用传统for循环
	for i, el := range nums {
		if used[i] {
			continue
		}
		track = append(track, el)
		used[i] = true
		backtrack(nums, track, used)
		track = track[:len(track)-1]
		used[i] = false
	}
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/5.
//
#include <iostream>
#include <vector>

using namespace std;

class Permutations {
public:
    vector<vector<int>> res;
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int> track;
        vector<bool> used(nums.size(), false);
        backtrack(nums, track, used);
        return res;
    }
    void backtrack(vector<int>& nums, vector<int>& track, vector<bool>& used) {
        if (nums.size() == track.size()) {
            vector<int> temp;
            temp.insert(temp.end(), track.begin(), track.end());
            res.push_back(temp);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i]) {
                continue;
            }
            track.push_back(nums[i]);
            used[i] = true;
            backtrack(nums, track, used);
            track.pop_back();
            used[i] = false;
        }

    }
};



int main() {
    Permutations test;
    vector<int> nums = {1, 2, 3};
    vector<vector<int>> result = test.permute(nums);
    for (const auto &item: result) {
        for (const auto &item: item) {
            cout<<item<<" ";
        }
        cout<<endl;
    }
}
```
