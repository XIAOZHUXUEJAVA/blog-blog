---
title: Rustlings-Vecs
date: '2023-02-20'
tags: ['rust']
draft: false
summary: Learn Rust (Just For Fun)
---

The `vec!` macro is a convenient shortcut for creating variables of type `Vec` and initialize their elements.

## vecs1.rs

```rust
fn array_and_vec() -> ([i32; 4], Vec<i32>) {
    let a = [10, 20, 30, 40]; // a plain array
    let v = vec![10, 20, 30, 40];// TODO: declare your vector here with the macro for vectors

    // to return
    (a, v)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_array_and_vec_similarity() {
        let (a, v) = array_and_vec();
        assert_eq!(a, v[..]);
    }
}
```

## vecs2.rs

Both of the two functions have the same purpose of multiplying each element in the vector by 2 and return a vector.

However, `vec_loop` directly modifies the input vector, while `vec_map` returns a new vector with modified elements.

Why we use `*i = *i * 2` ?

In this code, the input parameter `v` of the `vec_loop` function if defined as a mutable `Vec<i32>` type, which means that the function can modify the vector internally. Specifically, we use `iter_mut()` method to obtain a mutable iterator of the vector `v`, iterate over each element in the vector, and use the dereference operator `*` to read the value of each element, multiply it by 2, and assign it back to the original element.

The function returns the updated original vector `v`. Because `v` is mutable, the function can directly modify its elements without creating a new vector. This avoid the overhead of memory allocation and copying, improving the performance of the code.

The code defines a function named `vec_map` which takes a reference to a `Vec<i32>` vector as its input parameter `v`. The vector is read-only, meaning that it can not be modified inside the function. In the function , we use the `iter()` method to obtain the iterator over the elements of the vector`v`, and apply each element to an anonymous function `|num| { return num *2 }` using the `map() ` method. This function multiplies each element by 2 and return a new element. Finally, we use the `collect()` method to collect all the new elements into a new vector.

It is important to note that, unlike the `vec_loop` function, we do not modify the original vector `v` directly in the `vec_map` function. Instead we create a new vector to store and updated values. This is because we are using a read-only reference to the vector `v` , which prevents us from modifying it directly. So we avoid some side effects that might be caused by modifying the original vector directly.

Overall, the purpose of this code is to multiply each element of the input vector `v` by 2 and return a new vector with the updated values. Unlike `vec_loop`, `vec_map` does not modify the original vector, but instead returns a new one.

```rust
fn vec_loop(mut v: Vec<i32>) -> Vec<i32> {
    for i in v.iter_mut() {
        // TODO: Fill this up so that each element in the Vec `v` is
        // multiplied by 2.
        *i = *i * 2;
    }

    // At this point, `v` should be equal to [4, 8, 12, 16, 20].
    v
}

fn vec_map(v: &Vec<i32>) -> Vec<i32> {
    v.iter().map(|num| {
        // TODO: Do the same thing as above - but instead of mutating the
        // Vec, you can just return the new number!
        return num * 2
    }).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_vec_loop() {
        let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
        let ans = vec_loop(v.clone());

        assert_eq!(ans, v.iter().map(|x| x * 2).collect::<Vec<i32>>());
    }

    #[test]
    fn test_vec_map() {
        let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
        let ans = vec_map(&v);

        assert_eq!(ans, v.iter().map(|x| x * 2).collect::<Vec<i32>>());
    }
}
```
