---
title: github+typora+picgo
date: '2022-03-08'
tags: ['github', 'config']
draft: false
summary: Example of Cpp
---



# Github + Typora + PicGo 搭建个人图床



## 1. Github

我们把讲述Github放在教程的第一位的原因是，如果连GitHub都不能用的话，此教程直接作废。

### 1.1 github相关

首先我们需要一个GitHub账号，但是github.com有时候不能访问，需要科学上网，这里推荐一个开发者的边车工具------dev-sidercar，这里贴出了具体网址，如果读者发现某一天你的github浏览还算流畅，就趁这个流畅的机会赶紧下载这个工具，当然这里也不是广告，因为这个工具确实好用。实在不行，可网盘自取，或者私信

![image-20221020202434700](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202024741.png)

```
链接：https://pan.baidu.com/s/1-C0cjbPqa5734OOGii0n5Q 
提取码：0307 
```

### 1.2 新建一个github图片仓库



这一步和创建普通的代码仓库差不多

1. 点击右上角 "+"，New repository

![image-20221020203100735](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202031772.png)



2. 填写相应信息

* Repository name 自己设置一个仓库名称
* 设置为public任何人可以访问
* Add a README file
* Create resposity

![image-20221020203909690](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202039765.png)





3. 创建token令牌



* 点击右上角你的头像，点击Settings

![](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202043780.png)



* 找到Developer settings

![image-20221020204820483](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202048522.png)

* 点击Tokens(classic)

![image-20221020205019557](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202050592.png)





* 点击Generate new token 创建即可

![image-20221020205347007](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202053044.png)







* 填写token相关信息

![image-20221020205716360](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202057432.png)





* 点击Generate token

* 得到token

   注意，我们的token只能看到一次，因此我们需要备份起来，以防丢失

![image-20221020210109212](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202101251.png)





## 2. PicGo



* 下载安装

  这里给出下载链接

```
https://github.com/Molunerfinn/picgo/releases
```

较慢的话，也可以在步骤1中给到的百度网盘中下载。

* 配置

  找到**图床设置**， **GitHub设置**



 ![image-20221020211804972](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202118027.png)





* 仓库名： for example ： xiaoduoge/Bed   其中xiaoduoge为我们github用户名，Bed为我们刚才新建的仓库
* 分支名：一般为main，不确定的话可以查看我们刚才新建的仓库的

​    ![image-20221020212150683](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202121727.png)

* token：为我们刚才创建的token值，这里一定要注意，不要复制多余的空格之类的
* 存储路径：这个/img在我们上传图片成功的时候会自动创建这个文件夹，无关紧要
* 自定义域名：本人在一开始直接使用的是`https://raw.githubusercontent.com/用户名/仓库名/main`，如果可用的话，我们就可以直接只用这个域名，否则我们还可以使用免费的CDN加速一下：`https://cdn.jsdelivr.net/gh/用户名/仓库名`
* 确定，设为默认图床



* 转到PicGo设置中，设置时间戳重名打开



![image-20221020213125728](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202131783.png)





* server设置



![image-20221020213300853](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202133906.png)

![image-20221020213229506](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202132545.png)

其中监听端口一定要与Typora中的一致，待会阐述

## 3. Typora



很可惜，这个软件收费，但我相信你手里有，就算没有，我们可以去百度、Google、微信公众号等搜索破解版，当然，有能力的伙伴们还是支持正版！！！



打开偏好设置

![image-20221020213848884](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202138928.png)

![image-20221020213939612](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202139681.png)



设置如上

* 选择上传图片

* 上传服务：PicGo（app）
* PigGo路径为你所安装的路径

* 验证图片上传选项

![image-20221020214338917](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202143966.png)





## 4. 后续



个人只遇到了401的错误，大概率是你的token复制错误了，可以确认无误后重新复制一下，或者重新生成一个token。如下

![image-20221020214715101](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202210202147152.png)





参考文章  [使用Picgo+GitHub+ jsDelivr搭建CDN加速免费图床 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1651601)

如有错误和冒犯，欢迎指正！