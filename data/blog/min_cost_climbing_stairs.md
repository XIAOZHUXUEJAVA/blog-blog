---
title: 使用最小花费爬楼梯
date: '2023-02-17'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Min Cost Climbing Stairs
---

# 使用最小花费爬楼梯

## java

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        // 楼顶就是dp[cost.length]
        int[] dp = new int[cost.length + 1];

        // 因为我们可以选择从0层开始或者从1层开始，所以cost[0], cost[1] = 0
        // dp 数组的含义，到达 i 层的的最小花费

        dp[0] = 0;
        dp[1] = 0;
        // cost[i]的含义是： 我站在第in层 ， 如果想要往下一层走的话，需要花费 cost[i]
        // cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用
        for (int i = 2; i <= cost.length; i++) {
            // 比较走一步和走两步哪个更小即可
            dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
        }
        // 楼顶
        return dp[cost.length];
    }
}
```

## go

```go
func minCostClimbingStairs(cost []int) int {
	dp := make([]int, len(cost)+1)
	dp[0], dp[1] = 0, 0

	for i := 2; i <= len(cost); i++ {
		dp[i] = min(dp[i-1]+cost[i-1], dp[i-2]+cost[i-2])
	}
	return dp[len(cost)]
}
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

```

## c++

```c

class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        vector<int> dp(cost.size() + 1);
        dp[0] = 0;
        dp[1] = 0;

        for (int i = 2; i <= cost.size(); i++) {
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
        }
        return dp[cost.size()];
    }
};
```

## rust

```rust
impl Solution {
    pub fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32{
        let mut dp = vec![0;cost.len() + 1];
        dp[0] = 0;
        dp[1] = 0;

        for i in 2..=cost.len() {
            dp[i] = std::cmp::min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
        }
        dp[cost.len()]
    }
}
```
