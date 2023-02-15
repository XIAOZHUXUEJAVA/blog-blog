---
title: Rustlings-Variables
date: '2023-02-16'
tags: ['rust']
draft: false
summary: Learn Rust (Just For Fun)
---

# Rustlings-Variables

## variables1.rs

Rust uses `let` keyword to create a new variable.

```rust
fn main() {
    let mut x: i32 = 5;
    // let x = 5; success
    // x = 5; error
    println!("x has the value {}", x);
}
```

## variables2.rs

If we only declared variables without type annotation or initialize value, the compiler has no idea that variable type will be.

If we use `let x = 10`, the complier will consider x as `i32`.

We can run the command `rustlings lsp` , this allows `rust-analyzer` to parse each exercise.

```rust
fn main() {
    // let x; error
    // let x = 10; success
    let x: i32 = 10;
    if x == 10 {
        println!("x is ten!");
    } else {
        println!("x is not ten!");
    }
}
```

## variables3.rs

We must initialize a variable before use;

```rust
fn main() {
    // let x; error
    // let x = 32; success
    let x: i32 = 32;
    println!("Number {}", x);
}
```

## variables4.rs

In Rust, variable bindings are immutable(不可变的) by default.

Sometimes we want to reassign a different value to a variable.

So we can add `mut` before variable name, this inform the complier that we want to modify the variable in later.

```rust
fn main() {
    // if we want a changable variable, we should use "mut"
    let mut x = 3;
    println!("Number {}", x);
    x = 5; // don't change this line
    println!("Number {}", x);
}
```

## variables5.rs

Sometimes, we may also like to reuse existing variable names because we are just converting values to different types.

```rust
fn main() {
    let number = "T-H-R-E-E"; // don't change this line
    println!("Spell a Number : {}", number);
    let number = 3; // don't rename this variable
    println!("Number plus two is : {}", number + 2);
}
```

## variables6.rs

Constants are always immutable and they declared with keyword `const` rather than the key board let. Constants types must also always be annotated.

```rust
const NUMBER: i32 = 3;
fn main() {
    println!("Number {}", NUMBER);
}
```
