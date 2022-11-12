---
title: docker容器化golang应用
date: '2022-11-12'
tags: ['docker', 'golang']
draft: false
summary: Containerize your golang application
---


# docker容器化golang应用



前言：为什么使用容器化技术？

相比于虚拟机容器化技术的优点：

* 启动快
* 硬盘使用量小
* 性能好
* 系统支持量大
* 有理须开发环境和生产环境的协调

看看这个小demo的目录结构，非常简单，新建一个docker-go文件夹，然后再这个文件夹中新建一个**Dockerfile**文件和**server.go** 



![image-20221003170329772](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/MyGraphBed/master/image-20221003170329772.png)



## 1. 编写一个简单的go server 应用

```go
package main

import (
	"fmt"
	"html"
	"log"
	"net/http"
)

func main() {

	fmt.Println("launching server at port 9090")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		fmt.Fprintf(w, "hello, %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(":9090", nil))

}
```



如果我们的宿主机本身就有go环境的话，我们可以试试这个程序是否正确

```shell
go run server.go
```





浏览器地址中输入`http://localhost:9090/docker-go`，如果返回成功即说明程序没有问题

![image-20221003170345130](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/MyGraphBed/master/image-20221003170345130.png)



## 2. 创建Dockerfile文件

```dockerfile
FROM golang:latest

RUN mkdir /app

WORKDIR /app

ADD . /app

RUN go build -o main ./server.go

EXPOSE 9090

CMD /app/main
```



Dockerfile文件的各行命令代码的作用：

* **FROM golang:latest**   以golang的最新的镜像为基础镜像创建

* **RUN mkdir /app**   在容器中创建一个app文件夹

* **WORKDIR /app**   将这个app认为默认工作文件夹

* **ADD . /app**	将当前目录的下的所有文件加入到这个app工作文件夹中

* **RUN go build -o main ./server.go**  开始build server.go名称任意  (是你的go项目的程序入口)

* **EXPOSE 9090**  向外面暴露9090端口

* **CMD /app/main**  然后运行我们build的生成的可执行文件main.exe

插叙：

如果我们的宿主机环境中没有go语言支持，那么我们无法验证这个程序是否正确，可以首先在环境中安装自己的go语言工作环境，然后测试后进行镜像打包，如果创建镜像后运行的容器实例也没有问题，那么相当于两次测试，一次是在你的宿主机上的测试，一次是在容器中的测试。

## 3. 创建一个镜像



在宿主机的Dockfile文件所在的目录下, 运行命令

```shell
docker build . -t my-go-env1
```

my-go-env1为这个镜像的名称

build . 表示当前目录  即我们Dockerfile所在的文件夹

如果没有报错的话，我们可以使用以下命令来查看镜像是否创建成功

```shell
docker image ls
```

![image-20221003170411373](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/MyGraphBed/master/image-20221003170411373.png)

## 4. 运行镜像创建容器

```shell
docker run -d  -p 9090:9090 --name go-demo1 my-go-env1
```

*  -d 表示后台运行

* -p 表示端口映射  将本地的9090端口映射到容器的9090端口

* go-demo 新建的容器的名称

* my-go-env1 容器所使用的镜像的名称

查看当前有哪些容器在运行

```shell
docker container ls
```

![image-20221003170802220](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/MyGraphBed/master/image-20221003170802220.png)



然后去本地浏览器测试一下是否9090可用（确保先关闭宿主机上之前的测试）

![image-20221003170846628](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/MyGraphBed/master/image-20221003170846628.png)



至此，我们简单的容器化了我们的golang应用

