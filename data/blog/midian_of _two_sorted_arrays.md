---
title: 寻找两个正序数组的中位数
date: '2022-12-19'
tags: ['java', 'go', 'c++', 'datastructrue']
draft: false
summary: Find Midian Of Two Sorted Arrays
---

# 寻找两个正序数组的中位数

## java

```java
public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int totalLen = nums1.length + nums2.length;
        if (totalLen % 2 != 0) {
            return mergeTwoSortedArrays(nums1, nums2)[(totalLen - 1) / 2];
        } else {
            // 1 2 3 4 5 6
            int middle2 = totalLen / 2;
            int middle1 = middle2 - 1;
            int[] nums = mergeTwoSortedArrays(nums1, nums2);
            double res = (double)(nums[middle1] + nums[middle2]) / 2;
            return res;
        }
    }

    public int[] mergeTwoSortedArrays(int[] num1, int[] num2) {
        int i = 0;
        int j = 0;
        int p = 0;
        int l1 = num1.length;
        int l2 = num2.length;
        int[] merge = new int[l1 + l2];
        while (i != l1 && j != l2) {
            if (num1[i] > num2[j]) {
                merge[p] = num2[j];
                j++;
            } else {
                merge[p] = num1[i];
                i++;
            }
            p++;
        }
        // 1 2 4
        // 3 5 6
        // 1 2 3 4
        // 最后剩下5 6
        // 此时 i = 3 j = 1 p = 4
        if (j < l2) {
            for (int k = p; k < l1 + l2; k++) {
                merge[k] = num2[j];
                j++;
                if (j == l2) {
                    break;
                }
            }
        }
        if (i < l1) {
            for (int k = p; k < l1 + l2; k++) {
                merge[k] = num1[i];
                i++;
                if (i == l1) {
                    break;
                }
            }
        }
        return merge;
    }
```

## go

```go
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	totalLen := len(nums1) + len(nums2)
	var res float64
	mid := (totalLen - 1) / 2
	nums := mergeTwoSortedArrays(nums1, nums2)
	if totalLen%2 != 0 {
		res = float64(nums[mid])
	} else {
		res = float64((nums[mid] + nums[mid+1])) / 2.0
	}
	return res
}
func mergeTwoSortedArrays(nums1 []int, nums2 []int) []int {
	i := 0
	j := 0
	l1 := len(nums1)
	l2 := len(nums2)
	nums := []int{}
	for i != l1 && j != l2 {
		if nums1[i] < nums2[j] {
			nums = append(nums, nums1[i])
			i++
		} else {
			nums = append(nums, nums2[j])
			j++
		}
	}
	if i < l1 {
		curLen1 := len(nums)
		for p := curLen1; p < l1+l2; p++ {
			nums = append(nums, nums1[i])
			i++
			if i == l1 {
				break
			}
		}
	}
	if j < l2 {
		curLen2 := len(nums)
		for p := curLen2; p < l1+l2; p++ {
			nums = append(nums, nums2[j])
			j++
			if j == l2 {
				break
			}
		}
	}
	return nums
}
```

## c++

```c
double findMedianSortedArrays(vector<int> &nums1, vector<int> &nums2) {
        int totalLen = nums1.size() + nums2.size();
        int mid = (totalLen - 1) / 2;
        vector<int> nums = mergeTwoSortedArrays(nums1, nums2);
        double res = 0;
        if (totalLen % 2 != 0) {
            res = (double)nums[mid];
        } else {
            res = (double)(nums[mid] + nums[mid+10]) / 2;
        }
        return res;
    }

    vector<int> mergeTwoSortedArrays(vector<int> &nums1, vector<int> &nums2) {
        int i = 0;
        int j = 0;
        int l1 = nums1.size();
        int l2 = nums2.size();
        vector<int> nums(l1 + l2);
        while (i != l1 && j != l2) {
            if (nums1[i] > nums2[j]) {
                nums.push_back(nums2[j]);
                j++;
            } else {
                nums.push_back(nums1[i]);
                i++;
            }
        }
        int p = nums.size();
        if (j < l2) {
            for (int k = p; k < l1 + l2; k++) {
                nums[k] = nums2[j];
                j++;
                if (j == l2) {
                    break;
                }
            }
        }
        if (i < l1) {
            for (int k = p; k < l1 + l2; k++) {
                nums[k] = nums1[i];
                i++;
                if (i == l1) {
                    break;
                }
            }
        }
        return nums;
    }
```

思路非常简单，合并两个数组之后找到新数组的中位数。
