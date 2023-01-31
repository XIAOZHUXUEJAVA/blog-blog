---
title: 电话号码字母组合
date: '2023-01-31'
tags: ['java', 'go', 'c++', 'datastructrue', 'review']
draft: false
summary: Letter Combinations
---

# 电话号码的字母组合

## c++

```c
class Solution {
vector<string> res;
    string track;
    unordered_map<char, string> numString = {
        {'2', "abc"},
        {'3', "def"},
        {'4', "ghi"},
        {'5', "jkl"},
        {'6', "mno"},
        {'7', "pqrs"},
        {'8', "tuv"},
        {'9', "wxyz"}
    };

public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return res;
        backtrack(digits, 0);
        return res;
    }

    void backtrack(string& digits, int num) {
        if (num == digits.size()) {
            res.push_back(track);
            return;
        }

        string str = numString[digits[num]];
        for (char c : str) {
            track.push_back(c);
            backtrack(digits, num + 1);
            track.pop_back();
        }
    }
};
```

## java

```java
class Solution {
    List<String> res = new LinkedList<>();
    StringBuilder track = new StringBuilder();
    public List<String> letterCombinations(String digits) {
        if (digits.isEmpty()) {
            return res;
        }
        String[] numString = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        backtrack(digits, numString, 0);
        return res;
    }
    // digits 为输入的数字字符串， 如"23"
    // numString 为我们的电话号码映射
    // num 为我们当前的数字
    public void backtrack(String digits, String[] numString, int num) {
        // 终止条件比较明了，即为输入的字符串的字符个数（数字的个数）
        if (num == digits.length()) {
            res.add(track.toString());
            return;
        }
        // 获取数字字符对应的字符串
        String str = numString[digits.charAt(num) - '0'];
        // 开始对对应的字符串进行回溯
        for (int i = 0; i < str.length(); i++) {
            track.append(str.charAt(i));
            backtrack(digits, numString, num + 1);
            track.deleteCharAt(track.length() - 1);
        }
    }

}
```

## go

```go
var trackLetter []byte
var resLetter []string

func letterCombinations(digits string) []string {
    trackLetter = make([]byte, 0)
    resLetter = make([]string, 0)
	numString := []string{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"}
	if digits == "" {
		return resLetter
	}
	backtrackLetter(digits, numString, 0)
	return resLetter
}
func backtrackLetter(digits string, numString []string, num int) {
	if num == len(digits) {
		temp := string(trackLetter)
		resLetter = append(resLetter, temp)
		return
	}
	str := numString[digits[num]-'0']
	for i := 0; i < len(str); i++ {
		trackLetter = append(trackLetter, str[i])
		backtrackLetter(digits, numString, num+1)
		trackLetter = trackLetter[:len(trackLetter)-1]
	}
}
```
