---
title: 反转整数
date: '2023-01-03'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Reverse Integer
---

## go

```go
func reverse(x int) int {
	result := 0
	for x != 0 {
		result = result*10 + x%10
		x /= 10
		if result > math.MaxInt32 || result < math.MinInt32 {
			return 0
		}
	}
	return result
}
```

## java

```java
public int reverse(int num) {
        if (num == 0) {
            return num;
        }
        int temp = num;
        if (num < 0) {
            num = -num;
        }
        String str = String.valueOf(num);
        StringBuilder sb = new StringBuilder();
        for (int i = str.length() - 1; i >= 0; i--) {
            sb.append(str.charAt(i));
        }
        String result = sb.toString();
        int newNum;
        try {
            newNum = Integer.parseInt(result);
        } catch (Exception e) {
            return 0;
        }
        if (temp < 0) {
            return -newNum;
        }
        return newNum;
    }
```

## c++

```c
int reverse(int x) {
        long long result = 0;
        while (x != 0) {
            result = result * 10 + x % 10;
            x /= 10;
            if (result > INT_MAX || result < INT_MIN) {
                return 0;
            }

        }
        return (int)result;
    }
```
