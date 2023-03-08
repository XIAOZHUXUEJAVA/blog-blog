---
title: 不同路径
date: '2023-03-08'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Unique Paths
---

## 不同路径

## go

```go
func uniquePaths(m, n int) int {
	// 1. dp[][]的含义
	dp := make([][]int, m)

	// 2. 确定递推公式，因为我们只能往右走或者是往下走
	// 往下走的：dp[i - 1][j] 往右走的：dp[i][j - 1]
	// dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

	// 3. 初始化dp数组
	// 第一列和第一行 都是1，[0][0] 到 [i][0] 一定只有一条路可走
	for i := range dp {
		dp[i] = make([]int, n)
		dp[i][0] = 1
	}

	for j := 0; j < n; j++ {
		dp[0][j] = 1
	}

	// 4. 确定遍历顺序

	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			dp[i][j] = dp[i][j-1] + dp[i-1][j]
		}
	}
	return dp[m-1][n-1]
}
```

## java

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

## rust

```rust
impl Solution {
pub fn unique_paths(m: i32, n: i32) -> i32 {
    let mut dp = vec![vec![0; n as usize]; m as usize];

    for i in 0..m as usize {
        dp[i][0] = 1;
    }
    for j in 0..n as usize {
        dp[0][j] = 1;
    }
    for i in 1..m as usize {
        for j in 1..n as usize {
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
        }
    }
    dp[(m - 1) as usize][(n - 1) as usize]
}
}
```

## c++

```c
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n, 0));
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
};
```
