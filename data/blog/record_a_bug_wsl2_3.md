---
title: WSL2，显示 [已退出进程，代码为 4294967295] 的解决方案(NEW)
date: '2023-04-10'
tags: ['linux', 'wsl2']
draft: false
summary: record a bug in wsl2
---

这次我按照之前的两个步骤都不起作用。再次遇到这些问题时，可以使用首先使用下面这两个解决方案，再尝试本次的解决方案。

- [记录一个 wsl2 的 BUG (xxxdgblog.netlify.app)](https://xxxdgblog.netlify.app/blog/record_a_bug_wsl2)

- [记录一个 wsl2 的 BUG, 已解决 (xxxdgblog.netlify.app)](https://xxxdgblog.netlify.app/blog/record_a_bug_wsl2_latest)

本次也不清楚是如何解决的，是胡乱操作的，但最终得以修复，故而记录一下。具体步骤如下：

1、启用虚拟机平台选项（之前我并没有启用）

![image-20230410174856087](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202304101749208.png)

2、设置 Hyper-V 自启动

```shell
bcdedit /set hypervisorlaunchtype auto
```

3、使用[记录一个 wsl2 的 BUG, 已解决 (xxxdgblog.netlify.app)](https://xxxdgblog.netlify.app/blog/record_a_bug_wsl2_latest)这条错误记录链接中的**方案三**

并且我连续运行了两次`Nolsp.exe`

4、重启电脑

经过这 4 个步骤后，我的 WSL2 又可以使用了。

可能出错原因：本人是 Window10 操作系统，在经历一次更新之后便出现了问题, 因此大概率是 windows 的问题。
