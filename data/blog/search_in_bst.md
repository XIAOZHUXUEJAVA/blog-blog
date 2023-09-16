---
title: 二叉搜索树中搜索元素
date: '2022-12-02'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Search In BST
---

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: SearchInBST
 * @date: 2022/11/29 23:18
 * @author: zdp
 * @version: 1.0
 */
public class SearchInBST {
    public static void main(String[] args) {
        int[] preorder = {4, 1, 0, 2, 3, 6, 5, 7, 8};
        int[] inorder = {0, 1, 2, 3, 4, 5, 6, 7, 8};
        TreeNode root = new BuildBinaryTree().buildTreeByPreIn(preorder, inorder);
        SearchInBST test = new SearchInBST();
        TreeNode treeNode = test.searchBST(root, 3);
        System.out.println(treeNode.val);
    }

    public TreeNode searchBST(TreeNode root, int target) {
        if (root == null) {
            return null;
        }
        if (target < root.val) {
            return searchBST(root.left, target);
        }
        if (target > root.val) {
            return searchBST(root.right, target);
        }
        return root;
    }
}

```

## go

```go
package tree

func searchBST(root *TreeNode, target int) *TreeNode {
	if root == nil {
		return nil
	}
	if target < root.Val {
		return searchBST(root.Left, target)
	}
	if target > root.Val {
		return searchBST(root.Right, target)
	}
	return root
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/1.
//

#include <iostream>
#include "build_tree.cpp"
using namespace std;


class SearchInBST {
public:
    TreeNode* searchBST(TreeNode* root, int target) {
        if (root == nullptr) {
            return nullptr;
        }
        if (root->val > target) {
            return searchBST(root->left, target);
        }
        if (root->val < target) {
            return searchBST(root->right, target);
        }
        return root;
    }
};


int main() {
    BuildTree build;
    vector<int> preorder = {4, 2, 1, 3, 7};
    vector<int> inorder = {1, 2, 3, 4, 7};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    SearchInBST test;
    TreeNode* searchNode = test.searchBST(root, 3);
    cout<<searchNode->val<<endl;
}
```

## python

```python
from typing import Optional

from data_algo.algo.tree.TreeNode import TreeNode
from data_algo.algo.tree.build_tree import BuildTree


class SearchInBST:
    def searchBST(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        if root is None:
            return None
        if target < root.val:
            return self.searchBST(root.left, target)
        if target > root.val:
            return self.searchBST(root.right, target)
        return root


if __name__ == "__main__":
    preorder = (4, 2, 1, 3, 7)
    inorder = (1, 2, 3, 4, 7)
    build = BuildTree()
    root = build.buildTree(preorder, inorder)
    test = SearchInBST()
    searchNode = test.searchBST(root, 3)
    print(searchNode.val)

```
