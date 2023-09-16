---
title: docker 运行一个Ubuntu 容器 无法启动的问题
date: '2022-03-08'
tags: ['docker', 'linux', 'ubuntu']
draft: false
summary: To solve the problem that ubuntu_container_start_error
---

我的环境 : Windows docker desktop + WSL2 Ubuntu 20.04 + Windows Terminal

## 问题操作

1. 运行一个 Ubuntu 容器 (这一步已经有问题了)

```shell
docker run -d --name ubuntu_exit_problem1 ubuntu
```

![image-20221027195142922](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271951958.png)

2. 查看已有的容器：

```shell
docker ps -a
```

![image-20221027195353295](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271953328.png)

发现我们已经根据 Ubuntu 镜像创建了一个容器

3. 查看在运行的容器

```shell
docker container ls
```

![image-20221027195300192](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271953235.png)

但是发现没有在运行的容器

4. 手动启动一下创建的 Ubuntu 容器

```shell
docker start 559bb20d519f
```

![image-20221027195540889](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271955929.png)

然后再次查看正在运行的容器 `docker container ls`

![image-20221027195633534](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271956572.png)

发现容器依然没有启动成功

5. 然后我们尝试进入这个容器

```shell
 docker exec -it 559bb20d519f bash
```

报错：容器没有启动

![image-20221027195743498](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271957535.png)

## 解决方案

运行容器命令加上 `-it` 表示交互式操作，t 表示终端

成功案例如下：

1. 运行一个 Ubuntu 容器

```shell
docker run -itd --name ubuntu_exit_problem ubuntu
```

![image-20221027192815138](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271928163.png)

查看已有的容器：

```shell
docker ps -a
```

![image-20221027192922807](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271929851.png)

发现我们的 COMMAND 是以 bash shell 的终端

查看在运行的容器

```shell
docker container ls
```

![image-20221027193041102](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271930142.png)

![image-20221027190342700](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271903808.png)

然后我们再进入这个容器

```shell
docker exec -it 65d6bc6bc4f4 bash
```

![image-20221027194107405](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210271941444.png)

问题解决！！！！
