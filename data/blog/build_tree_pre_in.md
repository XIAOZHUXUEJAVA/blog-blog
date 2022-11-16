---
title: 从前序与中序序列构建二叉树
date: '2022-11-16'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Build Binary Tree From Preorder and Inorder
---


# 从前序与中序序列构建二叉树

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

import java.util.HashMap;

/**
 * @description: BuildBinaryTree
 * @date: 2022/11/15 19:13
 * @author: zdp
 * @version: 1.0
 */
public class BuildBinaryTree {
    public static void main(String[] args) {
        int[] preorder = {1, 2, 5, 4, 6, 7, 3, 8, 9};
        int[] inorder = {5, 2, 6, 4, 7, 1, 8, 3, 9};
        TreeNode root = new BuildBinaryTree().buildTreeByPreIn(preorder, inorder);
        TreePrint treePrint = new TreePrint();
        System.out.println("preorder:");
        treePrint.preOrderPrint(root);
        System.out.println();
        System.out.println("inorder:");
        treePrint.inOrderPrint(root);
        System.out.println();
        System.out.println("postorder:");
        treePrint.postOrderPrint(root);
    }


    /*====================================================================================================*/


    public TreeNode buildTreeByPreIn(int[] preorder, int[] inorder) {
        TreeNode root = traversePreIn(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
        return root;
    }

    public TreeNode traversePreIn(int[] preorder, int preStart, int preEnd, int[] inorder, int inStart, int inEnd) {

        // base case
       
        if (preStart > preEnd) {
            return null;
        }
        // 获取前序的第一个，即根节点的值
        int rootVal = preorder[preStart];

        int index = 0;
        //找到中序遍历中的根节点的位置
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == rootVal) {
                index = i;
                break;
            }
        }
        // 求出左子树的大小
        int leftSize = index - inStart;
        // 构建根节点
        TreeNode root = new TreeNode(rootVal);

        root.left = traversePreIn(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
        root.right = traversePreIn(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
        return root;
    }

    /*====================================================================================================*/
    HashMap<Integer, Integer> valToIndex = new HashMap<>();

    /*
     * @Title: buildTreeByPreInMap
     * @Description: 使用HashMap定位根节点在中序遍历的位置
     * @Author: zdp
     * @DateTime: 2022/11/16 10:53
     * @param preorder
     * @param inorder
     * @return com.zhu.algorithms.leetcode.base.TreeNode
     * @throws
     */
    public TreeNode buildTreeByPreInMap(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            valToIndex.put(inorder[i], i);
        }
        TreeNode root = traversePreInUseMap(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
        return root;
    }
    public TreeNode traversePreInUseMap(int[] preorder, int preStart, int preEnd, int[] inorder, int inStart, int inEnd) {
        if (preStart > preEnd) {
            return null;
        }
        // 获取前序的第一个，即根节点的值
        int rootVal = preorder[preStart];

        int index = 0;
        //找到中序遍历中的根节点的位置
        index = valToIndex.get(rootVal);
        // 求出左子树的大小
        int leftSize = index - inStart;
        // 构建根节点
        TreeNode root = new TreeNode(rootVal);

        root.left = traversePreInUseMap(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
        root.right = traversePreInUseMap(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
        return root;
    }

}

```



## c++

```c
//
// Created by xiaoz on 2022/11/16.
//

#include <iostream>
#include "TreeNode.cpp"
#include <vector>
#include <unordered_map>
using namespace std;


class BuildTree {
public:

    TreeNode* buildTreeFromPreAndIn(vector<int>& preorder, vector<int>& inorder) {
        TreeNode* root = buildTraverse(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1);
        return root;
    }
    // vector<int>& preorder, vector<int>& inorder
    TreeNode* buildTraverse(vector<int>& preorder, int preStart, int preEnd, vector<int>& inorder, int inStart, int inEnd) {
        if (preStart > preEnd) {
            return nullptr;
        }
        int rootVal = preorder[preStart];
        int index = 0;
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == rootVal) {
                index = i;
                break;
            }
        }
        TreeNode* root = new TreeNode(rootVal);
        int leftSize = index - inStart;
        root->left = buildTraverse(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
        root->right = buildTraverse(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
        return root;
    }

    /*=========================================================================================================*/
    // unordered_map<int, int> index;
    unordered_map<int, int> valToIndex;
    TreeNode* buildTreeFromPreAndInMap(vector<int>& preorder, vector<int>& inorder) {

        for (int i = 0; i < inorder.size(); i++) {
            valToIndex[inorder[i]] = i;
        }
        TreeNode* root = buildTraverseMap(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1);
        return root;
    }
    // vector<int>& preorder, vector<int>& inorder
    TreeNode* buildTraverseMap(vector<int>& preorder, int preStart, int preEnd, vector<int>& inorder, int inStart, int inEnd) {
        if (preStart > preEnd) {
            return nullptr;
        }
        int rootVal = preorder[preStart];
        int index = 0;
        index = valToIndex[rootVal];

        TreeNode* root = new TreeNode(rootVal);
        int leftSize = index - inStart;
        root->left = buildTraverseMap(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);
        root->right = buildTraverseMap(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
        return root;
    }
};

```



## python

```python
class BuildTree:

    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        # len(preorder) == 0

        if not preorder:
            return None

        root = TreeNode(preorder[0])
        # 找到中序序列中根结点的下表
        index = inorder.index(root.val)
        # 得到左子树的大小
        leftSize = len(inorder[:index])

        # 新的序列[1, leftSize] 闭区间
        # 新构建一个List, 每次都是第二个元素也就是1为左边界，leftSize为右边界
        # 只有一个结点的时候，leftSize == 0 preorder[1:1]不存在
        root.left = self.buildTree(preorder[1:leftSize + 1], inorder[:index])
        root.right = self.buildTree(preorder[leftSize + 1:], inorder[index + 1:])

        return root

```



## Go

```go
func buildTreeFromPreAndIn(preorder []int, inorder []int) *TreeNode {
	root := buildTraverse(preorder, 0, len(preorder)-1, inorder, 0, len(inorder)-1)
	return root
}

func buildTraverse(preorder []int, preStart int, preEnd int, inorder []int, inStart int, inEnd int) *TreeNode {

	if preStart > preEnd {
		return nil
	}
	rootVal := preorder[preStart]

	var index int
	for i := inStart; i <= inEnd; i++ {
		if inorder[i] == rootVal {
			index = i
			break
		}
	}

	leftSize := index - inStart
	root := &TreeNode{rootVal, nil, nil}
	root.Left = buildTraverse(preorder, preStart+1, preStart+leftSize, inorder, inStart, index-1)
	root.Right = buildTraverse(preorder, preStart+leftSize+1, preEnd, inorder, index+1, inEnd)
	return root
}

// 以上是安装传统的编程语言的思路解决问题，下面的解法是利用golang语言的特性
/*=======================================================================================*/

func buildTree(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 {
		return nil
	}
	rootVal := preorder[0]
	root := &TreeNode{rootVal, nil, nil}

	i := 0
	// 在中序中找到根节点的位置i
	for ; i < len(inorder); i++ {
		if inorder[i] == rootVal {
			break
		}
	}
	// 新的前序从1开始，终止到len(inorder[:i])
	root.Left = buildTree(preorder[1:len(inorder[:i])+1], inorder[:i])
	root.Right = buildTree(preorder[len(inorder[:i])+1:], inorder[i+1:])
	return root
}

```

