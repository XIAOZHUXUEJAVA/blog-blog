---
title: Rustlings-Enums
date: '2023-02-25'
tags: ['rust']
draft: false
summary: Learn Rust (Just For Fun)
---

# Rust-Enums

## enum1.rs

In practical applications, enums types are often used to express a group of related options or status, such as **HTTP status code**, **the status of operating system process** and so on. Using enums can make our code clear and understandable, while also improving its readability and maintainability.

```rust
#[derive(Debug)]
enum Message {
    // TODO: define a few types of messages as used below
    Quit,
    Echo,
    Move,
    ChangeColor,
}

fn main() {
    println!("{:?}", Message::Quit);
    println!("{:?}", Message::Echo);
    println!("{:?}", Message::Move);
    println!("{:?}", Message::ChangeColor);
}
```

For instance,

```rust
enum HttpStatus {
    Continue = 100,
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
}

```

## enum2.rs

```rust
#[derive(Debug)]
enum Message {
    // TODO: define the different variants used below
    Move {x: i32, y: i32},
    Echo(String),
    ChangeColor(u8, u8, u8),
    Quit,
}

impl Message {
    fn call(&self) {
        println!("{:?}", self);
    }
}

fn main() {
    let messages = [
        Message::Move { x: 10, y: 30 },
        Message::Echo(String::from("hello world")),
        Message::ChangeColor(200, 255, 255),
        Message::Quit,
    ];

    for message in &messages {
        message.call();
    }
}
```

## enum3.rs

The `process` function is used to handle different types of messages. Based on the type message passed in, the `process` function calls the corresponding function in the `State` structure. rust compiler will infer the type of `point`, `str` and `color` depend on context

```rust
enum Message {
    // TODO: implement the message variant types based on their usage below
    Move(Point),
    Echo(String),
    ChangeColor((u8, u8, u8)),
    Quit,
}

struct Point {
    x: u8,
    y: u8,
}

struct State {
    color: (u8, u8, u8),
    position: Point,
    quit: bool,
}

impl State {
    fn change_color(&mut self, color: (u8, u8, u8)) {
        self.color = color;
    }

    fn quit(&mut self) {
        self.quit = true;
    }

    fn echo(&self, s: String) {
        println!("{}", s);
    }

    fn move_position(&mut self, p: Point) {
        self.position = p;
    }

    fn process(&mut self, message: Message) {
        match message {
            // rust compiler will ifer the type of `point`, `str` and  `color` depend on context
            Message::Move(point) => self.move_position(point),

            Message::Echo(str) => self.echo(str),

            Message::ChangeColor(color) => self.change_color(color),
            Message::Quit => self.quit(),
        }
        // TODO: create a match expression to process the different message variants
        // Remember: When passing a tuple as a function argument, you'll need extra parentheses: fn function((t, u, p, l, e))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_match_message_call() {
        let mut state = State {
            quit: false,
            position: Point { x: 0, y: 0 },
            color: (0, 0, 0),
        };
        state.process(Message::ChangeColor((255, 0, 255)));
        state.process(Message::Echo(String::from("hello world")));
        state.process(Message::Move(Point { x: 10, y: 15 }));
        state.process(Message::Quit);

        assert_eq!(state.color, (255, 0, 255));
        assert_eq!(state.position.x, 10);
        assert_eq!(state.position.y, 15);
        assert_eq!(state.quit, true);
    }
}
```
