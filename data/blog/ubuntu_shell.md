---
title: 使用Shell脚本文件配置Docker Ubuntu Container
date: '2022-12-21'
tags: ['docker', 'linux', 'ubuntu']
draft: false
summary: Docker Ubuntu Container SetUp Use Shell
---

## 3. shell

### 3.1 准备工作

新建一个 docker 容器

```shell
dokcer run -itd --name ubuntu-sh ubuntu
```

进入容器

```shell
docker exec --it ubuntu-sh /bin/bash
```

更新 apt

```shell
apt update
```

进入根

```shell
cd root
```

安装 sudo

```shell
apt install sudo
```

安装 vim

```shell
sudo apt install vim -y
```

### 3.2 zsh

新建脚本文件

```shell
vim .zsh.sh
```

```sh
echo "====================update apt====================\n"
sudo apt update -y && sudo apt upgrade -y

echo "====================changing shell to zsh====================\n"
sudo apt install zsh git curl wget -y

chsh -s $(which zsh)
# Install Oh-My-Zsh
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
zsh

```

保存后，赋予权限

```shell
sudo chmod u+x .zsh.sh
```

运行脚本

```shell
./.zsh.sh
```

### 3.3 环境

#### 3.3.1 安装

新建一个.java_go_install.sh 文件

```shell
# install java8
sudo apt install openjdk-8-jdk -y
# install go
sudo wget https://golang.google.cn/dl/go1.18.5.linux-amd64.tar.gz
# unzip to /usr/local
sudo tar xfz go1.18.5.linux-amd64.tar.gz -C /usr/local
# delete zip
rm -rf go1.18.5.linux-amd64.tar.gz
```

```shell
# 赋予权限
sudo chmod u+x .java_go_install.sh
# 运行
./.java_go_install.sh
```

#### 3.3.2 配置变量

新建一个 env_java_go.sh 脚本文件

```shell
vim .java_go_env.sh
```

输入环境变量

```sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_TOOL_OPTIONS="-Dfile.encoding=UTF-8"


export GOROOT=/usr/local/go
export GOPATH=$HOME/gowork
export GOBIN=$GOPATH/bin
export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH
```

在~/.zshrc 文件中输入

```shell
source ~/.java_go_env.sh
```

然后使用命令

```shell
source ~/.zshrc
```

重启

补充：

`export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH` 和 `export PATH=$JAVA_HOME/bin:$PATH`会不会出现冲突？

不会。`export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH` 和 `export PATH=$JAVA_HOME/bin:$PATH` 这两条命令均在设置环境变量 `PATH` 的值。

在这两条命令中，第一条命令中的 `$GOPATH:$GOBIN:$GOROOT/bin` 是将 Go 的工作区路径、可执行文件的路径和 Go 的安装路径添加到 `PATH` 中。第二条命令中的 `$JAVA_HOME/bin` 则是将 Java 的安装路径添加到 `PATH` 中。

两条命令中都有 `:$PATH`，这意味着它们会将原来 `PATH` 中的路径保留下来。因此，这两条命令不会冲突，而是会将 Go 和 Java 的路径都添加到 `PATH` 中。

#### 3.3.3 整合一下所有的.sh 文件

我们只需要运行一下这三个脚本文件，就可以初步的使用这个容器了！

.zsh.sh

```sh
echo "====================update apt====================\n"
sudo apt update -y && sudo apt upgrade -y

echo "====================changing shell to zsh====================\n"
sudo apt install zsh git curl wget -y

chsh -s $(which zsh)
# Install Oh-My-Zsh
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
zsh
```

.lang.sh

```shell
echo "====================update apt====================\n"
sudo apt update -y && sudo apt upgrade -y

echo "====================install go====================\n"
sudo wget https://golang.google.cn/dl/go1.18.5.linux-amd64.tar.gz
sudo tar xfz go1.18.5.linux-amd64.tar.gz -C /usr/local
rm -rf go1.18.5.linux-amd64.tar.gz

echo "export GOROOT=/usr/local/go" >> ~/.zshrc
echo "export GOPATH=\$HOME/gowork" >> ~/.zshrc
echo "export GOBIN=\$GOPATH/bin" >> ~/.zshrc
echo "export PATH=\$GOPATH:\$GOBIN:\$GOROOT/bin:\$PATH" >> ~/.zshrc


echo "====================install java8====================\n"
sudo apt install openjdk-8-jdk -y
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> ~/.zshrc
echo "export PATH=\$JAVA_HOME/bin:\$PATH" >> ~/.zshrc
echo "export CLASSPATH=.:\$JAVA_HOME/lib/dt.jar:\$JAVA_HOME/lib/tools.jar" >> ~/.zshrc
echo "export JAVA_TOOL_OPTIONS=\"-Dfile.encoding=UTF-8\"" >> ~/.zshrc

echo "====================install c/c++====================\n"
sudo apt install build-essential gdb camke -y

echo "====================install python3====================\n"
sudo apt install python3 -y
sudo apt install python3-venv -y
sudo apt install python3-setuptools -y

echo "====================install nodejs====================\n"
# install npm
sudo apt install npm -y
# switch to taobao mirror source
sudo npm config set registry https://registry.npmmirror.com/
# install nodejs
sudo apt install nodejs -y
# install nodejs manangement tools
sudo npm install n -g -y
# update nodejs to stable version
sudo n stable
# install to long dont read
sudo npm install -g tldr -y

echo "====================install redis====================\n"
sudo apt-get install -y redis-server
```

.tools.sh 后续有什么需要的工具我们在这个脚本文件中添加，添加一些我们需要使用的工具或者软件

```shell
# install neovim
sudo apt install neovim -y
```

更多请浏览：
github repository ： https://github.com/XIAOZHUXUEJAVA/dotfiles/tree/master/docker_ubuntu
