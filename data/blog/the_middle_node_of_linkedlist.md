---
title: 找到单链表中结点的中点
date: '2022-11-08'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: To Find The Middle Node From Singly Linked List
---


# 链表的中间结点实现

## java

```java
package com.zhu.algorithms.leetcode.lists;


import com.zhu.algorithms.leetcode.base.ListNode;

import java.util.List;

/**
 * @description: FindMiddleNode
 * @date: 2022/11/9 19:25
 * @author: zdp
 * @version: 1.0
 */
public class FindMiddleNode {
    public static void main(String[] args) {
        FindMiddleNode test = new FindMiddleNode();
        ListNode node1 = new ListNode(1);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(3);
        ListNode node4 = new ListNode(4);
        ListNode node5 = new ListNode(5);

        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;

        node1.display();
        int val = test.middleNode(node1).val;

        System.out.println(val);
    }


    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}

```

## go

```go
func middleNode(head *ListNode) *ListNode {
	slow := head
	fast := head

	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	return slow
}



func TestFindMiddleNode(t *testing.T) {
	node1 := ListNode{1, nil}
	node2 := ListNode{2, nil}
	node3 := ListNode{3, nil}
	node4 := ListNode{4, nil}
	node5 := ListNode{5, nil}

	node1.Next = &node2
	node2.Next = &node3
	node3.Next = &node4
	node4.Next = &node5

	display(&node1)
	middle := middleNode(&node1)
	fmt.Println(middle.Val)
}
```



## c++

```c
//
// Created by xiaoz on 2022/11/9.
//


#include <iostream>
#include "ListNode.cpp"
using namespace std;


class FindMiddleNode{
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head;
        ListNode *fast = head;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        return slow;
    }
};



int main() {
    ListNode *node1 = new ListNode(1);
    ListNode *node2 = new ListNode(2);
    ListNode *node3 = new ListNode(3);
    ListNode *node4 = new ListNode(4);
    ListNode *node5 = new ListNode(5);

    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    node1->display();


    FindMiddleNode test;
    ListNode *middle = test.middleNode(node1);

    cout<<middle->val;

}
```



## python

```py
from typing import Optional

from data_algo.algo.lists.ListNode import ListNode


class FindMiddleNode:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow


if __name__ == "__main__":
    node1 = ListNode(1)
    node2 = ListNode(2)
    node3 = ListNode(3)
    node4 = ListNode(4)
    node5 = ListNode(5)

    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node5

    node1.display()

    test = FindMiddleNode()
    middle = test.middleNode(node1)
    print(middle.val)

```

