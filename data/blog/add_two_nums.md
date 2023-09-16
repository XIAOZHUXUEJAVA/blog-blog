---
title: 两数相加
date: '2022-12-11'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Add Two Numbers
---

## java

```java


/**
 * @description: AddTwoNums
 * @date: 2022/12/9 22:59
 * @author: zdp
 * @version: 1.0
 */
public class AddTwoNums {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode p1 = l1;
        ListNode p2 = l2;
        // 使用虚拟结点
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;
        int carryDigit = 0;
        while (p1 != null || p2 != null || carryDigit > 0) {
            int current = carryDigit;
            if (p1 != null) {
                current += p1.val;
                p1 = p1.next;
            }
            if (p2 != null) {
                current += p2.val;
                p2 = p2.next;
            }
            // 以下是处理进位
            carryDigit = current / 10;
            current = current % 10;
            ListNode newNode = new ListNode(current);
            p.next = newNode;
            p = p.next;
        }
        return dummy.next;
    }
}

```

## go

```go
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	p1 := l1
	p2 := l2
	dummy := &ListNode{-1, nil}
	p := dummy
	carry := 0
	for p1 != nil || p2 != nil || carry > 0 {
		val := carry
		if p1 != nil {
			val += p1.Val
			p1 = p1.Next
		}
		if p2 != nil {
			val += p2.Val
			p2 = p2.Next
		}
		carry = val / 10
		val = val % 10
		p.Next = &ListNode{val, nil}
		p = p.Next
	}
	return dummy.Next

}

```

## c++

```c
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* p1 = l1;
        ListNode* p2 = l2;
        ListNode* dummy = new ListNode(-1);
        ListNode* p = dummy;
        int carry = 0;
        while (p1 || p2 || carry > 0) {
            int val = carry;
            if (p1) {
                val += p1->val;
                p1 = p1->next;
            }
            if (p2) {
                val += p2->val;
                p2 = p2->next;
            }
            carry = val / 10;
            val = val % 10;
            p->next = new ListNode(val);
            p = p->next;

        }
        return dummy->next;
    }
```
