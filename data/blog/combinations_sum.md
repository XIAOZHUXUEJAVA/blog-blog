---
title: 组合总和
date: '2023-01-17'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Combination Sum
---

## java

```java
 List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();
    public void backtracking(int[] candidates, int target, int sum, int startIndex) {
        if (sum > target) {
            return;
        }
        if (sum == target) {
            res.add(new LinkedList<>(track));
            return;
        }
        // 注意一个地方即可
        for (int i = startIndex; i < candidates.length; i++) {
            sum += candidates[i];
            track.add(candidates[i]);
            // 我们呢下一次搜寻的时候还是需要把自己搜上的, 因为多个自己可能凑出结果
            backtracking(candidates, target, sum, i);
            sum -= candidates[i];
            track.removeLast();
        }
    }
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        backtracking(candidates, target, 0, 0);
        return res;
    }
```

## go

```go
var resSum [][]int
var trackSum []int

func sumBackTracking(condidate []int, target, sum, startIndex int) {
	if sum > target {
		return
	}
	if sum == target {
        // 学习到了新函数
		resSum = append(resSum, append([]int{}, trackSum...))
		return
	}
	for i := startIndex; i < len(condidate); i++ {
		sum += condidate[i]
		trackSum = append(trackSum, condidate[i])
		sumBackTracking(condidate, target, sum, i)
		sum -= condidate[i]
		trackSum = trackSum[:len(trackSum)-1]
	}
}

func combinationSum(candidates []int, target int) [][]int {
	resSum = make([][]int, 0)
	trackSum = make([]int, 0, len(trackSum))
	sumBackTracking(candidates, target, 0, 0)
	return resSum
}
```

## c++

```c
 	vector<vector<int>> res;
    vector<int> track;
    vector<vector<int>> combinationSum(vector<int>& condidates, int target) {
        backtracking(condidates, target, 0, 0);
        return res;
    }
    void backtracking(vector<int>& condidates, int target, int sum, int startIndex) {
        if (sum > target) {
            return;
        }
        if (sum == target) {
            res.push_back(track);
            return;
        }
        for (int i = startIndex; i < condidates.size(); i++) {
            sum += condidates[i];
            track.push_back(condidates[i]);
            backtracking(condidates, target, sum, i);
            sum -= condidates[i];
            track.pop_back();
        }
    }
```
