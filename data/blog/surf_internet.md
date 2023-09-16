---
title: Surf Internet In Linux
date: '2023-03-16'
tags: ['linux']
draft: false
summary: Surf Internet In Linux
---

参考 GitHub 开源项目：

https://github.com/mzz2017/gg/blob/main/README_zh.md

具体使用：

1、下载

```shell
sudo sh -c "$(curl -L https://github.com/mzz2017/gg/raw/main/release/go.sh)"
```

2、查看是否下载成功

```shell
gg --version
```

3、 配置订阅链接

```shell
gg config -w subscription="订阅链接"
```

4、选择节点

```shell
gg --subscription "订阅链接" --select curl ipv4.appspot.com
```

5、测试（在命令前面添加`gg`）

```shell
gg curl -i youtube.com
gg git clone "仓库"
```
