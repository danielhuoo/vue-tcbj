# 快速上手

本文将介绍如果在项目中使用 vue-tcbj。

## 新建你的项目

可以直接参考vue的webpack模板构建方法。本文不再赘述

[use the webpack-simple template](https://vuejs-templates.github.io/webpack/)

## 安装

使用 npm 的方式安装

```bash
npm install vue-tcbj --save
```

## 引入

在 main.js 中写入以下内容:

```js
import Vue from 'vue'
import App from './App'
import t from 'vue-tcbj'
import tConfig from '../tConfig.js'

Vue.use(t, tConfig);

new Vue({
    el: '#app',
    render: h => h(App)
});
```

以上代码便完成了vue-tcbj的引入。接下来只需要对它进行一下配置，马上就能开始运行了

## 配置
在项目根目录创建 tConfig.js文件

!> 推荐使用tConfig命名文件，当然你也可以改为其他名字。

!> 路径不一定是根目录，只要你能成功在main.js里import进来就可以。

请复制[配置](config.md)至js文件内

## 开始使用

至此，一个基于 Vue 和 vue-tcbj 的开发环境已经搭建完毕，现在就可以编写代码了。启动开发模式：

```bash
npm run dev
```

## 如何更新

当本插件发布了新版之后，开发者需要在本地更新你的npm库。 推荐使用 npm-check 一键更新，还有emoji交互哦~


```bash
npm install npm-check

npm-check -u
```