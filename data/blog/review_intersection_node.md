---
title: 相交链表-----复习
date: '2023-02-05'
tags: ['java', 'go', 'typescript', 'datastructrue', 'review']
draft: false
summary: Get Intersection Node
---

## java

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
   public ListNode getIntersectionNode(ListNode l1, ListNode l2) {
        ListNode p1 = l1;
        ListNode p2 = l2;
        int lenA = 0;
        int lenB = 0;

        while (p1 != null) {
            p1 = p1.next;
            lenA++;
        }
        while (p2 != null) {
            p2 = p2.next;
            lenB++;
        }
        p1 = l1;
        p2 = l2;
        if (lenA > lenB) {
            for(int i = 0; i < lenA - lenB; i++) {
                p1 = p1.next;
            }
        } else {
            for(int i = 0; i < lenB - lenA; i++) {
                p2 = p2.next;
            }
        }
        while (p1 != p2) {
            p1 = p1.next;
            p2 = p2.next;
        }
        return p1;
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
func getIntersectionNode(l1, l2 *ListNode) *ListNode {
	p1 := l1
	p2 := l2
	lenA := 0
	lenB := 0
	for p1 != nil {
		p1 = p1.Next
		lenA++
	}
	for p2 != nil {
		p2 = p2.Next
		lenB++
	}
	p1 = l1
	p2 = l2
	if lenA > lenB {
		for i := 0; i < lenA-lenB; i++ {
			p1 = p1.Next
		}
	} else {
		for i := 0; i < lenB-lenA; i++ {
			p2 = p2.Next
		}
	}
	for p1 != p2 {
		p1 = p1.Next
		p2 = p2.Next
	}
	return p1
}
```

## TypeSrcipt

```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function getIntersectionNode(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let p1: ListNode | null = l1
  let p2: ListNode | null = l2

  let lenA: number = 0
  let lenB: number = 0

  while (p1 !== null) {
    p1 = p1.next
    lenA++
  }
  while (p2 !== null) {
    p2 = p2.next
    lenB++
  }
  p1 = l1
  p2 = l2
  if (lenA > lenB) {
    for (let i: number = 0; i < lenA - lenB; i++) {
      // 如果p1为空，返回p1, 不为空返回p1.next
      // p1 = p1 && p1.next;
      p1 = p1!.next
    }
  } else {
    for (let i: number = 0; i < lenB - lenA; i++) {
      // p2 = p2 && p2.next;
      p2 = p2!.next
    }
  }
  while (p1 && p2 && p1 !== p2) {
    p1 = p1.next
    p2 = p2.next
  }
  return p1
}
```
