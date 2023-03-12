---
title: 剑指Offer-Day02
date: '2023-03-12'
tags: ['java', 'offer']
draft: false
summary: For Job
---

# 剑指 Offer-Day02

## 从头到尾打印链表

直接使用递归即可，比较简单

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

## 反转链表

这个题建议全文背诵

```java
public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode nxt = null;
        ListNode cur = head;
        while (cur != null) {
            nxt = cur.next;
            cur.next = pre;
            pre = cur;
            cur = nxt;
        }
        return pre;

    }
```

## 复杂链表的复制

很巧妙地一道，看看注释

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
