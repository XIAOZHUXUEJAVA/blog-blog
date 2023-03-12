---
title: 不同的二叉搜索树
date: '2023-03-12'
tags: ['java', 'go', 'c++', 'rust', 'datastructrue']
draft: false
summary: Unique Binary Search Tree
---

# 不同的二叉搜索树

什么是二叉搜索树，总结一句话就是 **左孩子所有结点比父节点小，右孩子所有结点比父节点大，中序遍历有序**

## java

```java
public int numTrees(int n) {

        // dp 数组的含义 : i 个不同的数字可以组成多少种二叉搜索树
        int[] dp = new int[n + 1];
        // 初始化dp数组
        // dp[0] = 1 dp[1] = 1 ,
        // dp[0] 比如说一个二叉搜索树没有左左子树 没有右子树的时候

        // 找到递推公式 dp[i] += dp[j - 1] + dp[i - j]  其实就是不同根结点的累加
        // i = 5  当根节点为1的时候  左子树有0个结点， 右子树有4个结点 dp[5] += dp[0] * dp[4]
        // i = 5  当根结点为2的时候  左子树有1个结点， 右子树有3个结点 dp[5] += dp[1] * dp[3]
        // i = 5  当根结点为3的时候  左子树有2个结点， 右子树有2个结点 dp[5] += dp[2] * dp[2]
        // i = 5  当根结点为4的时候  左子树有3个结点， 右子树有1个结点 dp[5] += dp[3] * dp[1]
        // i = 5  当根结点为5的时候  左子树有4个结点， 右子树有0个结点 dp[5] += dp[4] * ap[0]

        // 两层for循环的含义，第一层为dp数组的含义，第二层为不同根节点

        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                int left = dp[j - 1];
                int right = dp[i - j];
                dp[i] += left * right;
            }
        }
        return dp[n];
    }
```

## go

```go
func numTrees(n int) int {
	dp := make([]int, n + 1)

	dp[0] = 1
	dp[1] = 1

	for i := 2; i <= n; i++ {
		for j := 1; j <= i; j++ {
			left := dp[j - 1]
			right := dp[i - j]
			dp[i] += left * right
		}
	}
	return dp[n]
}
```

## rust

```rust
impl Solution {
    pub fn num_trees(n: i32) -> i32 {
        if n < 2 {
            return 1 as i32;
        }
        let n = n as usize;

        let mut dp = vec![0; n + 1];
        dp[0] = 1;
        dp[1] = 1;

        for i in 2..=n {
            for j in 1..=i {
                let left = dp[j - 1];
                let right = dp[i - j];
                dp[i] += left * right;
            }
        }
        dp[n]

    }
}
```

## c++

```c
class Solution {
public:
    int numTrees(int n) {
        if (n < 2) {
            return 1;
        }
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                int left = dp[j - 1];
                int right = dp[i - j];
                dp[i] += left * right;
            }
        }
        return dp[n];
    }
};
```
