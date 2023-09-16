---
title: 组合总和2
date: '2023-01-18'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Combination Sum2
---

## java

```java
List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();
    public void backtracking(int[] candidates, int target, int sum, int startIndex, boolean[] used) {
        if (sum > target) {
            return;
        }
        if (sum == target) {
            res.add(new LinkedList<>(track));
            return;
        }
        for (int i = startIndex; i < candidates.length; i++) {
            if (i > 0 && candidates[i] == candidates[i - 1] && used[i - 1] == false) {
                continue;
            }
            sum += candidates[i];
            track.add(candidates[i]);
            used[i] = true;
            backtracking(candidates, target, sum, i + 1, used);
            sum -= candidates[i];
            used[i] = false;
            track.removeLast();
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        boolean[] used = new boolean[candidates.length];
        backtracking(candidates, target, 0, 0, used);
        return res;
    }
```

## go

```go
var resSum2 [][]int
var trackSum2 []int

func sumBackTracking2(candidates []int, target, sum, startIndex int, used []bool) {
	if sum > target {
		return
	}
	if sum == target {
		resSum2 = append(resSum2, append([]int{}, trackSum2...))
		return
	}
	for i := startIndex; i < len(candidates); i++ {
		if i > 0 && candidates[i] == candidates[i-1] && used[i-1] == false {
			continue
		}
		sum += candidates[i]
		used[i] = true
		trackSum2 = append(trackSum2, candidates[i])
		sumBackTracking2(candidates, target, sum, i + 1, used)
		sum -= candidates[i]
		used[i] = false
		trackSum2 = trackSum2[:len(trackSum2)-1]
	}
}

func combinationSum2(candidates []int, target int) [][]int {
	resSum2 = make([][]int, 0)
	trackSum2 = make([]int, 0, len(trackSum2))
	used := make([]bool, len(candidates))
    sort.Ints(candidates)
	sumBackTracking2(candidates, target, 0, 0, used)
	return resSum2
}
```

## c++

```c
	vector<vector<int>> res;
    vector<int> track;
    vector<vector<int>> combinationSum2(vector<int> candidates, int target) {
        vector<bool> used (candidates.size(), false);
        sort(candidates.begin(), candidates.end());
        backtracking(candidates, target, 0, 0, used);
        return res;
    }
    void backtracking(vector<int> candidates, int target, int sum, int startIndex, vector<bool> used) {
        if (sum > target) {
            return;
        }
        if (sum == target) {
            res.push_back(track);
            return;
        }
        for (int i = startIndex; i < candidates.size(); i++) {
            if (i > 0 && candidates[i] == candidates[i - 1] && !used[i - 1]) {
                continue;
            }
            sum += candidates[i];
            used[i] = true;
            track.push_back(candidates[i]);
            backtracking(candidates, target, sum, i + 1, used);
            sum -= candidates[i];
            used[i] = false;
            track.pop_back();
        }
    }
```
