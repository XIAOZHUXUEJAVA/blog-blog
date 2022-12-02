---
title: 验证二叉搜索树的合法性
date: '2022-12-02'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Validate BST
---

# Validate BST

## java



```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

import java.util.ArrayList;

/**
 * @description: ValidateBST
 * @date: 2022/11/29 14:11
 * @author: zdp
 * @version: 1.0
 */
public class ValidateBST {
    public static void main(String[] args) {
        int[] preorder = {5, 1, 4, 3, 6};
        int[] inorder = {1, 5, 3, 4, 6};
        TreeNode root   = new BuildBinaryTree().buildTreeByPreIn(preorder, inorder);
        ValidateBST test = new ValidateBST();
        System.out.println(test.isValidBST(root));
        System.out.println(test.isValidBSTByArray(root));
    }

    ArrayList<Integer> list = new ArrayList<>();
    public void detectHelper(TreeNode root) {
        if (root == null) {
            return;
        }
        detectHelper(root.left);
        list.add(root.val);
        detectHelper(root.right);
    }
    /*
     * @Title: isValidBSTByArray
     * @Description: 利用二叉排序树的性质，中序遍历有序，转化为list之后判断数组是否有序
     * @Author: zdp
     * @DateTime: 2022/11/30 14:00
     * @param root
     * @return boolean
     * @throws
     */
    public boolean isValidBSTByArray(TreeNode root) {
        detectHelper(root);
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i) <= list.get(i - 1)) {
                return false;
            }
        }
        return true;
    }
    
    /*=============================================================================================*/
    
    /*
     * @Title: isValidBST
     * @Description: 使用递归的方法
     * @Author: zdp
     * @DateTime: 2022/11/30 13:47
     * @param root
     * @return boolean
     * @throws
     */
    public boolean isValidBST(TreeNode root) {
        return traverse(root, null, null);
    }
    public boolean traverse(TreeNode root, TreeNode min, TreeNode max) {
        if (root == null) {
            return true;
        }
        // 如果max不为空，并且左边的值有大于max的，说明不是二叉搜素树
        if (max != null && root.val >= max.val) {
            return false;
        }
        // 如果min不为空，并且右边的值有小于min的，说明不是二叉搜索树
        if (min != null && root.val <= min.val) {
            return false;
        }
        // 更新左边的最大和右边的最小即可
        return traverse(root.left, min, root) && traverse(root.right, root, max);
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
// Created by xiaoz on 2022/12/1.
//
#include <iostream>
#include "build_tree.cpp"
using namespace std;

class ValidateBST {


vector<int> list;
private:
    void traverse(TreeNode* root) {
        if (root == nullptr) {
            return;
        }
        traverse(root->left);
        list.push_back(root->val);
        traverse(root->right);
    }
    bool validateHelper(TreeNode* root, TreeNode* min, TreeNode* max) {
        if (root == nullptr) {
            return true;
        }
        if (min != nullptr && root->val <= min->val) {
            return false;
        }
        if (max != nullptr && root->val >= max->val) {
            return false;
        }
        return validateHelper(root->left, min, root) && validateHelper(root->right, root, max);
    }
public:
    bool isValidBSTByVec(TreeNode* root) {
        list.clear();
        traverse(root);
        for (int i = 1; i < list.size(); i++) {
            if (list[i - 1] >= list[i]) {
                return false;
            }
        }
        return true;
    }

    bool isValidBST(TreeNode* root) {
        return validateHelper(root, nullptr, nullptr);
    }

};


int main() {
    return 0;
}
```



## python

```python
from typing import Optional

from data_algo.algo.tree.TreeNode import TreeNode


class ValidateBST:

    list = []
    def validateHelper(self, root: Optional[TreeNode]):
        global list
        if root is None:
            return
        self.validateHelper(root.left)
        list.append(root.val)
        self.validateHelper(root.right)
    def isValidBSTByArray(self, root: Optional[TreeNode]) -> bool:
        global list
        list = []
        self.validateHelper(root)
        for i in range(len(list) - 1):
            if list[i + 1] <= list[i]:
                return False
        return True



    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return self.traverse(root, None, None)

    def traverse(self, root, min, max: Optional[TreeNode]) -> bool:
        if root is None:
            return True
        if min is not None and root.val <= min.val:
            return False
        if max is not None and root.val >= max.val:
            return False
        return self.traverse(root.left, min, root) and self.traverse(root.right, root, max)
```

