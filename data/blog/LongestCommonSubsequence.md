---
title: LeetCode Problem 1143 - Longest Common Subsequence
date: '2023-08-16'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Longest Substring Without Repeating Characters
---

# LeetCode Problem 1143 - Longest Common Subsequence

## Description

Given two strings `text1` and `text2`, return _the length of their longest **common subsequence**._ If there is no **common subsequence**, return `0`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

A **common subsequence** of two strings is a subsequence that is common to both strings.

**Example 1:**

```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

**Example 2:**

```
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

**Example 3:**

```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

**Constraints:**

- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.

## Solutions

_recurrence relation:_

![image-20230816200403343](https://xiaozhublog.oss-cn-qingdao.aliyuncs.com/myblogimg/image-20230816200403343.png)

### Solution in Java

```java
	public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();

        // dp: Dynamic Programming

        //    Define the meaning of the dp array: the length of the longest common subsequence
        //    between the first `i` characters of `text1` and the first `j` characters of `text2`
        //    Obviously, dp[0][j] = 0 and dp[j][0] = 0

        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {

            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
                }
            }

        }


        // return the length of longest common subsequence
        // m: text1.length() n: text2.length()
        // between the first `m` characters of `text1` and the first `n` characters of `text2`
        return dp[m][n];

    }
```

### Solution in Go

```go
func longestCommonSubsequence(text1, text2 string) int {
	len1, len2 := len(text1), len(text2)
	dp := make([][]int, len1+1)
	for i := range dp {
		dp[i] = make([]int, len2+1)
	}
	for i, char1 := range text1 {
		for j, char2 := range text2 {
			if char1 == char2 {
				dp[i+1][j+1] = dp[i][j] + 1
			} else {
				dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
			}
		}
	}
	return dp[len1][len2]
}

// in latest version, we can use function Max()
func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```

### Solution in Rust

```rust
	 pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        let (m, n) = (text1.len(), text2.len());
        let (text1, text2) = (text1.as_bytes(), text2.as_bytes());

        let mut dp = vec![vec![0; n + 1]; m + 1];
        for i in 1..=m {
            for j in 1..=n {
                dp[i][j] = if text1[i - 1] == text2[j - 1] {
                    dp[i - 1][j - 1] + 1
                } else {
                    dp[i][j - 1].max(dp[i - 1][j])
                }
            }
        }
        dp[m][n]
    }
```
