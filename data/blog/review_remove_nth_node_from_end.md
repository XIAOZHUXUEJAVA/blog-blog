---
title: 删除链表中的倒数第N个结点-----复习
date: '2023-01-25'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Remove Nth Node From End
---

## java

```java
 public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode node = findNthFromEnd(dummy, n + 1);
        node.next = node.next.next;
        return dummy.next;
    }
    public ListNode findNthFromEnd(ListNode head, int n) {
        ListNode p = head;
        for (int i = 0; i < n; i++) {
            p = p.next;
        }
        ListNode p1 = head;
        while (p != null) {
            p1 = p1.next;
            p = p.next;
        }
        return p1;
    }
```

## go

```go
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{-1, head}
	node := findFromEnd(dummy, n+1)
	node.Next = node.Next.Next
	return dummy.Next
}
func findFromEnd(head *ListNode, n int) *ListNode {
	p := head
	for i := 0; i < n; i++ {
		p = p.Next
	}
	p1 := head
	for p != nil {
		p1 = p1.Next
		p = p.Next
	}
	return p1
}
```

## c++

```c
ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* node = findFromEnd(dummy, n + 1);
         node->next = node->next->next;
         return dummy->next;
    }
    ListNode* findFromEnd(ListNode* head, int n) {
        ListNode* p = head;
        for (int i = 0; i < n; i++) {
            p = p->next;
        }
        ListNode* p1 = head;
        while (p != nullptr) {
            p1 = p1->next;
            p = p->next;
        }
        return p1;
    }
```
