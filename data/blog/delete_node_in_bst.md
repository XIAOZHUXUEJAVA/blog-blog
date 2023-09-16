---
title: 删除二叉搜索树中的结点
date: '2022-12-4'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Delete Node In BST
---

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: DeleteNodeInBST
 * @date: 2022/12/2 14:33
 * @author: zdp
 * @version: 1.0
 */
public class DeleteNodeInBST {
    public static void main(String[] args) {
        int[] preorder = {5, 3, 2, 4, 6, 7};
        int[] inorder = {2, 3, 4, 5, 6, 7};
        BuildBinaryTree build = new BuildBinaryTree();
        TreeNode tree = build.buildTreeByPreIn(preorder, inorder);
        DeleteNodeInBST test = new DeleteNodeInBST();
        TreeNode newTree = test.deleteNode(tree, 3);
        TreePrint treePrint = new TreePrint();
        System.out.println("the preorder of tree after delete");
        treePrint.preOrderPrint(newTree);
        System.out.println();
        System.out.println("the inorder of tree after delete");
        treePrint.inOrderPrint(newTree);
    }

    public TreeNode getMin(TreeNode root) {
        TreeNode node = root;
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }
    public TreeNode deleteNode(TreeNode root, int key) {
        // 二叉搜索树为空, base case
        if (root == null) {
            return null;
        }

        if (root.val == key) {
            // 3 null 4, 要删除 3 的话，直接返回 4
            if (root.left == null) {
                return root.right;
            }
            // 3 2 null。 要删除 3 的话， 直接返回 2
            if (root.right == null) {
                return root.left;
            }
            // 得到root右子树最小的结点
            TreeNode minNode = getMin(root.right);
            // 删除右子树中最小的结点
            root.right = deleteNode(root.right, minNode.val);
            minNode.left = root.left;
            minNode.right = root.right;
            root = minNode;

        } else if (root.val > key) {
            root.left = deleteNode(root.left, key);
        } else if (root.val < key) {
            root.right = deleteNode(root.right, key);
        }
        return root;
    }
}

```

## go

```go
package tree

func deleteNode(root *TreeNode, key int) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Val == key {
		if root.Left == nil {
			return root.Right
		}
		if root.Right == nil {
			return root.Left
		}
		// 得到右子树最小的结点
		minNode := getMinNode(root.Right)
		// 然后删除右子树这个结点
		root.Right = deleteNode(root.Right, minNode.Val)
		// minNode 要去代替我们原本删除的那个结点
		minNode.Left = root.Left
		minNode.Right = root.Right
		root = minNode
	} else if root.Val > key {
		root.Left = deleteNode(root.Left, key)
	} else if root.Val < key {
		root.Right = deleteNode(root.Right, key)
	}
	return root
}
func getMinNode(root *TreeNode) *TreeNode {
	node := root
	for node.Left != nil {
		node = node.Left
	}
	return node
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/3.
//
#include <iostream>
#include "build_tree.cpp"
using namespace std;

class DeleteNodeInBST {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (root == nullptr) {
            return nullptr;
        }
        if (root->val == key) {
            if (root->left == nullptr) {
                return root->right;
            }
            if (root->right == nullptr) {
                return root->left;
            }
            TreeNode* minNode = getMinNode(root->right);
            root->right = deleteNode(root->right, minNode->val);
            minNode->left = root->left;
            minNode->right = root->right;
            root = minNode;
        } else if (root->val > key) {
            root->left = deleteNode(root->left, key);
        } else if (root->val < key) {
            root->right = deleteNode(root->right, key);
        }
        return root;
    }
    TreeNode* getMinNode(TreeNode* root) {
        TreeNode* node = root;
        while (node->left != nullptr) {
            node = node->left;
        }
        return node;
    }
};


int main() {
    vector<int> preorder = {5, 3, 2, 4, 6, 7};
    vector<int> inorder = {2, 3, 4, 5, 6, 7};
    BuildTree build;
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    DeleteNodeInBST test;
    TreeNode* deleteTree = test.deleteNode(root, 3);
    DisplayTree displayTree;
    displayTree.displayTreeFromIn(deleteTree);
}


```

## python

```python
from typing import Optional

from data_algo.algo.tree.TreeNode import TreeNode


class DeleteNodeInBST:

    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if root is None:
            return None
        if root.val == key:
            if root.left is None:
                return root.right
            if root.right is None:
                return root.left
            minNode = self.getMinNode(root.right)
            root.right = self.deleteNode(root.right, minNode.val)
            minNode.left = root.left
            minNode.right = root.right
            root = minNode
        elif root.val > key:
            root.left = self.deleteNode(root.left, key)
        # 不写else，为了逻辑清晰一点
        elif root.val < key:
            root.right = self.deleteNode(root.right, key)
        return root
    def getMinNode(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        node = root
        while node.left is not None:
            node = node.left
        return node
```
