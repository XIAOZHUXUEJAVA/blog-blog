---
title: SinglyLinkedList in Java
date: '2023-08-14'
tags: ['java', 'datastructrue']
draft: false
summary: The Implementation of SinglyLinkedList in Java
---

# SinglyLinkedList

SinglyLinkedList is a classic data structure in computer science. The following is my implementation in Java. It provides various operations such as inserting and deleting node at specified position, checking whether the list has cycle, and searching for node by specified position.

```java
package com.zhu.algorithms.datastructure.lists;

import com.zhu.algorithms.datastructure.base.Node;

import javax.swing.*;
import java.util.StringJoiner;

/**
 * @description: SinglyLinkedList
 * @date: 2023/5/28 13:48
 * @author: zdp
 * @version: 1.0
 */
public class SinglyLinkedList {

    /**
     * the head of SinglyLinkedList
     */
    public Node head;

    /**
     * the size/length of SinglyLinkedList
     */
    public int size;


    public SinglyLinkedList(Node head, int size) {
        this.head = head;
        this.size = size;
    }

    public SinglyLinkedList(Node head) {
        this.head = head;
        this.size = 0;
    }

    public SinglyLinkedList() {
        this.head = null;
        this.size = 0;
    }

    /*
     * @Title: count
     * @Description: The count/length/size of SinglyLinkedList
     * @Author: zdp
     * @DateTime: 2023/8/14 16:58
     * @param
     * @return int
     * @throws
     */
    public int count() {
        Node current = this.head;
        int count = 0;
        while (current != null) {
            count++;
            current = current.next;
        }
        return count;
    }


    /*
     * @Title: toString
     * @Description: To display the value of each node in SinglyLinkedList
     * @Author: zdp
     * @DateTime: 2023/8/14 16:59
     * @param
     * @return java.lang.String
     * @throws
     */
    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("->");
        Node current = head;
        while (current != null) {
            joiner.add(current.value + "");
            current = current.next;
        }
        return joiner.toString();
    }


    /*
     * @Title: checkBounds
     * @Description: check whether the input position out of bounds
     * @Author: zdp
     * @DateTime: 2023/8/14 17:24
     * @param position
     * @param low
     * @param high
     * @return void
     * @throws
     */
    public void checkBounds(int position, int low, int high) {
        if (position < low || position > high) {
            throw new IndexOutOfBoundsException(position + " out of bounds");
        }
    }


    public void insertHead(int value) {
        insertNth(value, 0);
    }

    public void insertTail(int value) {
        insertNth(value, size);
    }

    public void deleteHead() {
        deleteNth(0);
    }

    public void deleteTail() {
        deleteNth(size - 1);
    }


    /*
     * @Title: deleteNth
     * @Description: delete the Node at the input position
     * @Author: zdp
     * @DateTime: 2023/8/14 17:26
     * @param position
     * @return void
     * @throws
     */
    public void deleteNth(int position) {
        checkBounds(position, 0, size - 1);
        if (position == 0) {
            Node destroy = head;
            head = head.next;
            destroy = null;
            size--;
            return;
        }
        Node current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current.next;
        }

        Node destroy = current.next;
        // connect the previous node of deletednode and the next node of deletednode
        current.next = current.next.next;
        destroy = null;
        size--;
    }

    /*
     * @Title: insertNth
     * @Description: insert a new Node at the input position
     * @Author: zdp
     * @DateTime: 2023/8/14 17:26
     * @param value
     * @param position
     * @return void
     * @throws
     */
    public void insertNth(int value, int position) {
        checkBounds(position, 0, size);
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            size++;
            return;
        }
        if (position == 0) {
            newNode.next = head;
            head = newNode;
            size++;
            return;
        }
        Node current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }

    public boolean isEmpty() {
        return this.size == 0;
    }

    /*
     * @Title: searchNodeByPosition
     * @Description: search for Node with specified position
     * @Author: zdp
     * @DateTime: 2023/8/14 17:29
     * @param position
     * @return Node
     * @throws
     */
    public Node searchNodeByPosition(int position) {
        if (isEmpty()) {
            System.out.println("the list is empty");
            return null;
        }
        checkBounds(position, 0, size - 1);
        Node current = head;
        for (int i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }


    /*
     * @Title: reverseList
     * @Description: reverse SinglyLinkedList
     * @Author: zdp
     * @DateTime: 2023/8/14 17:28
     * @param
     * @return void
     * @throws
     */
    public void reverseList() {
        Node previous = null;
        Node current = head;
        Node next = head;

        while (current != null) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        head = previous;
    }

    /*
     * @Title: hasCycle
     * @Description: detect whether the SinglyLinkedList has cycle
     * @Author: zdp
     * @DateTime: 2023/8/14 17:27
     * @param
     * @return boolean
     * @throws
     */
    public boolean hasCycle() {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }
        return false;
    }



    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.insertNth(1, 0);
        list.insertNth(2, 1);
        list.insertNth(3, 2);
        list.insertNth(4, 3);
        list.insertNth(5, 4);
        System.out.println(list.toString());
        list.deleteNth(2);
        System.out.println(list.toString());
        list.deleteHead();
        System.out.println(list.toString());
        System.out.println(list.searchNodeByPosition(1).value);
    }
}

```
