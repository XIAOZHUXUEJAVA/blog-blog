---
title: 剑指Offer-算法篇-Day03
date: '2023-03-13'
tags: ['java', 'offer']
draft: false
summary: For Job
---

## 替换空格

```java
class Solution {
    public String replaceSpace(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i);
            if (a == ' ') {
                sb.append("%20");
            } else {
                sb.append(a);
            }
        }
        return sb.toString();
    }
}
```

## 左旋字符串

正常思路做

```java
class Solution {
    public String reverseLeftWords(String s, int k) {
        StringBuilder sb = new StringBuilder();
        for(int i = k; i < s.length(); i++) {
            sb.append(s.charAt(i));
        }
        for (int i = 0; i < k; i++) {
            sb.append(s.charAt(i));
        }
        return sb.toString();
    }
}
```

使用 java 当中方法(最好别用)

```java
class Solution {
    public String reverseLeftWords(String s, int n) {
        return  s.substring(n, s.length()) + s.substring(0, n);
    }
}
```

取余简化代码(这个属实没有想到)

```java
class Solution {
    public String reverseLeftWords(String s, int n) {
        StringBuilder sb = new StringBuilder();
        for (int i = n; i < n + s.length(); i++) {
            sb.append(s.charAt(i % s.length()));
        }
        return sb.toString();
    }
}
```
