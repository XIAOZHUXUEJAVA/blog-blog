---
title: 合并两个排序链表-----复习
date: '2023-01-29'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Review Merge Two Sorted Lists
---

## go

```go
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	p1 := l1
	p2 := l2

	dummy := ListNode{-1, nil}
	p := &dummy

	for p1 != nil && p2 != nil {
		if p1.Val > p2.Val {
			p.Next = p2
			p2 = p2.Next
		} else {
			p.Next = p1
			p1 = p1.Next
		}
		p = p.Next
	}
	if p1 != nil {
		p.Next = p1
	}
	if p2 != nil {
		p.Next = p2
	}
	return dummy.Next
}
```

## java

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode p1 = l1;
        ListNode p2 = l2;
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;
        while (p1 != null && p2 != null) {
            if (p1.val > p2.val) {
                p.next = p2;
                p2 = p2.next;
            } else {
                p.next = p1;
                p1 = p1.next;
            }
            p = p.next;
        }
        if (p1 != null) {
            p.next = p1;
        }
        if (p2 != null) {
            p.next = p2;
        }
        return dummy.next;
    }
```

## c++

```c
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* p1 = l1;
        ListNode* p2 = l2;
        ListNode* dummy = new ListNode(-1, nullptr);
        ListNode* p = dummy;

        while (p1 != nullptr && p2 != nullptr) {
            if (p1->val > p2->val) {
                p->next = p2;
                p2 = p2->next;
            } else {
                p->next = p1;
                p1 = p1->next;
            }
            p = p->next;
        }
        if (p1 != nullptr) {
            p->next = p1;
        }
        if (p2 != nullptr) {
            p->next = p2;
        }
        return dummy->next;
    }
```
