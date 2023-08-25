---
title: CentOS 7 安装WEBLOGIC
date: '2023-08-25'
tags: ['linux']
draft: false
summary: 实习学习
---

# CentOS 7 安装 WEBLOGIC

# 1.JDK 安装

```bash
cd /home/
mkdir java
cd java/
tar -zxvf jdk-8u321-linux-x64.tar.gz
```

```bash
vim /etc/profile
```

添加以下内容到 `/etc/profile`

```bash
JAVA_HOME=/home/java/jdk1.8.0_321
CLASSPATH=.:$JAVA_HOME/lib.tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME CLASSPATH PATH
```

刷新配置，查看当前版本是否生效。

```bash
source /etc/profile
java -version
```

# 2.安装 weblogic

## 2.1 上传安装包

```bash
cd /usr/local/
mkdir weblogic12
cd weblogic12/
```

## 2.2 创建组、用户和设置权限

```bash
groupadd web
useradd -g web weblogic
passwd weblogic
New password: 输入密码（weblogic123）
Retype new password:重复输入密码（weblogic123）
chown -R weblogic:web /home
chown -R weblogic:web /usr/local
```

密码设置出现问题时 可以换用其他的密码

## 2.3 配置静默安装文件

### 2.3.1 配置 wls.rsp 文件

```bash
su - weblogic
cd /home/weblogic/
vim wls.rsp
```

添加如下内容：

```bash
[ENGINE]

#DO NOT CHANGE THIS.

Response File Version=1.0.0.0.0

[GENERIC]

#The oracle home location. This can be an existing Oracle Home or a new Oracle Home   insure having all dir read and write authority

ORACLE_HOME=/usr/local/weblogic12/wlsInstall

#Set this variable value to the Installation Type selected. e.g. WebLogic Server, Coherence, Complete with Examples.

INSTALL_TYPE=WebLogic Server

#Provide the My Oracle Support Username. If you wish to ignore Oracle Configuration Manager configuration provide empty string for user name.

MYORACLESUPPORT_USERNAME=

#Provide the My Oracle Support Password

MYORACLESUPPORT_PASSWORD=<SECURE VALUE>

#Set this to true if you wish to decline the security updates. Setting this to true and providing empty string for My Oracle Support username will ignore the Oracle Configuration Manager configuration

DECLINE_SECURITY_UPDATES=true

#Set this to true if My Oracle Support Password is specified

SECURITY_UPDATES_VIA_MYORACLESUPPORT=false

#Provide the Proxy Host

PROXY_HOST=

#Provide the Proxy Port

PROXY_PORT=

#Provide the Proxy Username

PROXY_USER=

#Provide the Proxy Password

PROXY_PWD=<SECURE VALUE>

#Type String (URL format) Indicates the OCM Repeater URL which should be of the format [scheme[Http/Https]]://[repeater host]:[repeater port]

COLLECTOR_SUPPORTHUB_URL=
```

### 2.3.2 配置 oralnst.loc 文件

```bash
cd /home/weblogic/
vim oralnst.loc
```

添加如下内容

```bash
inventory_loc=/home/weblogic/oraInventory

inst_group=web
```

## 2.4 执行安装

```bash
cd /usr/local/weblogic12/
```

```bash
java -jar fmw_12.2.1.3.0_wls.jar  -silent  -responseFile  /home/weblogic/wls.rsp  -invPtrLoc /home/weblogic/oralnst.loc
```

# 3.配置 weblogic

## 3.1 新建目录和配置环境变量

```bash
mkdir -p /usr/local/weblogic12/wlsInstall/user_projects/domains/pyfile
/usr/local/weblogic12/wlsInstall/wlserver/server/bin/setWLSEnv.sh
```

## 3.2 设置 weblogic 域配置

```bash
cd /usr/local/weblogic12/wlsInstall/user_projects/domains/pyfile
cp /usr/local/weblogic12/wlsInstall/wlserver/common/templates/scripts/wlst/basicWLSDomain.py ./
```

## 3.3 执行 weblogic 域的创建

```bash
/usr/local/weblogic12/wlsInstall/oracle_common/common/bin/wlst.sh basicWLSDomain.py
```

# 4.启动 weblogic

```bash
cd /usr/local/weblogic12/wlsInstall/user_projects/domains/basicWLSDomain/bin
nohup ./startWebLogic.sh &
./stopWebLogic.sh
```

**访问页面：http://ip:7001/console/**

# 5.端口开放

切换到 root 用户

应用 firewall 相关命令控制防火墙

1、查看 firewall 的状态

```bash
firewall-cmd --state
```

2、开放 7001 端口

```bash
firewall-cmd --permanent --add-port=7001/tcp
```

3、查看防火墙的开放的端口

```bash
firewall-cmd --permanent --list-ports
```

4、重启防火墙(修改配置后要重启防火墙)

```bash
firewall-cmd --reload
```

通过以上操作即可实现端口外部访问；

JDK 下载链接：https://www.oracle.com/kw/java/technologies/javase/javase8u211-later-archive-downloads.html

WebLogic 下载链接：https://www.oracle.com/middleware/technologies/weblogic-server-downloads.html
