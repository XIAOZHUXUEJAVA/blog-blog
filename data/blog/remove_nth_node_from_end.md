---
title: 删除链表中的倒数第N个结点
date: '2022-12-17'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary:
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
    /*
     * @Title: findNthFromEnd
     * @Description: 找到我们要删除的结点
     * @Author: zdp
     * @DateTime: 2022/12/16 22:57
     * @param head
     * @param n
     * @return com.zhu.algorithms.leetcode.base.ListNode
     * @throws
     */
    public ListNode findNthFromEnd(ListNode head, int n) {
        ListNode p = head;
        // 1 2 3 4 5
        // 我们要找到倒数第2个元素的话，需要走3步，走5步到达null, 也就是说我们走5 - 2 步
        // 首先走2步
        for (int i = 0; i < n; i++) {
            p = p.next;
        }
        // 然后重新走 p 走到null 的时候,需要走3步，正好就是我们需要的。我们新的指针p1也就走到我们所求的地方
        ListNode p1 = head;
        while (p != null) {
            p = p.next;
            p1 = p1.next;
        }
        return p1;
    }
```

## go

```go
func removeNthFromEnd(head *ListNode, n int) *ListNode {
	dummy := &ListNode{-1, head}
	node := findNthFromEnd(dummy, n + 1)
	node.Next = node.Next.Next
	return dummy.Next
}
func findNthFromEnd(head *ListNode, n int) *ListNode {
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
        while (p) {
            p = p->next;
            p1= p1->next;
        }
        return p1;
    }
```
