---
title: 对称二叉树
date: '2022-12-07'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Symmetric Binary Tree
---


# 对称二叉树

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: SymmetricTree
 * @date: 2022/12/7 15:38
 * @author: zdp
 * @version: 1.0
 */
public class SymmetricTree {
    public static void main(String[] args) {
        int[] preorder = {1, 2, 3, 4, 2, 4, 3};
        int[] inorder = {3, 2, 4, 1, 4, 2, 3};
        BuildBinaryTree build = new BuildBinaryTree();
        TreeNode root = build.buildTreeByPreIn(preorder, inorder);
        SymmetricTree test = new SymmetricTree();
        boolean check = test.isSymmetric(root);
        System.out.println(check);
    }

    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return checkLAndR(root.left, root.right);
    }

    public boolean checkLAndR(TreeNode left, TreeNode right) {

        // 有空的情况下
        if (left == null || right == null) {
            if (left == null && right == null) {
                return true;
            }
            return false;
        }
        // 不相等的话返回false
        if (left.val != right.val) {
            return false;
        }
        // 相等的话继续递归即可
        return checkLAndR(left.right, right.left) && checkLAndR(left.left, right.right);
    }
}

```



## go

```go
package tree

func isSymmetric(root *TreeNode) bool {
	if root == nil {
		return true
	}
	return checkLAndR(root.Left, root.Right)
}

func checkLAndR(left, right *TreeNode) bool {
	if left == nil || right == nil {
		if left == nil && right == nil {
			return true
		}
		return false
	}
	if left.Val != right.Val {
		return false
	}
	return checkLAndR(left.Left, right.Right) && checkLAndR(left.Right, right.Left)
}
.
0
```





## c++

```c
//
// Created by xiaoz on 2022/12/7.
//
#include <iostream>
#include "build_tree.cpp"
using namespace std;

class SymmetricTree {
public:
    bool isSymmetric(TreeNode* root) {
        if (root == nullptr) {
            return true;
        }
        return checkLAndR(root->left, root->right);
    }
    bool checkLAndR(TreeNode* left, TreeNode* right) {
        if (left == nullptr || right == nullptr) {
            if (left == nullptr && right == nullptr) {
                return true;
            }
            return false;
        }
        if (left->val != right->val) {
            return false;
        }
        return checkLAndR(left->left, right->right) && checkLAndR(left->right, right->left);
    }
};




int main() {
    BuildTree build;
    vector<int> preorder = {1, 2, 3, 4, 2, 4, 3};
    vector<int> inorder = {3, 2, 4, 1, 4, 2, 3};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    SymmetricTree test;
    cout<<test.isSymmetric(root);
}
```

