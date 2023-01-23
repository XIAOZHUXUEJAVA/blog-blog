---
title: 复原IP地址
date: '2023-01-23'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Restore Ip Addresses
---

# 复原 IP 地址

## java

```java
class Solution {
    List<String> res = new LinkedList<>();

    public List<String> restoreIpAddresses(String s) {
        if (s.length() > 12) {
            return res;
        }
        backtracking(s, 0, 0);
        return res;
    }
    public void backtracking(String s, int startIndex, int pointNum) {
        // 判断剩余的是否合法
        if (pointNum == 3) {
            if (isValid(s, startIndex, s.length() - 1)) {
                res.add(s);
            }
            return;
        }
        for (int i = startIndex; i < s.length(); i++) {
            if (isValid(s, startIndex, i)) {
                // 添加.
                s = s.substring(0, i + 1) + "." + s.substring(i + 1);
                pointNum++;
                backtracking(s, i + 2, pointNum);
                // 回溯
                pointNum--;
                s = s.substring(0, i + 1) + s.substring(i + 2);
            } else {
                // 这里直接不符合break就ok了，不符合后面的就不用判断了，我们之前判断回文串的时候，是用的continue
                break;
            }
        }
    }

    public boolean isValid(String s, int start, int end) {
        if (start > end) {
            return false;
        }
        // 判断这些字符串是否合法时，最好使用传统方法，而不是对应的api
        // 三个数字中开头是0的话，不合法; 如果只有0这一个字符，合法
        if (s.charAt(start) == '0' && start != end) {
            return false;
        }
        int num = 0;
        for (int i = start; i <= end; i++) {
            // 遇到不是数字的字符，不合法
            if (s.charAt(i) > '9' || s.charAt(i) < '0') {
                return false;
            }
            // 不断累加得到相应的数字
            // 这也算是一个技巧吧，值得学习
            num = num * 10 + (s.charAt(i) - '0');
            if (num > 255) {
                return false;
            }
        }
        return true;
    }
}
```

## go

```go
var res []string

func restoreIpAddresses(s string) []string {
    res = []string{}
    if len(s) > 12 {
        return res
    }
    backtracking(s, 0, 0)
    return res
}

func backtracking(s string, startIndex int, pointNum int) {
    if pointNum == 3 {
        if isValid(s, startIndex, len(s) - 1) {
            res = append(res, s)
        }
        return
    }
    for i := startIndex; i < len(s); i++ {
        if isValid(s, startIndex, i) {
            s = s[:i+1] + "." + s[i+1:]
            pointNum++
            backtracking(s, i+2, pointNum)
            pointNum--
            s = s[:i+1] + s[i+2:]
        } else {
            break
        }
    }
}

func isValid(s string, start int, end int) bool {
    if start > end {
        return false
    }
    if s[start] == '0' && start != end {
        return false
    }
    num := 0
    for i := start; i <= end; i++ {
        if s[i] > '9' || s[i] < '0' {
            return false
        }
        num = num*10 + int(s[i]-'0')
        if num > 255 {
            return false
        }
    }
    return true
}
```

## c++

```c
class Solution {
public:
    vector<string> res;
    vector<string> restoreIpAddresses(string s) {
        res.clear();
        if (s.size() > 12 || s.size() < 4) {
            return res;
        }
        backtracking(s, 0, 0);
        return res;
    }
    void backtracking(string s, int startIndex, int pointNum) {
        if (pointNum == 3) {
            if (isValid(s, startIndex, s.size() - 1)) {
                res.push_back(s);
            }
            return;
        }
        for (int i = startIndex; i < s.size(); i++) {
            if (isValid(s, startIndex, i)) {
                s.insert(s.begin() + i + 1, '.');
                pointNum++;
                backtracking(s, i + 2, pointNum);
                pointNum--;
                s.erase(s.begin() + i + 1);
            } else {
                break;
            }
        }
    }
    bool isValid(string s, int start, int end) {
        if (start > end) {
            return false;
        }
        if (s[start] == '0' && start != end) {
            return false;
        }
        int num = 0;
        for (int i = start; i <= end; i++) {
            if (s[i] > '9' || s[i] < '0') {
                return false;
            }
            num = num * 10 + s[i] - '0';
            if (num > 255) {
                return false;
            }
        }
        return true;
    }
};
```
