---
title: Ubuntu配置zsh、oh-my-zsh、prezto，配置环境变量
date: '2022-11-08'
tags: ['linux', 'ubuntu', 'config', 'shell']
draft: false
summary: Configure environment variables and zsh on ubuntu linux
---


# Ubuntu配置zsh、oh-my-zsh、prezto，配置环境变量



## 1、Ubuntu配置zsh



### 1.1 为什么我们在Ubuntu上配置zsh替代bash？

不想了解的读者可直接跳过

学过操作系统的读者可能知道，shell提供了一个连接操作系统的接口，它从我们这里收集输入并且根据输入执行程序。当一个程序执行完成时，它会显示程序的输出。也就是说，shell相当于一个“壳子”，用于人机交互。我们常见的shell有：

*  bash 
*  zsh
*  korn
*  Tcsh 
*  Fish

那zsh有什么优点呢?

* 兼容bash，熟悉bash的用户可以轻松上手
* 有精彩绝伦的高亮功能

* **对颜值党来说，有诸多惊艳的主题**（最吸引笔者这个菜鸡的地方）
* 自动更正
* 脚本语法相对简单

   等等



### 1.2 安装配置zsh



查看当前的shell

```shell
echo $SHELL
```

![image-20221023233936197](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210232339294.png)

安装zsh

这里使用 `-y`，比如我们在安装的时候 需要我们输入    y   确认，这里就直接一行命令过了

```shell
apt update
// 如果有sudo的话跳过这一步
apt install sudo 
sudo apt install zsh -y
```



切换到zsh， 同理，如果我们想要重新bash shell，`chsh -s /bin/bash`可以切换到bash  shell

```shell
chsh -s /bin/zsh
```



重启

```shell
reboot
```



但是有可能你重启之后发现，界面很丑，甚至不如原来的bash shell 好用，因此我们可以下载oh-my-zsh来借此美化我们的shell

![image-20221023234454294](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210232344333.png)

### 1.3 安装oh-my-zsh



oh-my-zsh的优点:

可以配置诸多主题，和便捷的插件

```shell
// 安装git，已有的可以跳过
apt install git
apt install curl
sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
```



![image-20221023235207869](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210232352927.png)



如果这个主题你觉得不错，那就不用换了，但是下面这个p10k主题是目前最受欢迎的之一。



安装 p10k主题

```shell

git clone --depth=1 https://gitee.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```



在用户的home目录下修改`.zshrc`文件, 修改主题"powerlevel10k/powerlevel10k", 保存并退出

```shell
// 有vim可以跳过
apt install vim

vim .zshrc
```

![image-20221024000300301](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240003348.png)



生效文件

```shell
source .zshrc
```

![image-20221024000710610](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240007669.png)

这个配置根据自己的喜好，可以去去Google或者Bing搜索自己喜欢的主题，b站也有响应的教程，尽量一次配置好。这里我展示一个简介的配置

![image-20221024001811609](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240018657.png)

![image-20221024001847828](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240018879.png)

![image-20221024001913283](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240019327.png)



* 这里选择Lean简洁风格，Rainbow则相对花哨美观

![image-20221024001949696](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240019778.png)



* 字节设置为Unicode即可，避免乱码问题，如果读者遇到乱码问题，可以相应搜索解决方案，可能需要下载相应的字体

![image-20221024002041651](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240020695.png)

* 选256种颜色，比较美观



![image-20221024002123116](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240021165.png)



* 根据个人喜好，这里选择是不展示当前时间

![image-20221024002156359](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240021414.png)

* 这个也是根据个人喜好选择输入在当前行还是下一行

![image-20221024002229139](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240022197.png)



* 这个一般选2即可，稍微宽松一点

![image-20221024002255017](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240022075.png)

![image-20221024002404835](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240024891.png)

![image-20221024002442479](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240024532.png)

![image-20221024002502129](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240025179.png)

![image-20221024002527641](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240025682.png)



至此完成oh-my-zsh的配置，当然读者也可以选择花哨一点的，但是个人比较喜欢简洁风格

![image-20221024002750508](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240027557.png)

如果读者不喜欢简洁风，我们可以使用命令重新对我们的powerlevel10k主题进行修改

```bash
p10k configure
```

![image-20221024005004603](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240050641.png)

### 1.4 安装prezto

prezto是oh-my-zsh的一个分支，基本上已对其重写，以使所有内容都更加干净和整洁，所以更加轻量（个人一直在使用）。

这个安装教程在github上也有我直接给出地址:

```
https://github.com/sorin-ionescu/prezto
```

按照相应的步骤操作即可（前提是安装了zsh），由于是github，可能需要科学上网，读者如果对自己的网络非常自信的话，直接去github。这里笔者给出搬运的教程

在用户的home目录下

1. 

```bash
git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
```

2. 

```bash
setopt EXTENDED_GLOB
for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

3. 

```bash
chsh -s /bin/zsh
```



新建一个zsh terminal 查看结果，也是相对比较简洁好用，而且相对于oh-my-zsh

![image-20221024004455976](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240044020.png)





## 2、 配置环境变量



既然我们换了一种shell外壳，环境变量的配置也会有些许相应的改变，这里以配置golang语言的环境变量等为例

在用户的home目录下

* 下载go语言安装包

```bash
sudo wget https://golang.google.cn/dl/go1.17.5.linux-amd64.tar.gz
```

* 解压

```bash
sudo tar xfz go1.18.5.linux-amd64.tar.gz -C /usr/local
```

* `sudo vim .zshrc`，在后面添加以下代码，保存退出

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/gowork
export GOBIN=$GOPATH/bin
export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH
```



![image-20221024005723748](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240057838.png)

* `.zshrc`文件中配置的环境变量生效

```bash
 source .zshrc
```

* 测试

```bash
go env
```



![image-20221024010027667](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240100724.png)



重启一个zsh 终端，再次输入`go env` 命令测试



新建一个main.go

```bash
touch main.go
vim main.go
```

代码如下

```go
package main

import "fmt"

func main() {

        fmt.Println("hello, 你好")
}
```



```bash
go run main.go
```

![image-20221024010730125](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210240107163.png)

至此，我们完成了Ubuntu对zsh的一些相应的配置