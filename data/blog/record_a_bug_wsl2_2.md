---
title: 记录一个wsl2的BUG, 已解决
date: '2022-12-09'
tags: ['linux', 'wsl2']
draft: false
summary: record a bug in wsl2
---

不知从哪天开始，我的电脑打开 wsl2 Ubuntu-20.04 和 window 版的 docker 会出现这种情况

![image-20221209102257252](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212091022318.png)

并且我尝试在管理员模式:命令提示符使用命令 wsl 直接进入 Ubuntu20.04，会提示出现“参考的对象类型不支持尝试的操作”的情况

## 方案一

1. 以管理员身份运行 windows terminal

2. 输入 netsh winsock reset

3. 重新打开 windows terminal

出现这种情况后，第一时间我是去 bing 搜索，在 csdn 中文社区找到了方案一，此方案虽然对我适用，但是还是会出现这样的问题，于是去 google 上寻找答案

## 方案二

1. 重置网络相关设置，重启相关服务

```shell
netsh winsock reset
net start HvHost & net stop HvHost & net start HvHost
```

2. 设置 Hypervisor 自动启动

```shell
 bcdedit /set hypervisorlaunchtype auto
```

使用此方案后，重启依旧是显示已退出进程

## 方案三

尝试使用下载工具解决

- 下载工具

http://file2.happyjava.cn/NoLsp.exe

- 或者在以下 github 仓中找到我们需要的可执行文件

https://github.com/dyingsu/nolsp

以下操作使用第一种方式

下载完成后，在这个可执行文件的目录下打开

![image-20221209195743964](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212091957028.png)

执行命令

![image-20221209195907759](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212091959789.png)

```shell
.\NoLsp.exe C:\windows\system32\wsl.exe
```

然后我们再重新打开终端的时候，就不会出现之前的情况了

## 总结

### 原因：

目前未知，github 上的说法是：代理软件和 wsl2 的 sock 端口冲突，使用 netsh winsock reset 重置修复。

笔者水平有限，不能对此错误做出解释。
