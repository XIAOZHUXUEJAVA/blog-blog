---
title: 二叉搜索树中第k小的元素
date: '2022-11-24'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Kth Smallest In BST
---

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: KthSmallestInBST
 * @date: 2022/11/24 14:27
 * @author: zdp
 * @version: 1.0
 */
public class KthSmallestInBST {
    public static void main(String[] args) {
        int[] preorder = {3, 1, 2, 4};
        int[] inorder = {1, 2, 3, 4};
        BuildBinaryTree buildTree = new BuildBinaryTree();
        TreeNode root = buildTree.buildTreeByPreIn(preorder, inorder);
        KthSmallestInBST test = new KthSmallestInBST();
        int smallest = test.kthSmallest(root, 1);
        System.out.println(smallest);

    }
    public int kthSmallest(TreeNode root, int k) {
        traverse(root, k);
        return res;
    }
    int res = 0;
    int rank = 0;
    public void traverse(TreeNode root, int k) {
        if (root == null) {
            return;
        }
        traverse(root.left, k);
        rank++;
        if (k == rank) {
            res = root.val;
            return;
        }
        traverse(root.right, k);
    }
}

```

## go

```go
var ret int
var rank int
func traverse(root *TreeNode, k int) {
	if root == nil {
		return
	}
	traverse(root.Left, k)
	rank++
	if (rank == k) {
		ret = root.Val
		return
	}
	traverse(root.Right, k)
}

func kthSmallest(root *TreeNode, k int) int {
	ret = 0
	rank = 0
	traverse(root, k)
	return ret
}
```

## c++

```c
	int res = 0;
    int rank = 0;
    int kthSmallest(TreeNode* root, int k) {
        traverse(root, k);
        return res;
    }
    void traverse(TreeNode* root, int k) {
        if (root == nullptr) {
            return;
        }
        traverse(root->left, k);
        rank++;
        if (k == rank) {
            res = root->val;
            return;
        }
        traverse(root->right, k);
    }
```

## python

```python
class KthSmallestInBST:
    res = 0
    rank = 0
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        global res, rank
        res = 0
        rank = 0
        self.traverse(root, k)
        return res
    def traverse(self, root: Optional[TreeNode], k: int):
        global res, rank
        if root is None:
            return
        self.traverse(root.left, k)
        rank += 1
        if rank == k:
            res = root.val
            return
        self.traverse(root.right, k)
```
