---
title: LeetCode Problem 70 - Climbing Stairs
date: '2023-08-15'
tags: ['java', 'go', 'rust', 'leetcode']
draft: false
summary: The solutions to `Climbing Stairs` with implementation in Java, Go and Rust
---

# Climb Stairs

## Description

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Example 1:**

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

**Constraints:**

- `1 <= n <= 45`

## Solutions

### Solution in Java

```java
	public int climbStairs(int n) {
        // dp: Dynamic Programming
        // 1. Define the meaning of the index of the dp array: To reach the i-th floor, there are dp[i] ways

        // 2. Define the recurrence relation:
        //    To reach (i - 2)-th floor, there are dp[i - 2] ways, and then taking two steps to reach i-th floor.
        //    To reach (i - 1)-th floor, there are dp[i - 1] ways, and then taking one step to reach i-th floor.

        // So the total number of the ways to i-th floor is `dp[i - 1] + dp[i - 2]`


        // Create the dp array: [0..n] floor, so the length of the array is `n + 1`
        int[] dp = new int[n + 1];
        // There is only one way to reach floor 0-th, not climbing
        dp[0] = 1;
        // There is only one way to reach floor 1-th, climb one step
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
```

### Solution in Go

```go
func climbStairs(n int) int {
	dp := make([]int, n+1)

	dp[0] = 1
	dp[1] = 1

	for i := 2; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}
	return dp[n]
}
```

### Solution in Rust

```rust
pub struct ClimbStairs {}

impl ClimbStairs {
    pub fn climb_stairs(n: i32) -> i32 {
        let mut dp: Vec<i32> = vec![0; (n + 1) as usize];
        dp[0] = 1;
        dp[1] = 1;
        for i in 2..=n as usize {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        dp[n as usize]
    }
}

#[cfg(test)]
mod tests {
    use super::ClimbStairs;

    #[test]
    pub fn test_climb_stairs() {
        let result = ClimbStairs::climb_stairs(3);
        assert_eq!(3, result);
    }
}

```
