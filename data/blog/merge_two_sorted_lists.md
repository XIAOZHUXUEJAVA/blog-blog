---
title: 合并两个有序的单链表
date: '2022-11-13'
tags: ['java', 'go', 'c++', 'python', 'datastructrue']
draft: false
summary: Merge Two Sorted Lists to a New Lists
---

## java

```java
package com.zhu.algorithms.leetcode.lists;

import com.zhu.algorithms.leetcode.base.ListNode;

/**
 * @description: MergeTwoSortedLists
 * @date: 2022/11/13 14:21
 * @author: zdp
 * @version: 1.0
 */
public class MergeTwoSortedLists {

    public static void main(String[] args) {
        MergeTwoSortedLists test = new MergeTwoSortedLists();
        ListNode node1 = new ListNode(1);
        ListNode node2 = new ListNode(3);
        ListNode node3 = new ListNode(5);
        ListNode node4 = new ListNode(7);
        ListNode node5 = new ListNode(9);

        node1.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;


        ListNode node6 = new ListNode(2);
        ListNode node7 = new ListNode(4);
        ListNode node8 = new ListNode(6);
        ListNode node9 = new ListNode( 8);
        ListNode node10 = new ListNode(10);

        node6.next = node7;
        node7.next = node8;
        node8.next = node9;
        node9.next = node10;


        ListNode newList = test.mergeTwoLists(node1, node6);
        newList.display();
    }

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode p1 = l1;
        ListNode p2 = l2;
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;

        while (p1 != null && p2 != null) {
            if (p1.val < p2.val) {
                p.next = p1;
                p1 = p1.next;
            } else {
                p.next = p2;
                p2 = p2.next;
            }
            p = p.next;
        }

        if (p1 == null) {
            p.next = p2;
        }

        if (p2 == null) {
            p.next = p1;
        }

        return dummy.next;
    }
}

```

## go

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {

	p1 := l1
	p2 := l2
	dummy := ListNode{-1, nil}
	p := &dummy

	for p1 != nil && p2 != nil {
		if p1.Val < p2.Val {
			p.Next = p1
			p1 = p1.Next
		} else {
			p.Next = p2
			p2 = p2.Next
		}
		p = p.Next
	}
	if p1 == nil {
		p.Next = p2
	}
	if p2 == nil {
		p.Next = p1
	}

	return dummy.Next

}


func TestMergeTwoSortedLists(t *testing.T) {
	node1 := ListNode{1, nil}
	node2 := ListNode{3, nil}
	node3 := ListNode{5, nil}
	node4 := ListNode{7, nil}
	node5 := ListNode{9, nil}

	node1.Next = &node2
	node2.Next = &node3
	node3.Next = &node4
	node4.Next = &node5

	node6 := ListNode{2, nil}
	node7 := ListNode{4, nil}
	node8 := ListNode{6, nil}
	node9 := ListNode{8, nil}
	node10 := ListNode{10, nil}

	node6.Next = &node7
	node7.Next = &node8
	node8.Next = &node9
	node9.Next = &node10

	merge := mergeTwoLists(&node1, &node6)

	display(merge)

}

```

## python3

```python
from typing import Optional

from data_algo.algo.lists.ListNode import ListNode


class MergeTwoSortedLists:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        p1 = l1
        p2 = l2
        dummy = ListNode(-1)
        p = dummy
        while p1 and p2:
            if p1.val < p2.val:
                p.next = p1
                p1 = p1.next
            else:
                p.next = p2
                p2 = p2.next

            p = p.next
        if p1 is None:
            p.next = p2
        if p2 is None:
            p.next = p1

        return dummy.next

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

    node6 = ListNode(2)
    node7 = ListNode(4)
    node8 = ListNode(6)
    node9 = ListNode(8)
    node10 = ListNode(10)

    node6.next = node7
    node7.next = node8
    node8.next = node9
    node9.next = node10

    test = MergeTwoSortedLists()

    merge = test.mergeTwoLists(node1, node6)
    merge.display()
```

## c++

```c
//
// Created by xiaoz on 2022/11/13.
//

#include <iostream>
using namespace std;
#include "ListNode.cpp"

class MergeTwoSortedLists {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* p1 = l1;
        ListNode* p2 = l2;

        ListNode* dummy = new ListNode(-1);
        ListNode* p = dummy;

        while (p1 != nullptr && p2 != nullptr) {
            if (p1->val < p2->val) {
                p->next = p1;
                p1 = p1->next;
            } else {
                p->next = p2;
                p2 = p2->next;
            }
            p = p->next;
        }

        if (p1 == nullptr) {
            p->next = p2;
        }
        if (p2 == nullptr) {
            p->next = p1;
        }
        return dummy->next;
    }
};



int main() {
    ListNode *node1 = new ListNode(1);
    ListNode *node2 = new ListNode(3);
    ListNode *node3 = new ListNode(5);
    ListNode *node4 = new ListNode(7);
    ListNode *node5 = new ListNode(9);

    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node5;

    ListNode *node6 = new ListNode(2);
    ListNode *node7 = new ListNode(4);
    ListNode *node8 = new ListNode(6);
    ListNode *node9 = new ListNode(8);
    ListNode *node10 = new ListNode(10);

    node6->next = node7;
    node7->next = node8;
    node8->next = node9;
    node9->next = node10;

    MergeTwoSortedLists test;
    ListNode* newList = test.mergeTwoLists(node1, node6);


    newList->display();


}
```
