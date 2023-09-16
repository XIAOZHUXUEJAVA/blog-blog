---
title: Ubuntu20.04 Install MySQL8  ERROR 2002 (HY000)
date: '2023-03-12'
tags: ['docker', 'linux', 'ubuntu']
draft: false
summary: Docker Ubuntu Container SetUp
---

## Ubuntu20.04 Install MySQL8 ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)

在 Ubuntu 安装 MySQL8 的时候出现标题上的问题，最终得以解决，以下是从安装到修复的过程

- 更新源

```shell
sudo apt update
sudo apt upgrade
```

- 删除旧版(如果之前安装的话)

```shell
sudo apt-get purge mysql-server mysql-client
```

- 安装

```shell
sudo apt-get install mysql-server mysql-client
```

- 测试

```shell
mysql -u root -p
```

出现错误

**ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)**

- 修改相应的配置文件得以解决

```shell
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

将`bind-address` 从 127.0.0.1 修改为 `localhost` , 或者直接移除

- 重启 MySQL

```shell
sudo /etc/init.d/mysql restart
```

测试发现没问题，已修复

- 重置 root 账户密码

```shell
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
```

- 刷新权限

```shell
FLUSH PRIVILEGES;
```

- 关闭 mysql 服务

```shell
sudo /etc/init.d/mysql stop
```

补充：退出 docker ubuntu container 的时候出现问题， mysql 的问题：

```shell
➜  ~ exit
zsh: you have suspended jobs.
```

这个消息意味着有一些后台进程已经被暂停并仍在终端会话中运行。为了安全地退出会话，你可以恢复并终止已暂停的作业，或使用 kill 命令终止它们。

输入`jobs` 查看作业编号

```shell
jobs
```

直接 kill：

```zsh
kill %1
```

其中 1 为作业编号

至此，我们可以在 linux 中学习 MySQL 了！
