---
title: 求二叉树的最大深度和直径
date: '2022-11-20'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Max Depth And Diameter In Binary Tree
---





# MaxDepthInTree



## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: MaximumDepthOfBinaryTree
 * @date: 2022/11/15 18:48
 * @author: zdp
 * @version: 1.0
 */
public class MaximumDepthOfBinaryTree {
    public static void main(String[] args) {

    }

    /*==================================使用遍历的方式======================================*/

    int res = 0;
    int depth = 0;
    public int maxDepth(TreeNode root) {
        traverse(root);
        return res;
    }

    public void traverse(TreeNode root) {
        if (root == null) {
            return;
        }
        depth++;
        if (root.left == null && root.right == null) {
            res = Math.max(depth, res);
        }
        traverse(root.left);
        traverse(root.right);
        depth--;
    }



    /*===================================使用分解问题的方式，最大深度是左子树的最大深度和右子树的最大深度的其中之一=====================================*/


    public int maxDepthUseDecompose(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int leftMaxDepth = maxDepthUseDecompose(root.left);
        int rightMaxDepth = maxDepthUseDecompose(root.right);
        // 不要忘记加上根结点的深度
        int max = Math.max(leftMaxDepth, rightMaxDepth) + 1;
        return max;
    }

}

```





## python

```python
from typing import Optional

from data_algo.algo.lists.TreeNode import TreeNode
from data_algo.algo.lists.build_tree import BuildTree


class MaxDepthInTree:

    result = 0
    depth = 0
    def depthTraverse(self, root: Optional[TreeNode]):
        global result
        global depth
        if root is None:
            return
        depth += 1
        if root.left is None and root.right is None:
            result = max(depth, result)
        self.depthTraverse(root.left)
        self.depthTraverse(root.right)
        depth -= 1

    def maxDepthUseTraverse(self, root: Optional[TreeNode]) -> int:
        global result
        global depth
        result = 0
        depth = 0
        self.depthTraverse(root)
        return result


    def maxDepthUseDecompose(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        leftMax = self.maxDepthUseDecompose(root.left)
        rightMax = self.maxDepthUseDecompose(root.right)
        res = max(leftMax, rightMax) + 1
        return res

if __name__ == "__main__":
    # preorder = (1, 2, 5, 4, 6, 7, 3, 8, 9)
    # inorder = (5, 2, 6, 4, 7, 1, 8, 3, 9)
    preorder = (1, 2)
    inorder = (1, 2)
    build = BuildTree()
    tree = build.buildTree(preorder, inorder)
    test = MaxDepthInTree()
    depth = test.maxDepthUseTraverse(tree)
    print(depth)

```





## go

```go
package tree

import (
	"math"
)

func maxDepthUseDecompose(root *TreeNode) int {
	if root == nil {
		return 0
	}
	leftDepth := maxDepthUseDecompose(root.Left)
	rightDepth := maxDepthUseDecompose(root.Right)
	maxDepth := (int)(math.Max(float64(leftDepth), float64(rightDepth)) + 1)
	return maxDepth
}

/*====================================使用遍历的方式======================================*/
var depth int
var res int

func traverseDepth(root *TreeNode) {
	if root == nil {
		return
	}
	depth++
	if root.Left == nil && root.Right == nil {
		res = Max(res, depth)
	}

	traverseDepth(root.Left)
	traverseDepth(root.Right)
	depth--
}

func maxDepth(root *TreeNode) int {
	res = 0
	depth = 0
	traverseDepth(root)
	return res
}

func Max(num1, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}

```





## c++

```c
//
// Created by xiaoz on 2022/11/18.
//

#include <iostream>
#include "build_tree.cpp"
#include <cmath>
using namespace std;

class MaxDepthInTree {
public:
    int depth = 0;
    int res = 0;
    int maxDepthUseTraverse(TreeNode* root) {
        depthTraverse(root);
        return res;
    }

    void depthTraverse(TreeNode* root) {
        if (root == nullptr) {
            return;
        }
        depth++;
        if (root->left == nullptr && root->right == nullptr) {
            res = max(res, depth);
        }
        depthTraverse(root->left);
        depthTraverse(root->right);
        depth--;
    }

    /*===========================================================*/
    int maxDepthUseDecompose(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }
        int leftDepth = maxDepthUseDecompose(root->left);
        int rightDepth = maxDepthUseDecompose(root->right);
        return max(leftDepth, rightDepth) + 1;
    }


};

int main() {

    BuildTree build;
    MaxDepthInTree test;
    vector<int> preorder = {1, 2, 5, 4, 6, 7, 3, 8, 9};
    vector<int> inorder = {5, 2, 6, 4, 7, 1, 8, 3, 9};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    int depth1= test.maxDepthUseDecompose(root);
    int depth2 = test.maxDepthUseTraverse(root);
    cout<<depth1<<endl;
    cout<<depth2<<endl;
    return 0;
}
```



# MaxDiameterInTree

## java

```java
package com.zhu.algorithms.leetcode.tree;

import com.zhu.algorithms.leetcode.base.TreeNode;

/**
 * @description: MaxDiameterOfBinaryTree
 * @date: 2022/11/20 19:16
 * @author: zdp
 * @version: 1.0
 */
public class MaxDiameterOfBinaryTree {
    public static void main(String[] args) {
        int[] preorder = {1, 2, 5, 4, 6, 7, 3, 8, 9};
        int[] inorder = {5, 2, 6, 4, 7, 1, 8, 3, 9};
        BuildBinaryTree buildTree = new BuildBinaryTree();
        TreeNode root = buildTree.buildTreeByPreIn(preorder, inorder);
        int diameter = new MaxDiameterOfBinaryTree().maxDiameterOfBinaryTree(root);
        System.out.println(diameter);
    }

    int maxDiameter = 0;
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int leftMax = maxDepth(root.left);
        int rightMax = maxDepth(root.right);
        int myDiameter = leftMax + rightMax;
        maxDiameter = Math.max(myDiameter, maxDiameter);
        int max = Math.max(leftMax, rightMax) + 1;
        return max;
    }
    public int maxDiameterOfBinaryTree(TreeNode root) {
        maxDepth(root);
        return maxDiameter;
    }
}

```



## python

```python
from typing import Optional

from data_algo.algo.lists.TreeNode import TreeNode
from data_algo.algo.lists.build_tree import BuildTree


class DiameterOfBinaryTree:

    maxDiameter = 0
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        global maxDiameter
        if root is None:
            return 0
        leftMax = self.maxDepth(root.left)
        rightMax = self.maxDepth(root.right)
        myDiameter = leftMax + rightMax
        maxDiameter = max(myDiameter, maxDiameter)
        maxDepth = max(leftMax, rightMax) + 1
        return maxDepth
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        global maxDiameter
        maxDiameter = 0
        maxDiameter = 0
        self.maxDepth(root)
        return maxDiameter

if __name__ == "__main__":
    preorder = (1, 2, 5, 4, 6, 7, 3, 8, 9)
    inorder = (5, 2, 6, 4, 7, 1, 8, 3, 9)
    build = BuildTree()
    tree = build.buildTree(preorder, inorder)
    test = DiameterOfBinaryTree()
    maxDiameter = test.diameterOfBinaryTree(tree)
    print(maxDiameter)
```



## go

```go
package tree

var maxDiameter int

func diameterOfBinaryTree(root *TreeNode) int {
	maxDiameter = 0
	maxDepthToDiameter(root)
	return maxDiameter
}

func maxDepthToDiameter(root *TreeNode) int {

	if root == nil {
		return 0
	}
	leftMax := maxDepthToDiameter(root.Left)
	rightMax := maxDepthToDiameter(root.Right)
	myDiameter := leftMax + rightMax
	maxDiameter = MaxToDiameter(maxDiameter, myDiameter)
	depth := MaxToDiameter(leftMax, rightMax) + 1
	return depth
}

func MaxToDiameter(num1, num2 int) int {
	if num1 > num2 {
		return num1
	}
	return num2
}

```



## c++

```c
//
// Created by xiaoz on 2022/11/20.
//

#include <iostream>

#include "build_tree.cpp"
#include <cmath>
using namespace std;

class DiameterOfBinaryTree {
public:
    int maxDiameter = 0;
    int diameterOfBinaryTree(TreeNode* root) {
        maxDepthToDiameter(root);
        return maxDiameter;
    }
    int maxDepthToDiameter(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }
        int maxLeft = maxDepthToDiameter(root->left);
        int maxRight = maxDepthToDiameter(root->right);
        int myDiameter = maxLeft + maxRight;
        maxDiameter = max(myDiameter, maxDiameter);
        int depth = max(maxLeft, maxRight) + 1;
        return depth;
    }
};





int main() {

    BuildTree build;
    DiameterOfBinaryTree test;
    vector<int> preorder = {1, 2, 5, 4, 6, 7, 3, 8, 9};
    vector<int> inorder = {5, 2, 6, 4, 7, 1, 8, 3, 9};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    int diameter = test.diameterOfBinaryTree(root);
    cout<<diameter;
    return 0;
}
```

