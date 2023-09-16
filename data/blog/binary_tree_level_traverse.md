---
title: 二叉树的层序遍历
date: '2022-11-24'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Binary Tree Level traverse
---

## java

```java
public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new LinkedList<>();
        if (root == null) {
            return res;
        }
        //
        // 层次遍历序列： 1 2 3 4 5 6
        Queue<TreeNode> q = new LinkedList<>();
        // 将根结点加入到新建的队列当中
        // add(1)
        q.add(root);
        while (!q.isEmpty()) {
            // 每一层结点的个数
            // size = 1
            int size = q.size();
            // 用于存储每层结点的值

            List<Integer> level = new LinkedList<>();
            // 每一个循环的内容对应每一层中的每个结点
            for (int i = 0; i < size; i++) {

                TreeNode current = q.poll();
                // level.add(1)
                level.add(current.val);
                // 下一层q.add(2, 3)
                if (current.left != null) {
                    q.add(current.left);
                }
                if (current.right != null) {
                    q.add(current.right);
                }
            }
            res.add(level);
        }
        return res;
    }
```

## go

```go
func levelOrder(root *TreeNode) [][]int {
	res := [][]int{}
	if root == nil {
		return res
	}
	// 新建一个队列，用于存储
	q := []*TreeNode{root}
	// 直到队列为空为止
	for len(q) > 0 {
		// 存储每一层的结点的值
		level := []int{}
		// size为当前层的结点的个数
		size := len(q)
		for i := 0; i < size; i++ {
			current := q[0]
			// 将结点加入到level
			level = append(level, current.Val)
			// poll出去
			q = q[1:]
			if current.Left != nil {
				q = append(q, current.Left)
			}
			if current.Right != nil {
				q = append(q, current.Right)
			}
		}
		res = append(res, level)

	}
	return res
}
```

## c++

```c
//
// Created by xiaoz on 2022/11/23.
//
#include <iostream>
#include "build_tree.cpp"
#include <queue>
using namespace std;

class LevelTraverse {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res = {};
        if (!root) {
            return res;
        }
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()) {
            int size = q.size();
            vector<int> level;
            for (int i = 0; i < size; i++) {
                TreeNode* current = q.front();
                q.pop();
                level.push_back(current->val);
                if (current->left) {
                    q.push(current->left);
                }
                if (current->right) {
                    q.push(current->right);
                }
            }
            res.push_back(level);
        }
        return res;
    }
};


int main() {
    BuildTree build;
    LevelTraverse test;
    vector<int> preorder = {1, 2, 5, 4, 6, 7, 3, 8, 9};
    vector<int> inorder = {5, 2, 6, 4, 7, 1, 8, 3, 9};
    TreeNode* root = build.buildTreeFromPreAndIn(preorder, inorder);
    vector<vector<int>> res = test.levelOrder(root);
    for (vector<int>item : res) {
        for (int i : item) {
            cout<<i;
        }
        cout<<endl;
    }
    return 0;
}

```

## python

```python
from typing import Optional, List

from data_algo.algo.tree.TreeNode import TreeNode
from data_algo.algo.tree.build_tree import BuildTree


class BinaryTreeLevelTraverse:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if root is None:
            return []
        queue = [root]
        res = []
        # 每一次while循环就是一层
        # 纵向
        while queue:
            level = []
            size = len(queue)
            # 所有的for循环是每一层中的内容
            # 横向
            for i in range(size):
                current = queue[0]
                level.append(current.val)
                queue.pop(0)
                # queue.pop() 这是默认返回最后一个
                if current.left is not None:
                    queue.append(current.left)
                if current.right is not None:
                    queue.append(current.right)
            res.append(level)
        return res

if __name__ == "__main__":
    # 创建一棵树
    preorder = (1, 2, 5, 4, 6, 7, 3, 8, 9)
    inorder = (5, 2, 6, 4, 7, 1, 8, 3, 9)
    build = BuildTree()
    tree = build.buildTree(preorder, inorder)
    test = BinaryTreeLevelTraverse()
    levelRes = test.levelOrder(tree)
    print(levelRes)
```
