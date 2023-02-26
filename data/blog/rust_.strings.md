---
title: Rust-Strings
date: '2023-02-26'
tags: ['rust']
draft: false
summary: Learn Rust (Just For Fun)
---

# Rust-Strings

## string1.rs

The purpose of the function is to return a string. But in Rust, "blue" is a string literal value and cannot be used as a return value. In Rust, strings are represented using `String` type, so it is necessary to create a new instance of `String` containing the string literal value. This can be achieved using the `String::from` and `"blue.to_string()"`.

```rust
fn main() {.
    let answer = current_favorite_color();
    println!("My current favorite color is {}", answer);
}

fn current_favorite_color() -> String {
    // "blue".to_string()
    String::from("blue")
}
```

## string2.rs

The exercise asks us not to change the line `let word = String::from;` . From the `if` statement in `main` function , we can find that the parameter of the called function is of type `String`. So we should change `&str` to `String` in function`is_a_word_color`.

```rust
fn main() {
    let word = String::from("green"); // Try not changing this line :)
    if is_a_color_word(word) {
        println!("That is a color word I know!");
    } else {
        println!("That is not a color word I know.");
    }
}

fn is_a_color_word(attempt: String) -> bool {
    attempt == "green" || attempt == "blue" || attempt == "red"
}
```

## string3.rs

The `to_owned` method is used to create a new `String` instance that contains a copy of `input` parameter. The `operator` is used to add a new `String` to created `String`

```rust
fn trim_me(input: &str) -> String {
    // TODO: Remove whitespace from both ends of a string!
    input.trim().to_string()
}

fn compose_me(input: &str) -> String {
    // TODO: Add " world!" to the string! There's multiple ways to do this!
    input.to_owned() + " world!"
}

fn replace_me(input: &str) -> String {
    // TODO: Replace "cars" in the string with "balloons"!
    input.replace("cars", "balloons")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn trim_a_string() {
        assert_eq!(trim_me("Hello!     "), "Hello!");
        assert_eq!(trim_me("  What's up!"), "What's up!");
        assert_eq!(trim_me("   Hola!  "), "Hola!");
    }

    #[test]
    fn compose_a_string() {
        assert_eq!(compose_me("Hello"), "Hello world!");
        assert_eq!(compose_me("Goodbye"), "Goodbye world!");
    }

    #[test]
    fn replace_a_string() {
        assert_eq!(replace_me("I think cars are cool"), "I think balloons are cool");
        assert_eq!(replace_me("I love to look at cars"), "I love to look at balloons");
    }
}
```

## string4.rs

The `string_slice` function takes a string slice `&str` as an argument and prints it out.

The `string` function takes a `String` argument and prints it out.

In the `main` function:

- `string_slice("blue")` calls the `string_slice` function with the string literal "blue" as an argument.
- `string("red".to_string())` calls the `string` function with the result of calling `to_string()` on the string literal "red".
- `string(String::from("hi"))` calls the `string` function with a new `String` instance created from the string literal "hi".
- `string("rust is fun!".to_owned())` calls the `string` function with a new `String` instance created from the string literal "rust is fun!" using the `to_owned()` method.
- `string("nice weather".into())` calls the `string` function with a new `String` instance created from the string literal "nice weather" using the `into()` method.
- `(format!("Interpolation {}", "Station"))` creates a new `String` instance using string interpolation and then discards it (since it's not assigned to a variable or printed out).
- `string_slice(&String::from("abc")[0..1])` calls the `string_slice` function with a string slice of the first character of a new `String` instance created from the string literal "abc".
- `string_slice(" hello there ".trim())` calls the `string_slice` function with a string slice of the trimmed version of the string literal " hello there ".
- `string("Happy Monday!".to_string().replace("Mon", "Tues"))` calls the `string` function with a new `String` instance created from the string literal "Happy Monday!" with "Mon" replaced by "Tues" using the `replace` method.
- `string("mY sHiFt KeY iS sTiCkY".to_lowercase())` calls the `string` function with a new `String` instance created from the string literal "mY sHiFt KeY iS sTiCkY" with all characters converted to lowercase using the `to_lowercase` method.

```rust
fn string_slice(arg: &str) {
    println!("{}", arg);
}
fn string(arg: String) {
    println!("{}", arg);
}

fn main() {
    string_slice("blue");
    string("red".to_string());
    string(String::from("hi"));
    string("rust is fun!".to_owned());
    string("nice weather".into());
    (format!("Interpolation {}", "Station"));
    string_slice(&String::from("abc")[0..1]);
    string_slice("  hello there ".trim());
    string("Happy Monday!".to_string().replace("Mon", "Tues"));
    string("mY sHiFt KeY iS sTiCkY".to_lowercase());
}
```
