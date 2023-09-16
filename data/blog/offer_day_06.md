---
title: 剑指Offer-算法篇-Day06
date: '2023-03-16'
tags: ['java', 'offer']
draft: false
summary: For Job
---

## 从上到下打印二叉树 I

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int[] levelOrder(TreeNode root) {



        if (root == null) {
            return new int[0];
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        List<Integer> list = new LinkedList<>();

        while (!queue.isEmpty()) {
            int size = queue.size();

            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                list.add(current.val);
                if (current.left != null) {
                    queue.add(current.left);
                }
                if (current.right != null) {
                    queue.add(current.right);
                }
            }
        }
        int[] resArray = new int[list.size()];
        int count = 0;
        for (int value : list) {
            resArray[count++] = value;
        }
        return resArray;
    }
}
```

## 从上到下打印二叉树 II

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {

        List<List<Integer>> res = new LinkedList<>();
        if (root == null) {
            return res;
        }
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            List<Integer> level = new LinkedList<>();
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                level.add(current.val);
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            res.add(level);
        }
        return res;
    }
}
```

## 从上到下打印二叉树 III

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new LinkedList<>();

        if (root == null) {
            return res;
        }
        boolean flag = true; // true 往右 false 为 向左
        Queue<TreeNode> queue = new LinkedList<>();

        queue.offer(root);

        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> level = new LinkedList<>();


            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                if (flag) {
                    level.addLast(current.val);
                } else {
                    level.addFirst(current.val);
                }

                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            res.add(level);
            flag = !flag;
        }
        return res;
    }
}
```
