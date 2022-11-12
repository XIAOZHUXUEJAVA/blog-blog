---
title: cpp demo
date: '2022-03-08'
tags: ['c++']
draft: false
summary: Example of Cpp
---

```cpp
#include <iostream>

using namespace std;


//
// Created by xiaoz on 2022/11/7.
//
struct Node {
    int value;
    Node *next;
    Node (int value) : value {value}, next {nullptr} { }
};

void setNext(Node *node, int value) {
    Node *newNode = new Node(value);
    node->next = newNode;
}

//// &node相当于对象本身, 意思为传过来的参数必须是一个指针指向的具体对象
//void setNext1(Node &node, int value) {
//    Node *newNode = new Node(value);
//    node.next = newNode;
//}


```

singly_linked_list.cpp

```cpp
//
// Created by xiaoz on 2022/11/7.
//
#include <iostream>
#include "node.cpp"
using namespace std;



struct SinglyLinkedList {
    Node *head;
    int size;
    SinglyLinkedList(Node *head, int size) : head {head}, size {size} {};
    SinglyLinkedList() : head{nullptr}, size {0} {}
};
bool isEmpty(SinglyLinkedList *list);
void display(SinglyLinkedList *list);
void insert(SinglyLinkedList *list, int value);

void insert(SinglyLinkedList *list, int value) {
    Node *node = new Node(value);
    if (list->head == nullptr) {
        list->head = node;
        list->size++;
    } else {
        Node *temp = list->head;
        // To find the tail node in list
        while (temp->next != NULL) {
            temp = temp->next;
        }
        // Set the next of the tail node
        temp->next = node;
        list->size++;
    }
}


void display(SinglyLinkedList *list) {
    if (isEmpty(list)) {
        cout<<"The list to display is empty";
    }
    Node *cur = list->head;
    while (cur != nullptr) {
        if (cur->next == nullptr) {
            cout<<cur->value<<endl;
            break;
        }
        cout<<cur->value<<"->";
        cur = cur->next;
    }
}



bool isEmpty(SinglyLinkedList *list) {
    return list->size == 0;
}
int main() {

    Node *head = new Node(1);
    SinglyLinkedList *list = new SinglyLinkedList(head, 3);
    list->head->next = new Node(2);
    list->head->next->next = new Node(3);
    display(list);

    insert(list, 4);
    insert(list, 5);
    insert(list, 6);
    display(list);
    cout<<list->size;
    return 0;
}








```

