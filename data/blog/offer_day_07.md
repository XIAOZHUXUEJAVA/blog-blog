---
title: 剑指Offer-算法篇-Day07
date: '2023-03-17'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 剑指 Offer-算法篇-Day07

## 二叉树的子结构

思路分析：一个二叉树(B)为另一个二叉树(A)的子结构，无非有两种情况：

1. A 和 B 为同根(这里指代根结点的值相同), 然后对比两个二叉树的左右子树
   ![20230318140957](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/20230318140957.png)
2. B 为 A 左右子树上的一部分
   ![20230318141105](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/20230318141105.png)

```java

class Solution {
    public boolean isSubStructure(TreeNode A, TreeNode B) {
        // A为空当然不可以， 但是B为空的话题目有规定，空子树不是任何一个树的子结构
        if (A == null || B == null) {
            return false;
        }

        // A和B都不为空的情况下
        // 1. A和B为同根(这里指代根结点的值相同), 然后对比两个二叉树的左右子树
        if (helper(A, B)) {
            return true;
        }
        // 2. B为A左右子树上的一部分
        return isSubStructure(A.left, B) || isSubStructure(A.right, B);

    }
    public boolean helper(TreeNode root1, TreeNode root2) {

        // 说明root2已经遍历完了，为空则root2为root1的子结构
        if (root2 == null) {
            return true;
        }

        // 说明root1已经被遍历完了, root1先被遍历完的话，root2不可能为root1的子结构
        if (root1 == null) {
            return false;
        }

        // 判断两个结点的数值
        if (root1.val != root2.val) {
            return false;
        }

        // 递归两个数的左右子树
        return helper(root1.left, root2.left) && helper(root1.right, root2.right);
    }
}
```

## 二叉树的镜像

思路分析：很简单直接交换两个子树，然后遍历两个子树

**java**

```java
class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        traverse(root);
        return root;
    }
    // 遍历的思路
    public void traverse(TreeNode root) {
        if (root == null) {
            return;
        }
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        traverse(root.left);
        traverse(root.right);

    }
}
```

**go**

```go
func mirrorTree(root *TreeNode) *TreeNode {
	mirrorTreeTraverse(root)
	return root
}

func mirrorTreeTraverse(root *TreeNode) {
	if root == nil {
		return
	}

	temp := root.Right
	root.Right = root.Left
	root.Left = temp
	mirrorTreeTraverse(root.Left)
	mirrorTreeTraverse(root.Right)
}
```

## 对称二叉树

思路分析：其实就是分为四个步骤:

1. 如果左右节点中有一个为空，有一个不为空，说明这两个节点不对称，返回 false。
   如果两个节点都为空，说明这个子树已经判断完毕，返回 true。

2. 如果左右节点的值不相等，说明这两个节点不对称，返回 false。

3. 否则，递归地判断左子树的右子树和右子树的左子树是否对称，以及左子树的左子树和右子树的右子树是否对称。

4. 主方法传入左右子树即可

**java**

```java
   public boolean isSymmetric(TreeNode root) {

        if (root == null) {
            return true;
        }
        return check(root.left, root.right);
    }
    public boolean check(TreeNode left, TreeNode right) {
        if (left == null || right == null) {
            if (left == null && right == null) {
                return true;
            }
            return false;
        } else if (left.val != right.val) {
            return false;
        }
        return check(left.right, right.left) && check(left.left, right.right);

    }
```

**go**

```go
func isSymmetric(root *TreeNode) bool {
	if root == nil {
		return true
	}
	return check(root.Left, root.Right)
}

func check(left *TreeNode, right *TreeNode) bool {
	if left == nil || right == nil {
		if left == nil && right == nil {
			return true
		}
		return false
	}
	if left.Val != right.Val {
		return false
	}
	return check(left.Left, right.Right) && check(left.Right, right.Left)
}
```
