---
title: 二叉树的最小深度
date: '2022-12-06'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Min Depth of Binary Tree
---


# 二叉树的最小深度

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

import java.util.LinkedList;
import java.util.Queue;

/**
 * @description: MinimumDepthOfBinaryTree
 * @date: 2022/12/6 13:32
 * @author: zdp
 * @version: 1.0
 */
public class MinimumDepthOfBinaryTree {
    public static void main(String[] args) {
        int[] preorder = {3, 9, 20, 15, 7};
        int[] inorder = {9, 3, 15, 20, 7};
        BuildBinaryTree build = new BuildBinaryTree();
        TreeNode root = build.buildTreeByPreIn(preorder, inorder);
        MinimumDepthOfBinaryTree test = new MinimumDepthOfBinaryTree();
        int minD = test.minDepth(root);
        System.out.println(minD);
    }

    public int minDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        // 根节点自己算一次深度
        int depth = 1;
        // while循环负责从顶到下
        while (!queue.isEmpty()) {
            int size = queue.size();
            // for循环负责从左到右，从左到右的过程中顺便把下一层的给提拔上来
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                if (current.left == null && current.right == null) {
                    return depth;
                }
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            depth++;
        }
        return depth;
    }
}

```



## go

```go
package tree

var list []int

func detectBSTHelper(root *TreeNode) {
	if root == nil {
		return
	}
	detectBSTHelper(root.Left)
	list = append(list, root.Val)
	detectBSTHelper(root.Right)
}

func isValidBSTBySlice(root *TreeNode) bool {
	list = []int{}
	detectBSTHelper(root)
	for i := 1; i < len(list); i++ {
		if list[i] <= list[i-1] {
			return false
		}
	}
	return true
}

func isValidBST(root *TreeNode) bool {
	return validBSTHelper(root, nil, nil)
}
func validBSTHelper(root *TreeNode, min *TreeNode, max *TreeNode) bool {
	if root == nil {
		return true
	}
	if min != nil && root.Val <= min.Val {
		return false
	}
	if max != nil && root.Val >= max.Val {
		return false
	}
	return validBSTHelper(root.Left, min, root) && validBSTHelper(root.Right, root, max)
}

```



## c++

```c
//
// Created by xiaoz on 2022/12/6.
//
#include <iostream>
#include "build_tree.cpp"
#include <queue>
using namespace std;

class MinDepthInTree {
public:
    int minDepth(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }
        int depth = 1;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* current = q.front();
                q.pop();
                if (current->left == nullptr && current->right == nullptr) {
                    return depth;
                }
                if (current->left != nullptr) {
                    q.push(current->left);
                }
                if (current->right != nullptr) {
                    q.push(current->right);
                }
            }
            depth++;
        }
        return depth;
    }
};




int main() {
    vector<int> preorder = {3, 9, 20, 15, 7};
    vector<int> inorder = {9, 3, 15, 20, 7};
    BuildTree build;
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    MinDepthInTree test;
    int min = test.minDepth(root);
    cout<<min<<endl;
}

```

