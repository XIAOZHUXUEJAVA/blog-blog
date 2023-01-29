---
title: docker 容器和镜像的备份
date: '2022-03-08'
tags: ['docker', 'linux', 'ubuntu']
draft: false
summary: To save and push docker container
---

# docker 容器和镜像的备份

## 本地备份

1. 运行一个容器

```shell
docker run -itd --name ubuntu_push_test ubuntu /bin/bash
```

- 若容器没有启动，可以手动启动一下

  ubuntu_push_test 为容器的名字，也可以换成容器的 ID

```shell
docker start ubuntu_push_test
```

- 查看当前启动中的容器

```shell
dockder container ls
```

![image-20221029154833477](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210291548537.png)

2. 提交

```shell
docker commit -m "first commit" -p ubuntu_push_test first_push
```

其中`first commit` 为你的提交信息， `ubuntu_psuh_test`为你的容器名称, `first_push`为你要 push 的镜像

3. 保存到本地宿主机中

```shell
 docker save -o ~/first_save.tar first_push
```

![image-20221029155516252](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210291555298.png)

至此，我们就完成了将镜像保存到本地宿主机的操作，如果想加载本地的 tar 文件的话，可以使用 command：

```shell
docker load -i ~/first_save.tar
```

## 远程备份

1. 登录 docker 账号

```shell
docker logout
docker login
// 然后输入你的密码即可登录
```

2. 将本地的镜像打包

```shell
docker tag first_push xiaoduoge/ubuntu:latest
```

`first_push` 为你要 push 的镜像, `xiaoduoge`为你的用户名， `ubuntu`是你的镜像名，这里也可以是`first_push`，没有关系; `latest`是你自定义的版本号。

3. push

```shell
docker push xiaoduoge/ubuntu:latest
```

4. pull

   ```shell
   docker pull xiaoduoge/ubuntu:latest
   ```

\\wsl$

```shell
docker build -t xiaoduoge/workenv .

docker run -t -i xiaoduoge/workenv /bin/zsh
```
