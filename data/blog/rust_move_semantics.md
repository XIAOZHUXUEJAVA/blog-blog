---
title: Rustlings-Move-Semantics
date: '2023-02-22'
tags: ['rust']
draft: false
summary: Learn Rust (Just For Fun)
---

# Move_Semantics

## move_semantics1.rs

The `fill_vec` function return a mutable type of `vec`, so we should define a mutable type of `vec` to receive it.

`let mut vec1 = fill_vec(vec)`

```rust
fn main() {
    let vec0 = Vec::new();

    let mut vec1 = fill_vec(vec0);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

// This function return a mutable vec
// So should define a mutable type of vec to receive it
fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;

    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics2.rs

We use `clone()` method to avoid any ownership issues, because we just create a copy of the `vec0`.

So we can perform any operations on `vec0` and `vec1` before or after calling the `fill_vec`function, because they are distinct objects.

```rust
fn main() {
    let vec0 = Vec::new();

    let mut vec1 = fill_vec(vec0.clone());
    // Do not change the following line!
    println!("{} has length {} content `{:?}`", "vec0", vec0.len(), vec0);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

fn fill_vec(vec: Vec<i32>) -> Vec<i32> {
    let mut vec = vec;

    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics3.rs

We defined the parameter of the function as an immutable variable, but then we tried to modify the variable by calling `vec_push()` method inside the function. In Rust, the `Vec::new()` method returns a new, empty `Vec` that is mutable by default and an immutable variable cannot be modified. Therefore, we should add ` mut` before the parameter of the function.

```rust
fn main() {
    let vec0 = Vec::new();

    let mut vec1 = fill_vec(vec0);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}

fn fill_vec(mut vec: Vec<i32>) -> Vec<i32> {
    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics4.rs

Inside the function `fill_vec()`, we create a new and mutable `Vec` using `vec![]` macro, and then we can use `push()` method to add element to it. And we need remove the parameter of `fill_vec` in `main` function.

```rust
fn main() {

    // 1. if we want to use vec0, we can give vec0 an explicit type
    let vec0: Vec<i32> = Vec::new();

    // 2. or use vec0.push() and vec![], just perform the vec0 to let compiler infer the type of vec0

    // (1).let mut vec0 = Vec::new();
    // vec0.push(1);

    // (2). let mut vec0 = vec![1, 2, 3];


    // 3. and delete it is ok, because in the problem we don't need it!


    let mut vec1 = fill_vec();

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);

    vec1.push(88);

    println!("{} has length {} content `{:?}`", "vec1", vec1.len(), vec1);
}
// `fill_vec()` no longer takes `vec: Vec<i32>` as argument
fn fill_vec() -> Vec<i32> {
    let mut vec = vec![];

    vec.push(22);
    vec.push(44);
    vec.push(66);

    vec
}
```

## move_semantics5.rs

In Rust, if there is a mutable reference to a variable, there cannot be any other mutable or immutable references to the same variable at the same time, as this may cause data races;

```rust
fn main() {
    let mut x = 100;
    let y = &mut x;
    *y += 100;
    let z = &mut x;
    *z += 1000;
    assert_eq!(x, 1200);
}
```

## move_semantics6.rs

It is important to note that the `get_char` function takes a `&String` parameter, indicating that it is borrowing a reference to the `String` rather than taking ownership. This means that original `String` object remains valid after calling `get_char`, because ownership has not been transferred.

But after the `string_uppercase(data)` call, we can not use `data` variable anymore because its value has been moved and release inside the function. If we need use original `data` variable after `string_uppercase` function, we can use `clone()` method to copy the value of `data` and then pass it as a function parameter to `string_uppercase`.

```rust
fn main() {
    let data = "Rust is great!".to_string();

    println!("{}", get_char(&data));
    println!("{}", data);
    string_uppercase(data.clone());
    // string_upppercase(data);
    // println!("{}", data); rust complier will report an error
    println!("{}", data);
}

// Should not take ownership
fn get_char(data: &String) -> char {
    data.chars().last().unwrap()
}

// Should take ownership
fn string_uppercase(mut data: String) {
    data = data.to_uppercase();

    println!("{}", data);
}
```
