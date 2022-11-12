---
title: Windows NVM node管理工具的使用
date: '2022-11-11'
tags: ['nodejs', 'nvm']
draft: false
summary: To save and push docker container
---




# Windows NVM node管理工具的使用





下载最新版本：

https://github.com/coreybutler/nvm-windows/releases



在安装目录下打开settings.txt，加入下面文件



```txt
root: D:\Psoftware\nvm\nvm
path: D:\Psoftware\Nodejs
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```



nvm install 16.18.0 加载可能有点慢



查看电脑安装了哪些node版本

nvm list



切换nodejs命令

nvm use 16.18.0