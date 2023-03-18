---
title: 剑指Offer-算法篇-Day01
date: '2023-03-11'
tags: ['java', 'go', 'offer']
draft: false
summary: For Job
---

# 剑指 Offer-Day01

## 用栈实现两个队列

思路分析：

1. `CQueue()`: 首先需要有传统的栈结构，可以自己写，也可以调用相关的库。定义两个栈，一个为进栈 s1，一个为出栈 s2。
2. `push()`: 进栈 push 为队列的 offer, 出栈从栈顶`pop()`, 最终栈顶压入出栈的栈底，因此出栈的`pop()`就是我们进栈`push()`的第一个元素。
3. `peek()`: 队首元素为出栈的栈顶，只有进栈全为空的情况下才能得到队列的队首。
4. `empty()`: 两个栈都为空则整个队列为空。
5. `pop()`: 必须确保栈中存在元素才能`pop()`, 并且确保 s2 为空，因此调用`peek()`清空进栈

**java**

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

**go**

```go
// 创建栈结构
type stack []int

func (s *stack) Push(value int) {
	*s = append(*s, value)
}

func (s *stack) Pop() int {
	n := len(*s)
	el := (*s)[n-1]
	*s = (*s)[:n-1]
	return el
}

type CQueue struct {
	inStack  stack
	outStack stack
}

func Constructor() CQueue {
	return CQueue{}
}

func (self *CQueue) AppendTail(value int) {
	self.inStack.Push(value)
}

func (self *CQueue) DeleteHead() int {
	if self.isEmpty() {
		return -1
	}
	if len(self.outStack) == 0 {
		for len(self.inStack) != 0 {
			self.outStack.Push(self.inStack.Pop())
		}
	}
	return self.outStack.Pop()
}

func (self *CQueue) isEmpty() bool {
	return len(self.inStack) == 0 && len(self.outStack) == 0
}
```

## 包含 min 函数的栈

思路分析：其实和上一个题类似，创建一个辅助栈, s1 为 Base 基础栈点，s2 为辅助 Min 栈点，栈顶存储 Base 栈中的最小值

1. `push()`: 元素入栈时，直接入 Base 即可，但是如果这个元素比辅助 Min 栈点的栈顶小的话，我们就要更新 Min 栈
2. `pop()`: 类比一下，正常 pop 出 Base 中的栈顶元素，同时和 Min 的栈顶元素比较，如果相等说明 pop 出去的就是栈中的最小元素，所以更新 Min 栈
3. `min()`: 为当前 Base 栈中的最小值, 即 Min 栈中的栈顶
4. `top()`: Base 栈中的栈顶

**java**

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

**go**

```go

type stack1 []int

func (self *stack1) Push(value int) {
	*(self) = append(*self, value)
}

func (self *stack1) Pop() int {
	n := len(*self)
	el := (*self)[n-1]
	*self = (*self)[:n-1]
	return el
}

type MinStack struct {
	Base    stack1
	MinBase stack1
}

func Constructor() MinStack {
	return MinStack{}
}

func (self *MinStack) Push(value int) {
	self.Base.Push(value)
	if len(self.MinBase) == 0 || value <= self.MinBase[len(self.MinBase)-1] {
		self.MinBase.Push(value)
	}
}
func (self *MinStack) Pop() {

	if self.MinBase[len(self.MinBase)-1] == self.Base.Pop() {
		self.MinBase.Pop()
	}
}
func (self *MinStack) Top() int {
	return self.Base[len(self.Base)-1]
}
func (self *MinStack) Min() int {
	return self.MinBase[len(self.MinBase)-1]
}
```

待完成：

- 用队列实现栈
- 包含 max 函数的栈
