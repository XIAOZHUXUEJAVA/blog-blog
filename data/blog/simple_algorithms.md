---
title: 一些必知必会的算法(1)
date: '2023-03-06'
tags: ['go', 'datastructrue', 'review']
draft: false
summary: Simple Algorithms
---

# 一些必知必会的算法(1)

## 斐波那契数列

```go
package common

// 第n个斐波那契数
func fib(n int) int {
	if n < 2 {
		return n
	}
	return fib(n-1) + fib(n-2)
}

// 前n个斐波那契数
func fibn(n int) []int {
	res := make([]int, 0)

	for i := 0; i < n; i++ {
		res = append(res, fib(i))
	}
	return res
}

// 小于n的斐波那契数

func fibLowerThanN(n int) []int {
	fibList := []int{0, 1}

	for fibList[len(fibList)-1] < n {
		nextFib := fibList[len(fibList)-1] + fibList[len(fibList)-2]
		if nextFib < n {
			fibList = append(fibList, nextFib)
		} else {
			break
		}
	}
	return fibList
}
```

## 质数

```go
package common

func isPrime(n int) bool {
	if n < 2 {
		return false
	}
	for i := 2; i < n/2; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}
func primeList(n int) []int {
	res := []int{}
	for i := 2; i < n; i++ {
		if isPrime(i) {
			res = append(res, i)
		}
	}
	return res
}
```

## 二分搜索

```go
package common

func bianrySearch(nums []int, target int) int {
	low := 0
	high := len(nums) - 1

	for low <= high {
		mid := low + (high-low)/2
		if nums[mid] == target {
			return mid
		} else if target > nums[mid] {
			low = mid + 1
		} else if target < nums[mid] {
			high = mid - 1
		}
	}
	return -1
}
```

## 冒泡搜索

```go
package common

func bubbleSort(nums []int) {
	for i := len(nums) - 1; i > 0; i-- {
		for j := 0; j < i; j++ {
			if nums[j] > nums[j+1] {
				nums[j], nums[j+1] = nums[j+1], nums[j]
			}
		}
	}
}

func bubbleSortWithFlag(nums []int) {
	for i := len(nums) - 1; i > 0; i-- {
		flag := false
		for j := 0; j < i; j++ {
			if nums[j] > nums[j+1] {
				nums[j], nums[j+1] = nums[j+1], nums[j]
				flag = true
			}
		}
		if !flag {
			break
		}
	}
}
```

## 回文字符串

```go
func isPalindrome(s string) bool {
	if len(s) == 0 {
		return false
	}
	low := 0
	high := len(s) - 1
	for low <= high {
		if s[low] != s[high] {
			return false
		}
		low++
		high--
	}
	return true
}

```

## 测试

```go
package common

import (
	"fmt"
	"testing"
)

func TestFib(t *testing.T) {
	res := fibn(5)
	fmt.Println(res)
	res1 := fibLowerThanN(10)
	fmt.Println(res1)
}

func TestPrime(t *testing.T) {
	res := primeList(20)
	fmt.Println(res)
}

func TestBinarySearch(t *testing.T) {
	nums := []int{1, 2, 3, 6, 7, 8}
	index := bianrySearch(nums, 3)
	fmt.Println(index)
}

func TestBubbleSort(t *testing.T) {
	nums1 := []int{9, 8, 7, 6, 4, 2, 1}
	bubbleSort(nums1)
	fmt.Println(nums1)

	nums2 := []int{11, 9, 8, 7, 6, 4, 2, 1}
	bubbleSortWithFlag(nums2)
	fmt.Println(nums2)
}
```

```go
func isPalindrome(s string) bool {
	if len(s) == 0 {
		return false
	}
	low := 0
	high := len(s) - 1
	for low <= high {
		if s[low] != s[high] {
			return false
		}
		low++
		high--
	}
	return true
}

```
