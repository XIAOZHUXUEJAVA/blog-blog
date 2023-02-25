---
title: 反转链表II
date: '2023-02-26'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Reverse Linked Lists II
---

# 反转链表 II

## java

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode p = dummy;
        for (int i = 0; i < left - 1; i++) {
            p = p.next;
        }
        ListNode current = p.next;
        ListNode next = null;

        for (int i = 0; i < right - left; i++) {
            next = current.next;
            current.next = next.next;
            next.next = p.next;
            p.next = next;
        }

        return dummy.next;
    }
}
```

## go

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseBetween(head *ListNode, left, right int) *ListNode {
	dummy := &ListNode{-1, head}
	p := dummy
	for i := 0; i < left-1; i++ {
		p = p.Next
	}
	current := p.Next
	for i := 0; i < right-left; i++ {
		next := current.Next
		current.Next = next.Next
		next.Next = p.Next
		p.Next = next
	}
	return dummy.Next
}
```

## c++

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode* dummy = new ListNode(-1);
        dummy->next = head;
        ListNode* p = dummy;

        for (int i = 0; i < left - 1; i++) {
           p = p->next;
        }
        ListNode* current = p->next;
        ListNode* next;
        for (int i = 0; i < right - left; i++) {
            next = current->next;
            current->next = next->next;
            next->next = p->next;
            p->next = next;
        }
        return dummy->next;
    }
};
```
