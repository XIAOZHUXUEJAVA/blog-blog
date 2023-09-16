---
title: 最长回文子串
date: '2022-12-15'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Longest Palindoric Substring
---

## java

```java
package com.zhu.algorithms.leetcode.strings;

/**
 * @description: LongestPalindromicSubstring
 * @date: 2022/12/15 9:33
 * @author: zdp
 * @version: 1.0
 */
public class LongestPalindromicSubstring {
    public static void main(String[] args) {
        LongestPalindromicSubstring test = new LongestPalindromicSubstring();
        String s = "cbbd";
        System.out.println(test.longestPalindrome(s));
    }

    public String longestPalindrome(String s) {
        String res = "";
        for (int i = 0; i < s.length(); i++) {
            // 处理以 i 为中心的
            String s1 = isPalindromic(s, i, i);
            // 处理以 i， i + 1 为中心的
            String s2 = isPalindromic(s, i, i + 1);
            if (res.length() < s1.length()) {
                res = s1;
            }
            if (res.length() < s2.length()) {
                res = s2;
            }
        }
        return res;
    }

    /*
     * @Title: isPalindromic
     * @Description: 判断是否是回文串
     * @Author: zdp
     * @DateTime: 2022/12/15 9:58
     * @param s
     * @param left
     * @param right
     * @return java.lang.String
     * @throws
     */
    public String isPalindromic(String s, int left, int right) {
        // 这样做可以处理奇数偶数问题
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        // 到最后出现两边字符不相等的情况的时候，我们的left 和 right 已经-- 和 ++ 了 所以我们返回的是 s[left + 1], s[right - 1]
        // String.substring(begin, end) 左闭右开
        return s.substring(left + 1, right);
    }
}

```

## go

```go
package strings

func longestPalindrome(s string) string {
	res := ""
	for i := 0; i < len(s); i++ {
		s1 := isPalindromic(s, i, i)
		s2 := isPalindromic(s, i, i+1)
		if len(res) < len(s1) {
			res = s1
		}
		if len(res) < len(s2) {
			res = s2
		}
	}
	return res
}

func isPalindromic(s string, left int, right int) string {
	for left >= 0 && right < len(s) && s[left] == s[right] {
		left--
		right++
	}
	return s[left+1 : right]
}

```

## c++

```c
//
// Created by xiaoz on 2022/12/15.
//
#include <iostream>
using namespace std;
class LongestPalindromicSubstring {
public:
    string longestPalindrome(string s) {
        string res = "";
        for (int i = 0; i < s.size(); i++) {
            string s1 = isPalindromic(s, i, i);
            string s2 = isPalindromic(s, i, i + 1);
            if (res.size() < s1.size()) {
                res = s1;
            }
            if (res.size() < s2.size()) {
                res = s2;
            }
        }
        return res;
    }
    string isPalindromic(string s, int left, int right) {
        while (left >= 0 && right < s.size() && s.at(left) ==  s.at(right)) {
            left--;
            right++;
        }
        // parm1 => pos parm2
        // different from java
        return s.substr(left + 1, right - left - 1);
    }
};

int main() {
    LongestPalindromicSubstring test;
    string s = "babad";
    string res = test.longestPalindrome(s);
    cout<<res;
}
```
