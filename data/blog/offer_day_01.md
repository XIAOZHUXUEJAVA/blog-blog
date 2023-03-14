---
title: 剑指Offer-算法篇-Day01
date: '2023-03-11'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 剑指 Offer-Day01

## 用栈实现两个队列

```java
 class CQueue {
        private Stack<Integer> s1;
        private Stack<Integer> s2;

        public CQueue() {
            s1 = new Stack<>();
            s2 = new Stack<>();
        }

        // 排队的话直接插入s1即可
        public void push(int value) {
            s1.push(value);
        }
        public int peek() {
            // 将s1的排空 然后插入到s2，这样s2的栈顶就是我们s1第一个push的元素
            if (s2.isEmpty()) {
                while (!s1.isEmpty()) {
                    s2.push(s1.pop());
                }
            }
            return s2.peek();
        }
        public int pop() {
            // 队列为空直接返回 -1 即可
            if (empty()) {
                return -1;
            }
            // 首先调用peek() , 保证s2非空
            peek();
            return s2.pop();
        }

        // 判断队列是否为空
        public boolean empty() {
            return s1.isEmpty() && s2.isEmpty();
        }
    }
```

## 包含 min 函数的栈

```java
/**
 * @description: MinStack
 * @date: 2023/3/11 16:50
 * @author: zdp
 * @version: 1.0
 */
public class MinStack {

    private Stack<Integer> s1;
    // s2 当min的存储栈点
    private Stack<Integer> s2;

    public MinStack() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    public void push(int value) {
        s1.push(value);
        // s2 为空的话，或者新插入的元素比s2 peek小，更新s2
        if (s2.isEmpty() || value <= s2.peek()) {
            s2.push(value);
        }
    }

    public void pop() {
        // 正常pop s1的同时，如果是最小值的话（与s2中的元素大小相等）
        if (s1.pop().equals(s2.peek())) {
            s2.pop();
        }
    }

    public int top() {
        return s1.peek();
    }

    public int min() {
        return s2.peek();
    }
}

```

待完成：

- 用队列实现栈
- 包含 max 函数的栈
