---
title: Golang-goroutine
date: '2023-03-06'
tags: ['go', 'goroutine']
draft: false
summary: Learn Go
---

# Golang-goroutine

## 并行和并发

并发并不是并行，并行的关键是同时做很多事情，而**并发是同时管理很多事情，这些事情可能只做了一半就去做别的事情了**
在很多时候，并发的效果比并行好，因为操作系统的硬件资源是有限的，很难支持操作系统同时做很多事情

## 程序、进程、线程和协程

- 程序：程序是一组指令和数据的集合，它被保存在计算机的硬盘或其他永久存储设备中，并且需要被载入到内存中才能执行。程序是静态的，它不能被直接执行，只有通过进程才能运行。

- 进程：进程是程序的一次执行过程，它是操作系统分配资源的基本单位，包括内存、CPU 时间片、文件句柄等。每个进程都有自己独立的内存空间，相互之间不会干扰。不同的进程之间通过进程间通信机制进行通信。

- 线程：线程是进程的执行单元，是操作系统调度的基本单位。一个进程可以包含多个线程，每个线程共享该进程的内存和文件句柄等资源。线程之间的切换比进程切换快得多，因为线程间的切换只需要保存和恢复一些寄存器和堆栈信息即可。

- 协程：协程是轻量级线程的一种实现，是用户空间的线程，不依赖操作系统的线程调度机制。协程在运行时只需保留少量的寄存器和堆栈信息，因此切换速度非常快。协程通常运行在一个线程内，多个协程之间通过协作式调度来完成任务。

**联系和区别**

- 程序是一组指令和数据的集合，进程是程序的一次执行过程。
- 进程和线程都是操作系统分配资源的基本单位，但线程是进程的执行单元，协程是用户空间的线程，不依赖操作系统的线程调度机制。
- 线程和协程都是轻量级的执行单元，但是线程需要操作系统的支持，协程不需要。
- 进程之间相互独立，线程之间共享进程的资源，协程之间共享线程的资源。
- 进程切换需要保存和恢复进程的上下文，线程切换需要保存和恢复线程的上下文，协程切换需要保存和恢复协程的上下文。
- 线程和协程的切换比进程切换快得多，因为它们共享了进程的地址空间，切换时不需要切换内存页表，同时也只需要保存和恢复少量的寄存器和堆栈信息。

## 普通函数创建 goroutine

想要使用 goroutine 的话，我们可以在函数和方法前加上`go`关键字，我们可以从以下的例子入手:

```go
package main

import (
	"fmt"
	"time"
)

func say(id string) {
	time.Sleep(time.Second * 1)
	fmt.Println("I am done! id: " + id)
}
func main() {
	go say("hello")
	say("goroutine")
}

```

这样之后，我们在运行程序会发现两个函数是同时执行的。

## 匿名函数创建 goroutine

当然我们也可以使用匿名函数来创建一个`goroutine`:

```go
package main

import "fmt"

// 用于测试
func main() {

    // 创建两个匿名函数, 用于创建goroutine
	go func() {
		fmt.Println("hello")
	}()
	go func() {
		fmt.Println("goroutine")
	}()
}

```

“正常”的结果应该是先输出`hello`后输出`goroutine`，或者先输出`goroutine`后输出`hello`。但是程序直接挂掉了，为什么？

在 Go 语言中，当`main`函数结束之后，所有的`goroutine` 都会被暴力地终结，因为在 Go 语言中，所有的 goroutine 都是在`main goroutine` 的上下文中运行的。主函数没有等待这两个`goroutine` 完成就结束了，所以`goroutine`也就没有机会执行了。

![image-20230306192524659](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202303061925785.png)

我们可以将程序修改为如下:

```go
package main

import (
	"fmt"
	"sync"
)

// 用于测试
func main() {
    // wg 用来等待程序的完成
	var wg sync.WaitGroup
    // 计数器+2 表示要等待两个goroutine
	wg.Add(2)
	go func() {
         // 在函数退出时调用Done, wg当中的计数器-1，通知main函数该工作已经完成
		defer wg.Done()
		fmt.Println("hello")
	}()
	go func() {
		defer wg.Done()
		fmt.Println("goroutine")
	}()

    // 等待goroutine结束（计数器为0的时候）
	wg.Wait()
}

```

## 执行顺序

```go
package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

func main() {
	runtime.GOMAXPROCS(1)

	var wg sync.WaitGroup

	wg.Add(2)

	go func() {
		defer wg.Done()

		for i := 1; i < 100; i++ {
			time.Sleep(time.Second * 1)
			fmt.Println("A:", i)
		}
	}()

	go func() {
		defer wg.Done()
		for i := 1; i < 100; i++ {
			time.Sleep(time.Second * 1)
			fmt.Println("B:", i)
		}
	}()
	wg.Wait()
}
```

创建两个 goroutine 并发地运行。每个 goroutine 打印一系列数字，并在打印后等待 1 秒钟。这个过程会持续大约 99 秒钟，因为循环条件是 i < 100。

由于在 main 函数中调用了 runtime.GOMAXPROCS(1)，所以程序只使用一个核心来执行这两个 goroutine。因此，这两个 goroutine 会交替运行，每次只有一个 goroutine 在运行。在理论上，第二个 goroutine 可能会在第一个 goroutine 等待 1 秒钟的过程中开始运行。但是，由于调度器的复杂性和不确定性，无法准确预测 goroutine 的执行顺序。因此，我们不能确切地说第二个 goroutine 是否会在第一个 goroutine 等待 1 秒钟的过程中开始运行。
