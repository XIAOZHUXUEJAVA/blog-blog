---
title: 每日小知识点(八) - 什么是Context上下文?
date: '2023-05-23'
tags: ['daily']
draft: false
summary: Daily Little Knowledge Points
---

维基百科中提到：

在电脑科学中，**任务（task）的上下文（英语：context）是一个任务所必不可少的一组数据（该任务可以是[进程](https://zh.wikipedia.org/wiki/行程)、[线程](https://zh.wikipedia.org/wiki/线程)）**。这些数据允许任务[中断](https://zh.wikipedia.org/wiki/中斷)，在这之后仍可在同一个地方继续执行。上下文的这一概念在中断的任务的场景下具有重大意义，其中，任务在被中断之后，处理器保存上下文并提供[中断处理](https://zh.wikipedia.org/w/index.php?title=中断处理&action=edit&redlink=1)（interrupt service routine）。因此，上下文越小，延迟越小。

上下文的数据可能存放于[处理器寄存器](https://zh.wikipedia.org/wiki/寄存器)、任务所利用的内存、某些[操作系统](https://zh.wikipedia.org/wiki/操作系统)管理的任务所使用的控制寄存器（control registers）。

## 操作系统中的上下文

我们可以理解为上下文是保存一个任务的数据（保存一个任务所运行的环境、情景），确保任务在中断或切换后能够无缝继续工作。

**举个具体的例子：**

假设你的计算机上同时运行着两个进程：一个是文本编辑器进程，另一个是浏览器进程。当你在文本编辑器中编写一段文字的同时，浏览器正在加载一个网页。

当操作系统需要切换从文本编辑器进程到浏览器进程时，它**首先会保存当前文本编辑器进程的上下文**。上下文包括该进程的程序计数器（记录当前指令的位置）、寄存器的值（包括通用寄存器和程序状态寄存器）以及其他与该进程相关的状态信息。

接下来，**操作系统会加载浏览器进程的上下文**。这意味着它会恢复浏览器进程之前保存的程序计数器、寄存器值和状态信息。一旦加载完毕，控制权就从文本编辑器进程切换到了浏览器进程

**再举个生活中的例子来说明：**

假设你在烹饪中同时进行两个任务：切菜和炒菜。当你需要暂时中断切菜，转而进行炒菜时，你会将切菜的状态保存下来，包括切割的进度、刀具的位置等等。然后，你开始进行炒菜的工作，同时保持了炒菜的上下文，包括炉灶的设置、锅中的食材等。

当你完成炒菜后，你可以通过加载切菜的上下文来恢复到之前的状态，继续切割菜品。这样，你能够从上一次工作的地方继续进行，而不需要重新开始。

## Java 中的上下文切换的例子

```java
public class ThreadSwitchDemo {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MyRunnable("Thread 1"));
        Thread thread2 = new Thread(new MyRunnable("Thread 2"));

        thread1.start();
        thread2.start();
    }


    static class MyRunnable implements Runnable {

        private String name;

        public MyRunnable(String name) {
            this.name = name;
        }

        @Override
        public void run() {
            for (int i = 0; i <= 5; i++) {
                System.out.println(name + ": " + i);
                try {
                    Thread.sleep(1000); // sleep 一下，让线程的切换更加明显
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}

```

我们创建了两个线程`thread1`和`thread2`，它们都执行同一个`MyRunnable`实例。每个线程通过循环打印数字 1 到 5，并在每次打印后休眠 1 秒。

当`thread1`开始执行时（假设 thread1 先开始执行，因为不确定哪个线程先执行，由操作系统的线程调度器决定），它会打印数字 1，并进行上下文切换，将 CPU 控制权切换给`thread2`。`thread2`接着开始执行，并打印数字 1。这个过程会一直重复，直到两个线程都执行完毕。

在每次切换线程时，操作系统需要保存当前线程的上下文信息，包括程序计数器的值、寄存器的内容和栈指针等。然后，它会加载下一个线程的上下文信息，并继续执行该线程。这样就完成了线程的切换。

当线程休眠结束后，操作系统会恢复线程的上下文，并从保存的状态继续执行线程。这意味着线程可以在上次休眠时的位置继续执行，而不是从头开始。

总结一句： **通过上下文的保存和恢复，线程在被唤醒后可以继续执行，保留了先前的状态和进度。这就是上下文切换的作用。**
