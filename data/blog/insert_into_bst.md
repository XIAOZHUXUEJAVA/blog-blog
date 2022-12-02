---
title: 二叉搜索树中插入元素
date: '2022-12-02'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Insert Element Into BST
---


# Insert Element Into BST

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: InsertInBST
 * @date: 2022/11/29 23:30
 * @author: zdp
 * @version: 1.0
 */
public class InsertInBST {
    public static void main(String[] args) {
        int[] preorder = {4, 2, 1, 3, 7};
        int[] inorder = {1, 2, 3, 4, 7};
        TreeNode root   = new BuildBinaryTree().buildTreeByPreIn(preorder, inorder);
        InsertInBST test = new InsertInBST();
        TreeNode newBST = test.insertIntoBST(root, 5);
        TreePrint treePrint = new TreePrint();
        treePrint.preOrderPrint(newBST);


    }
    // 涉及到修改的，那不就是新构造一个二叉搜索树吗？ 然后我们再套用模板即可
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) {
            return new TreeNode(val);
        }
        if (root.val > val) {
            root.left = insertIntoBST(root.left, val);
        }
        if (root.val < val) {
            root.right = insertIntoBST(root.right, val);
        }
        return root;
    }
}

```



## go

```go
package tree

func insertIntoBST(root *TreeNode, val int) *TreeNode {
	if root == nil {
		return &TreeNode{val, nil, nil}
	}
	if root.Val > val {
		root.Left = insertIntoBST(root.Left, val)
	}
	if root.Val < val {
		root.Right = insertIntoBST(root.Right, val)
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

class InsertIntoBST {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if (root == nullptr) {
            return new TreeNode(val);
        }
        if (root->val > val) {
            root->left = insertIntoBST(root->left, val);
        }
        if (root->val < val) {
            root->right = insertIntoBST(root->right, val);
        }
        return root;
    }
};



int main() {
    BuildTree build;
    vector<int> preorder = {4, 2, 1, 3, 7};
    vector<int> inorder = {1, 2, 3, 4, 7};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    InsertIntoBST test;
    TreeNode* newTree =  test.insertIntoBST(root, 5);
    DisplayTree displayTree;
    displayTree.displayTreeFromPre(newTree);
    return 0;
}
```



## python

```python
from typing import Optional

from data_algo.algo.tree.TreeNode import TreeNode
from data_algo.algo.tree.build_tree import BuildTree
from data_algo.algo.tree.tree_print import TreePrint


class InsertIntoBST:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if root is None:
            return TreeNode(val)
        if root.val > val:
            root.left = self.insertIntoBST(root.left, val)
        if root.val < val:
            root.right = self.insertIntoBST(root.right, val)
        return root

if __name__ == "__main__":
    preorder = (4, 2, 1, 3, 7)
    inorder = (1, 2, 3, 4, 7)
    build = BuildTree()
    root = build.buildTree(preorder, inorder)
    test = InsertIntoBST()
    newTree = test.insertIntoBST(root, 5)
    display = TreePrint()
    display.displayFromPreIn(newTree)
```

