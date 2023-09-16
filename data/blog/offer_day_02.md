---
title: 剑指Offer-算法篇-Day02
date: '2023-03-12'
tags: ['java', 'offer']
draft: false
summary: For Job
---

## 从头到尾打印链表

直接使用递归即可，比较简单

**java**

```java
 List<Integer> res = new ArrayList<>();
    public int[] reversePrint(ListNode head) {
        traverse(head);
        int[] arr = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            arr[i] = res.get(i);
        }
        return arr;
    }


    public void traverse(ListNode head) {
        if (head == null) {
            return;
        }
        traverse(head.next);
        res.add(head.val);
    }
```

**go**

```go
var res []int

func reversePrint(head *ListNode) []int {
	res = make([]int, 0)
	traverse(head)
	return res
}

func traverse(head *ListNode) {
	if head == nil {
		return
	}
	traverse(head.Next)
	res = append(res, head.Val)
}

```

## 反转链表

这个题建议全文背诵

思路解析：这个题注意几个点即可, 代码注释很清楚

1. `pre` 初始化为`null`, 因为如果反转的话头结点会指向`null`
2. 最后返回的是`pre`, 因为`cur`最后为`null`了(遍历完了链表中的所有元素了)

**java**

```java
public ListNode reverseList(ListNode head) {

        ListNode pre = null;
        ListNode nxt = null;
        ListNode cur = head;
        while (cur != null) {
            // 1. 保存当前结点的next
            nxt = cur.next;
            // 2. cur.next 指向指向前驱结点
            cur.next = pre;
            // 3. 指针后移即可
            pre = cur;
            cur = nxt;
        }
        return pre;
    }
```

**go**

```go
func reverseList(head *ListNode) *ListNode {
    var pre *ListNode
    var nxt *ListNode
    cur := head
    for cur != nil {
        nxt = cur.Next
        cur.Next = pre
        pre = cur
        cur = nxt

    }
    return pre
}
```

## 复杂链表的复制

很巧妙地一道，看看注释

思路解析：我们不可以逐个遍历，因为有些结点的 Random 可能还没有创建

1. 对照着原链表，复制一个新的`next`全为空和`random`全为空的链表

2. 然后再遍历一次之后逐个连接即可

**java**

```java
 public Node copyRandomList(Node head) {
        HashMap<Node, Node> originToClone = new HashMap<>();
        Node p = head;
        // 对照着原链表，复制一个新的random全为空的链表
        while (p != null) {
            if (!originToClone.containsKey(p)) {
                originToClone.put(p, new Node(p.val));
            }
            p = p.next;
        }

        p = head;
        // 然后再遍历一次，连接起来即可
        // 如果只遍历一次的话，有些random可能还没有创建  比如  1 2 3 4 5  1 -> 5
        while (p != null) {
            if (p.next != null) {
                originToClone.get(p).next = originToClone.get(p.next);
            }
            if (p.random != null) {
                originToClone.get(p).random = originToClone.get(p.random);
            }
            p = p.next;
        }
     	// 返回的是head对应的，不是get()
        return originToClone.get(head);
    }

```

**go**

```go
func copyRandomList(head *Node) *Node {
    originToClone := make(map[*Node]*Node)

    for p := head; p != nil; p = p.Next {
        originToClone[p] = &Node{Val : p.Val}
    }

    for p := head; p != nil; p = p.Next {
        if p.Next != nil {
            originToClone[p].Next = originToClone[p.Next]
        }
        if p.Random != nil {
            originToClone[p].Random = originToClone[p.Random]
        }
    }
    return originToClone[head]
}
```
