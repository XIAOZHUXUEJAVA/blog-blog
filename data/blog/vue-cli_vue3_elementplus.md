---
title: 基于vue3+vue-cli使用element-plus ui库
date: '2022-12-09'
tags: ['vue3', 'element']
draft: false
summary: use element-plus ui
---

# 基于vue3+vue-cli使用element-plus ui库

1. 安装

```shell
npm install element-plus --save
```



2. 1 main.js完整引入，这种情况是我们不在乎webpack打包之后的大小

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```



2. 2.1 自动导入，官方比较推荐的方式

```shell
 npm install -D unplugin-vue-components unplugin-auto-import
```



  2.2.2  vue.config.js中配置

```js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const path = require('path');
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});

```



这样我们就可以在template中使用element plus ui的组件了

![image-20221209151752992](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212091517029.png)

![image-20221209151633313](https://raw.githubusercontent.com/XIAOZHUXUEJAVA/GraphBed/main/img/202212091516444.png)