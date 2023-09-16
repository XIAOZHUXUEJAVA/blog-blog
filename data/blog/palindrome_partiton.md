---
title: 分割回文串
date: '2023-01-19'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Palindrome Partition
---

## java

```java
 List<List<String>> res = new LinkedList<>();
    LinkedList<String> track = new LinkedList<>();

    public List<List<String>> partition(String s) {
        backtracking(s, 0);
        return res;
    }

    public void backtracking(String s, int startIndex) {
        // 当我们起始位置（上一个递归过程中已经+1了） 与字符串的长度相等时
        // 这里不必担心是否合法，只要是加进来的track就是回文子串，下面有逻辑进行判断
        // 这里也不用担心之前的，我们回溯的时候，比如说 a | b a b 之前的 a 已经加入到了track中了，所以我们只需要判断bab就行
        if (startIndex >= s.length()) {
            res.add(new LinkedList<>(track));
            return;
        }
        for (int i = startIndex; i < s.length(); i++) {
            if (isPalindrome(s, startIndex, i)) {
                String str = s.substring(startIndex, i + 1);
                track.add(str);
            } else {
                continue;
            }
            backtracking(s, i + 1);
            track.removeLast();
        }
    }

    public boolean isPalindrome(String s, int begin, int end) {
        while (begin < end) {
            if (s.charAt(begin) != s.charAt(end)) {
                return false;
            }
            begin++;
            end--;
        }
        return true;
    }
```

## go

```go
var resPartition [][]string
var trackPartition []string

func partition(s string) [][]string {
	resPartition = make([][]string, 0)
	trackPartition = make([]string, 0)
	backtrackingPartition(s, 0)
	return resPartition
}

func backtrackingPartition(s string, startIndex int) {
	if startIndex >= len(s) {
		temp := make([]string, len(trackPartition))
		copy(temp, trackPartition)
		resPartition = append(resPartition, temp)
	}
	for i := startIndex; i < len(s); i++ {
		if isPalindrome(s, startIndex, i) {
			str := s[startIndex : i+1]
			trackPartition = append(trackPartition, str)
		} else {
			continue
		}
		backtrackingPartition(s, i+1)
		trackPartition = trackPartition[:len(trackPartition)-1]
	}
}
func isPalindrome(s string, low, high int) bool {
	for low < high {
		if s[low] != s[high] {
			return false
		}
		low++
		high--
	}
	return true
}
```

## c++

```c
 vector<vector<string>> res;
    vector<string> track;

    void  backtrack(const string& s, int startIndex) {
        if (startIndex >= s.size()) {
            res.push_back(track);
            return;
        }
        for (int i = startIndex; i < s.size(); i++) {
            if (isPalindrome(s, startIndex, i)) {
                string str = s.substr(startIndex, i - startIndex + 1);
                track.push_back(str);
            } else {
                continue;
            }
            backtrack(s, i + 1);
            track.pop_back();
        }
    }
    bool isPalindrome(const string& s, int low, int high) {
        while (low < high) {
            if (s[low] != s[high]) {
                return false;
            }
            low++;
            high--;
        }
        return true;
    }
    vector<vector<string>> partition(string s) {
        backtrack(s, 0);
        return res;
    }
```

![image-20230120223023882](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202301202230012.png)
