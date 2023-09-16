---
title: 组合-----复习
date: '2023-01-27'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Review Combination
---

## 未优化

```java
package com.zhu.review.leetcode.backtrack;

import java.util.LinkedList;
import java.util.List;

/**
 * @description: Combinations
 * @date: 2023/1/27 12:36
 * @author: zdp
 * @version: 1.0
 */
public class Combinations {
    public static void main(String[] args) {

    }
    List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();

    public void backtrack(int n, int k, int startIndex) {
        // 终止条件
        if (track.size() == k) {
            // 根据语言特性, 做出相应的add，这里是add(new)
            res.add(new LinkedList<>(track));
            return;
        }
        // 1 2 3 4  选了 1 然后选 2 回溯， 选3， 回溯， 选4；
        // i = 1 循环结束了， 到下一个，也就是 i = 2, 选 3 回溯， 选4, 回溯;
        // 以此类推
        for (int i = startIndex; i <= n; i++) {
            track.add(i);
            // 因为是组合，不是排列，我们需要从下一个数继续
            backtrack(n, k, i + 1);
            track.removeLast();
        }
    }

    public List<List<Integer>> combine(int n, int k) {
        backtrack(n, k, 1);
        return res;
    }
}

```

## 剪枝优化后

```java
package com.zhu.review.leetcode.backtrack;

import java.util.LinkedList;
import java.util.List;

/**
 * @description: CompositionsOptimizations(组合问题，剪枝操作)
 * @date: 2023/1/27 12:53
 * @author: zdp
 * @version: 1.0
 */
public class CompositionsOptimizations {
    public static void main(String[] args) {

    }
    List<List<Integer>> res = new LinkedList<>();
    LinkedList<Integer> track = new LinkedList<>();
    public void backtrack(int n, int k, int startIndex) {
        if (track.size() == k) {
            res.add(new LinkedList<>(track));
            return;
        }
        // 这里其实是需要剪枝操作的，就是剩余的我们需要选的 不够k
        // 比如说 3 2, 我们 从 1 2 3 中选2个数作为组合,但是到了3的时候我们没有必要选了, 因为不够了
        // 我们剩余的元素[i, n], 个数为 n - i + 1, 已经选择的元素个数 k - track.size() 由此得到不等式：
        //  n - i + 1 >= k - track.size()
        for (int i = startIndex; i <= n; i++) {
            track.add(i);
            backtrack(n, k, i + 1);
            track.removeLast();
        }
    }
}

```

完整分析版：[组合-----剪枝优化 (xiaozhulzqazureblog.netlify.app)](https://xiaozhulzqazureblog.netlify.app/blog/combine_optimization)
