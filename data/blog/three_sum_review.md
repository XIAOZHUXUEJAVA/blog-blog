---
title: Three Sum Review
date: '2023-03-24'
tags: ['java', 'go', 'rust', 'datastructrue']
draft: false
summary: Three Sum Review
---

思路分析: 整体思路为：算出两数之和, 然后利用两数之和算出三数之和

## java

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {

        // 将数组排序
        Arrays.sort(nums);
        int n = nums.length;
        List<List<Integer>> res = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            List<List<Integer>> twoSumList = twoSum(nums, i + 1, 0 - nums[i]);
            if (!twoSumList.isEmpty()) {
                for (List<Integer> list : twoSumList) {
                    list.add(nums[i]);
                    res.add(list);
                }
            }
            // 排除重复
            // i++ 之后  由于外层循环 i++, 所以下一次i是在 i + 2
            // 即为重复项的下一项
            while (i < n - 1 && nums[i] == nums[i + 1]) {
                i++;
            }
        }
        return res;
    }

    public List<List<Integer>> twoSum(int[] nums, int start, int target) {
        int low = start;
        int high = nums.length - 1;
        List<List<Integer>> res = new LinkedList<>();
        while (low < high) {
            int left = nums[low];
            int right = nums[high];
            int sum = left + right;
            if (sum < target) {
                while (low < high && nums[low] == left) {
                    // 排除重复项
                    low++;
                }
            } else if (sum > target) {
                while (low < high && nums[high] == right) {
                    // 排除重复项
                    high--;
                }
            } else {
                List<Integer> list = new LinkedList<>();
                list.add(left);
                list.add(right);
                res.add(list);
                // 排除重复项
                while (low < high && nums[low] == left) {
                    low++;
                }
                while (low < high && nums[high] == right) {
                    high--;
                }
            }
        }
        return res;
    }



}
```

## go

```go
func threeSum(nums []int) [][]int {
	n := len(nums)

	sort.Ints(nums)
	var res [][]int
	for i := 0; i < n; i++ {
		twoSumList := twoSum(nums, i+1, 0-nums[i])
		for _, el := range twoSumList {
			el = append(el, nums[i])
			res = append(res, el)
		}
		for i < n-1 && nums[i] == nums[i+1] {
			i++
		}
	}
	return res
}

func twoSum(nums []int, start int, target int) [][]int {
	low := start
	high := len(nums) - 1

	var res [][]int

	for low < high {
		left := nums[low]
		right := nums[high]
		sum := left + right

		if sum < target {
			// 1 1 2 3 4 5
			// 1 + 5 = 6
			for low < high && nums[low] == left {
				low++
			}
		} else if sum > target {
			for low < high && nums[high] == right {
				high--
			}
		} else {
			list := []int{left, right}
			res = append(res, list)
			for low < high && nums[low] == left {
				low++
			}
			for low < high && nums[high] == right {
				high--
			}
		}

	}
	return res
}
```

## rust

```rust
use std::cmp::Ordering;
impl Solution {
    pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
        let n = nums.len();
        nums.sort();
        let mut res = vec![];
        let mut i = 0;
        while i < n {
            let two_sum_list = Self::two_sum(&nums, i + 1, 0 - nums[i]);
            for mut el in two_sum_list {
                el.push(nums[i]);
                res.push(el);
            }
            let mut j = i;
            while j < n - 1 && nums[j] == nums[j + 1] {
                j += 1;
            }
            i = j + 1;


        }
        res
    }
    pub fn two_sum(nums: &[i32], start: usize, target: i32) -> Vec<Vec<i32>> {
        let mut low = start;
        let mut high = nums.len() - 1;
        let mut res = vec![];

        while low < high {
            let left = nums[low];
            let right = nums[high];
            let sum = left + right;

            match sum.cmp(&target) {
               Ordering::Less => while low < high && nums[low] == left { low += 1; },
               Ordering::Greater => while low < high && nums[high] == right { high -= 1; },
               Ordering::Equal => {
                   res.push(vec![left, right]);
                   while low < high && nums[low] == left { low += 1; };
                   while low < high && nums[high] == right { high -= 1; };
               }
            }
        }
        res
    }
}
```
