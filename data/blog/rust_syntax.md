---
title: Rust中的一些比较常用的基础语法(持续更新)
date: '2023-04-25'
tags: ['rust']
draft: false
summary: Commonly Used Syntax in Rust
---

# 整理一下 Rust 中的一些比较常用的基础语法

# 遍历

## 从 0 到 nums.len() - 1

```rust
for i in 0..nums.len() {

}
```

## 从 num.len() - 1 到 0

创建了一个 0 到 nums.len() - 1 范围然后反转 从 nums.len() - 1 开始遍历到 0

```rust
for i in (0..nums.len()).rev() {

}
```

## 遍历字符串

直接用迭代器 不使用下标的方式

```rust
 let s = String::from("interface");
    let s_chars = s.chars();
    for i in s_chars {
        println!("{}", i);
    }
```

不用迭代器

```rust
let s = String::from("interface");

    for i in 0..s.len() {
        println!("{}", s.chars().nth(i).unwrap());
    }
```

# vec slice array

## 将数组从某一位置分割为两个数组

```rust
let (left, right) = nums.split_at_mut(mid);
```

## 从另一个数组中复制到另一个数组中

nums 是 mutable

```rust
nums.copy_from_slice(&merged);
```

## 创建指定容量大小的 Vec

```rust
let mut res = Vec::with_capacity(left.len() + right.len());
```

## 扩展 Vec

```rust
res.extend_from_slice(&left[i..]);
```

# Math

## 找到两个数中的较大者

```rust
    // 找到两个数中的较大者
    let num1 = 1;
    let num2 = 2;
    let larger = num1.max(num2);
    println!("{}", larger);
```

# Snytax

## match 语法

```rust
use std::cmp::Ordering;
impl BinarySearch {
    pub fn binary_search(nums: &[i32], target: i32) -> Option<usize> {
        if nums.len() < 1 {
            return None;
        }

        let mut low = 0;
        let mut high = nums.len() - 1;

        while low <= high {
            let mid = (high - low) / 2 + low;
            match target.cmp(&nums[mid]) {
                Ordering::Equal => return Some(mid),
                Ordering::Less => high = mid - 1,
                Ordering::Greater => low = mid + 1,
            }
        }
        None
    }
}
```

## 类似于 java 等其他语言中的三目运算符号

```rust
result[0] = if left_bound == usize::MAX {
            None
        } else {
            Some(left_bound)
        };

        result[1] = if right_bound == usize::MAX {
            None
        } else {
            Some(right_bound)
        };

```

## 定义多个变量

```rust
let (num1, num2, num3) = (1, 2, 3);
```

使用 Rust 语言中的元组（tuple）来同时定义三个变量：num1、num2 和 num3，并分别给它们赋值为 1、2 和 3。元组是一种可以存储多个不同类型数据的有序集合，在 Rust 中用小括号 () 表示，其中各个元素之间以逗号 , 分隔。

因此，这行代码定义了一个包含三个元素的元组，并对其进行了解构，将其中的每个元素依次赋值给 num1、num2 和 num3 三个变量。

## 使用下划线开头作为变量名

```rust
let hello = String::from("hello");
```

如果我们使用上面的方式定义变量的话，如果我们在之后并没有使用该变量，我们的代码虽然会编译通过，但是 rust 编译器会提示我们该变量未使用。为此我们可以使用一下代码：

```rust
let _hello = String::from("hello");
```
