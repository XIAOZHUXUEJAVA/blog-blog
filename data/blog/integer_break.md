---
title: 整数拆分
date: '2023-03-10'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Integer Break
---

## java

```java
class Solution {
    public int integerBreak(int n) {
        // 判断特殊情况
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        // 1 dp数组的含义以及初始化dp数组
        // dp[i] 拆分数字为i 得到的整数乘积最大

        int[] dp = new int[n + 1];
        dp[2] = 1;
        for (int i = 3; i <= n; i++) {
            // i = j + (i - j)
            // 1 + j = i j <= i - 1
            int curMax = 0;
            for (int j = 1; j < i; j++) {
                // 有两种情况， 拆分两个数 i - j 和 j  计算这两个数的乘积，固定j继续拆分 i - j
                // 不继续拆分j的而是固定的原因：拆分 i - j 的时候会包括比如 i = 3 i - j = 3
                curMax = Math.max(curMax, Math.max(j * (i - j), j * dp[i - j]));
            }
            dp[i] = curMax;
        }
        return dp[n];
    }
}
```

## go

```go
func integerBreak(n int) int {
	if n == 0 || n == 1 {
		return n
	}

	dp := make([]int, n+1)
	dp[2] = 1

	for i := 3; i <= n; i++ {
		curMax := 0
		// 拆分的话，j 只从1开始
		for j := 1; j < i; j++ {
			curMax = max1(curMax, max1(j*(i-j), dp[i-j]*j))
		}
		dp[i] = curMax
	}
	return dp[n]
}

func max1(n, m int) int {
	if n < m {
		return m
	}
	return n
}
```

## c++

```cpp
class Solution {
public:
    int integerBreak(int n) {
        if (n < 2) {
            return n;
        }

        vector<int> dp(n + 1, 0);

        dp[2] = 1;

        for (int i = 3; i <= n; i++) {
            int curMax = 0;
            for (int j = 1; j < i; j++) {
                curMax = max(curMax, max((i - j) * j, dp[i - j] * j));
            }
            dp[i] = curMax;
        }
        return dp[n];
    }
};
```

## rust

```rust

use std::cmp;
impl Solution {
    pub fn integer_break(n: i32) -> i32 {

        if n == 0 || n == 1 {
            return n as i32;
        }

        let n = n as usize;
        let mut dp = vec![0; n + 1];


        dp[2] = 1;

        for i in 3..=n {
            let mut cur_max = 0;
            for j in 1..i {
                cur_max = cmp::max(cur_max, cmp::max(j * (i - j), dp[i - j] * j));
            }
            dp[i] = cur_max;
        }
        dp[n] as i32
    }
}
```
