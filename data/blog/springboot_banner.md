---
title: SpirngBoot启动Banner设置
date: '2022-11-16'
tags: ['java', 'springboot']
draft: false
summary: SpirngBoot启动Banner设置
---

## 内容生成

1.文字转文本
https://www.bootschool.net/ascii/

2.文字转文本
http://www.network-science.de/ascii/

3.图片转文本
https://www.degraeve.com/img2txt.php

4.文字转文本
http://patorjk.com/software/taag/

## 在 resources 文件夹下新建一个 banner.txt 文件，复制上去在网站生成的内容

```txt

${AnsiColor.GREEN}
 /$$$$$$$  /$$       /$$   /$$ /$$$$$$$$      /$$$$$$$  /$$        /$$$$$$   /$$$$$$
| $$__  $$| $$      | $$  | $$| $$_____/     | $$__  $$| $$       /$$__  $$ /$$__  $$
| $$  \ $$| $$      | $$  | $$| $$           | $$  \ $$| $$      | $$  \ $$| $$  \__/
| $$$$$$$ | $$      | $$  | $$| $$$$$ /$$$$$$| $$$$$$$ | $$      | $$  | $$| $$ /$$$$
| $$__  $$| $$      | $$  | $$| $$__/|______/| $$__  $$| $$      | $$  | $$| $$|_  $$
| $$  \ $$| $$      | $$  | $$| $$           | $$  \ $$| $$      | $$  | $$| $$  \ $$
| $$$$$$$/| $$$$$$$$|  $$$$$$/| $$$$$$$$     | $$$$$$$/| $$$$$$$$|  $$$$$$/|  $$$$$$/
|_______/ |________/ \______/ |________/     |_______/ |________/ \______/  \______/


版本：${spring-boot.version} >>>欢迎使用 BLUE-CMS 后台管理系统<<<

```

## 在 springboot 启动器中

```java
SpringApplication app = new SpringApplication(ManageApplication.class);
app.setBannerMode(Banner.Mode.LOG);
app.run(args);
```
