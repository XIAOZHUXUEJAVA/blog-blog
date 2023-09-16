---
title: 组合总和3-----复习
date: '2023-01-30'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Review Combination Sum 3
---

## c++

```c
	vector<vector<int>> res;
    vector<int> track;
    vector<vector<int>> combinationSum3(int k, int n) {
        backtracking(k, n, 1, 0);
        return res;
    }
    void backtracking(int k, int n, int startIndex, int sum) {
        if (sum > n) {
            return;
        }
        if (track.size() == k && sum == n) {
            res.push_back(track);
            return;
        }
        for (int i = startIndex; i <= 9; i++) {
            sum += i;
            track.push_back(i);
            backtracking(k, n, i + 1, sum);
            sum -= i;
            track.pop_back();
        }
    }
```

## java

```java
	List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();

    public List<List<Integer>> combinationSum3(int k, int n) {
        backtracking(k, n, 1, 0);
        return res;
    }

    public void backtracking(int k, int n, int startIndex, int sum) {
        if (track.size() == k) {
            if (sum == n) {
                res.add(new LinkedList<>(track));
            }
            return;
        }
        for (int i = startIndex; i <= 9; i++) {
            sum += i;
            if (sum > n) {
                break;
            }
            track.add(i);
            backtracking(k, n, i + 1, sum);
            sum -= i;
            track.removeLast();
        }
    }
```

## go

```go
var res [][]int
var track []int

func combinationSum3(k int, n int) [][]int {
    res = [][]int{}
    track = []int{}
    backtracking(k, n, 1, 0)
    return res
}

func backtracking(k int, n int, startIndex int, sum int) {
    if len(track) == k {
        if sum == n {
            res = append(res, append([]int(nil), track...))
        }
        return
    }
    for i := startIndex; i <= 9; i++ {
        sum += i
        if sum > n {
            break
        }
        track = append(track, i)
        backtracking(k, n, i + 1, sum)
        sum -= i
        track = track[:len(track) - 1]
    }
}
```
