---
title: 不同路径II
date: '2023-03-09'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Unique Paths ii
---

## go

```go
func uniquePathsWithObstacles(obstacleGrid [][]int) int {

	m := len(obstacleGrid)
	n := len(obstacleGrid[0])

    // 起点和终点为石头的话，直接返回0，因为没有方法
	if obstacleGrid[0][0] == 1 || obstacleGrid[m-1][n-1] == 1 {
		return 0
	}
	dp := make([][]int, m)

	for i := range dp {
		dp[i] = make([]int, n)
	}

    // 初始化，遇到石头之后，不用算了，到达不了
	for i := 0; i < m && obstacleGrid[i][0] == 0; i++ {
		dp[i][0] = 1
	}

	for j := 0; j < n && obstacleGrid[0][j] == 0; j++ {
		dp[0][j] = 1
	}

	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
             // 这里也是同理
			if obstacleGrid[i][j] == 0 {
				dp[i][j] = dp[i][j-1] + dp[i-1][j]
			}
		}
	}
	return dp[m-1][n-1]
}
```

## rust

```rust

impl Solution {
    pub fn unique_paths_with_obstacles(obstacles_grid: Vec<Vec<i32>>) -> i32 {
        let m: usize = obstacles_grid.len();
        let n: usize = obstacles_grid[0].len();

        if obstacles_grid[0][0] == 1 || obstacles_grid[m - 1][n - 1] == 1 {
            return 0;
        }

        let mut dp = vec![vec![0; n]; m];

        for i in 0..m {
            if obstacles_grid[i][0] == 1 {
                break;
            } else {
                dp[i][0] = 1;
            }
        }

        for j in 0..n {
            if obstacles_grid[0][j] == 1 {
                break;
            } else {
                dp[0][j] = 1;
            }
        }

        for i in 1..m {
            for j in 1..n {
                if obstacles_grid[i][j] == 0 {
                    dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
                }
            }
        }
        dp[m - 1][n - 1]
    }
}

```

## java

```java
class Solution {
      public int uniquePathsWithObstacles(int[][] obstaclesGrid) {
        int m = obstaclesGrid.length;
        int n = obstaclesGrid[0].length;

        if (obstaclesGrid[0][0] == 1 && obstaclesGrid[m - 1][n - 1] == 1) {
            return 0;
        }
        int[][] dp = new int[m][n];


        for (int i = 0; i < m && obstaclesGrid[i][0] == 0; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n && obstaclesGrid[0][j] == 0; j++) {
            dp[0][j] = 1;
        }


        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (obstaclesGrid[i][j] == 0) {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

## c++

```c
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();

        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) {
            return 0;
        }

        vector<vector<int>> dp(m, vector<int>(n, 0));

        for (int i = 0; i < m && obstacleGrid[i][0] == 0; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n && obstacleGrid[0][j] == 0; j++) {
            dp[0][j] = 1;
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (obstacleGrid[i][j] == 0) {
                    dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
                }
            }
        }
        return dp[m - 1][n - 1];
    }
};
```
