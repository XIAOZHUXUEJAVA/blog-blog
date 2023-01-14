---
title: 组合
date: '2023-01-13'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Combine
---

# 组合

## java

```java
List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();
    public void backtrack(int n, int k, int startIndex) {
        if (track.size() == k) {
            res.add(new LinkedList<>(track));
            return;
        }
        for (int i = startIndex; i <= n; i++) {
            track.add(i);
            backtrack(n, k, i + 1);
            track.removeLast();
        }
    }
    public List<List<Integer>> combine(int n, int k) {
        backtrack(n, k, 1);
        return res;
    }
```

## go

```go
var result [][]int
var track []int

func backtracking(n, k, startIndex int) {
	if len(track) == k {
		temp := make([]int, len(track))
		copy(temp, track)
		result = append(result, temp)
		return
	}
	for i := startIndex; i <= n; i++ {
		track = append(track, i)
		backtracking(n, k, i+1)
		track = track[:len(track)-1]
	}
}
func combine(n, k int) [][]int {
	result = make([][]int, 0)
    track = make([]int, 0, k)
	backtracking(n, k, 1)
	return result
}
```

## c++

```c
vector<vector<int>> res;
    vector<int> track;
    void backtracking(int n, int k, int startIndex) {
        if (track.size() == k) {
            res.push_back(track);
            return;
        }
        for (int i = startIndex; i <= n; i++) {
            track.push_back(i);
            backtracking(n, k, i + 1);
            track.pop_back();
        }
    }
    vector<vector<int>> combine(int n, int k) {
        backtracking(n, k, 1);
        return res;
    }
```
