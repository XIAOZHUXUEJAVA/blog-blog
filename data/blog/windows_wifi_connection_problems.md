---
title: 笔记本电脑 Windows 10 使用wifi 显示"无法连接这个网络"的解决方案
date: '2023-02-28'
tags: ['windows']
draft: false
summary: I can not afford to buy an Apple Computer
---

## 方案一

打开 "网络和 Internet" 设置 -> 更改适配器选项 -> 右击 WALN -> 禁用 -> 启用

## 方案二

以管理员身份运行 CMD(命令提示符), 输入命令 `netsh winsock reset`, 回车, 然后重启电脑即可。
