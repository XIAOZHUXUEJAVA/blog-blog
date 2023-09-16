---
title: 无重复字符的最长字串
date: '2022-12-12'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Longest Substring Without Repeating Characters
---

## java

```java
 public  int lengthOfLongestSubstring(String s) {

        HashMap<Character, Integer> win_map = new HashMap<>();
        int right = 0;
        int left = 0;
        int len = 0;
        while(right < s.length()){
            char a = s.charAt(right);
            right++;
            win_map.put(a, win_map.getOrDefault(a, 0) + 1);
            //开始收缩
            while(win_map.get(a) > 1){
                char b = s.charAt(left);
                left++;
                win_map.put(b, win_map.get(b) - 1);
            }
            len = Math.max(len, right - left);
        }
        return len;
    }
```

## go

```go
func lengthOfLongestSubstring(s string) int {
	left := 0
	right := 0
	res := 0
	win := map[byte]int{}
	for right < len(s) {
		a := s[right]
		right++
		win[a]++
		for win[a] > 1 {
			b := s[left]
			left++
			win[b]--
		}
		if res < right - left {
			res = right - left
		}
	}
	return res
}
```

## c++

```c
int lengthOfLongestSubstring(string s) {
        int left = 0;
        int right = 0;
        int res = 0;
        unordered_map<char, int> win;
        while (right < s.size()) {
            char a = s[right];
            right++;
            win[a]++;
            while (win[a] > 1) {
                char b = s[left];
                left++;
                win[b]--;
            }
            res = max(res, right - left);
        }
        return res;
    }
```
