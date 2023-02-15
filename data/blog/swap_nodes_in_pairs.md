---
title: 两两交换链表中的结点
date: '2023-02-14'
tags: ['java', 'go', 'datastructrue']
draft: false
summary: Swap Nodes in Pairs
---

# 两两交换链表中的结点

## java

```java
public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode p = dummy;
        while (p.next != null && p.next.next != null) {
            ListNode p1 = p.next;
            ListNode p2 = p.next.next;
            p.next = p2;
            p1.next = p2.next;
            p2.next = p1;
            p = p1;
        }
        return dummy.next;
    }
```

## go

```go
func swapPairs(head *ListNode) *ListNode {
	dummy := &ListNode{-1, head}
	p := dummy
	for p.Next != nil && p.Next.Next != nil {
		p1 := p.Next
		p2 := p.Next.Next

		p.Next = p2
         p1.Next = p2.Next
		p2.Next = p1


		p = p1

	}
	return dummy.Next
}
```

## c++

```c
 ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* p = dummy;
        while (p->next && p->next->next) {
            ListNode* p1 = p->next;
            ListNode* p2 = p->next->next;
            p->next = p2;
            p1->next = p2->next;
            p2->next = p1;
            p = p1;
        }
        return dummy->next;
    }
```
