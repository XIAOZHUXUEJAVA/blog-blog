---
title: 字符串转化为整数
date: '2023-01-05'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: String To Int
---

# 字符串转化为整数

## java

```java
 public int myAtoi(String s) {
        int index = 0;
        int res = 0;
        int sign = 1;
        char[] array = s.toCharArray();
        while (index < s.length() && array[index] == ' ') {
            index++;
        }
        if (index < array.length && (array[index] == '-' || array[index] == '+')) {
            sign = array[index] == '+' ? 1 : -1;
            index++;
        }
        // 乍一看这个代码没有什么毛病. 但是我忽略的一些关键的条件
        // 我应该首先判断下标是否越界了
        while (index < s.length() && array[index] >= '0' && array[index] <= '9') {
            int cur = array[index] - '0';
            index++;
            //
            // if (res * 10 + cur > Integer.MAX_VALUE) {
                if (res > (Integer.MAX_VALUE - cur) / 10) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            res = res * 10 + cur;
        }
        return res * sign;
    }
```

## go

```go
import (
	"math"
)

func myAtoi(s string) int {
	// 1. 去除前导的空格
	len := len(s)
	index := 0
	for index < len && s[index] == ' ' {
		index++
	}
	// 如果全部为 "     "
	if index == len {
		return 0
	}
	sign := 1

	if s[index] == '-' {
		sign = -1
		index++
	} else if s[index] == '+' {
		index++
	}
	res := 0
	for index < len {
		cur := s[index]
		// 如果遇到非数字字符直接跳过即可
		if cur > '9' || cur < '0' {
			break
		}
		if (math.MaxInt32-int(cur-'0'))/10 < res {
			if sign == 1 {
				return math.MaxInt32
			} else {
				return math.MinInt32
			}
		}
		res = res*10 + int(cur-'0')
		index++
	}
	return sign * res
}
```

## c++

```c
int myAtoi(string s) {
    int index = 0;
    int res = 0;
    int sign = 1;

    // 有可能还有全是空格的情况
    while (index < s.size() && s[index] == ' ') {
      index++;
    }
    if (index < s.size() && (s[index] == '-' || s[index] == '+')) {
      sign = s[index] == '-' ? -1 : 1;
      index++;
    }
    while (index < s.size() && s[index] >= '0' && s[index] <= '9') {
      int cur = s[index++] - '0';
      while (res > (INT_MAX - cur) / 10) {
        return sign == 1 ? INT_MAX : INT_MIN;
      }
      res = res * 10 + cur;
    }
    return sign * res;
  }
```
