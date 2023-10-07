### 1. 创建webpack.dev.js文件

```javascript
// webpack.dev.js
const path = require("path");
const { DefinePlugin } = require("webpack"); // 专门定义环境变量给代码使用
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

const getStyleLoaders = (preProcessor) => {
  return [
    "vue-style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
      },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new VueLoaderPlugin(),
    // cross-env 定义的环境变量给打包工具使用
    // DefinePlugin 定义的环境变量给源代码使用，从而解决Vue3页面警告的问题
    new DefinePlugin({
      __VUE_OPTIONS_API__: true, // vue options api 是否运行用
      __VUE_PROD_DEVTOOLS__: false // 生产环境中开发工具是否出现
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".vue", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3010,
    hot: true, // 开启HMR
    historyApiFallback: true, // 解决前端路由刷新404问题
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

### 2. 初始化项目

```bash
// 生成 package.json文件
npm init -y

// 在 package.json 文件中添加以下代码来指定浏览器兼容情况
"browserslist": [
	"last 2 version",
	"> 1%",
	"not dead"
],
```

### 3. 安装依赖

```bash
// 1. 安装css依赖
npm i html-webpack-plugin vue-style-loader css-loader postcss-loader postcss-preset-env less-loader sass-loader sass stylus-loader -D

// 2. 安装babel eslint 依赖
npm i babel-loader @vue/cli-plugin-babel @babel/eslint-parser eslint-plugin-vue eslint-webpack-plugin -D

// 3. 安装 webpack 及devserver依赖
npm i webpack webpack-cli webpack-dev-server -D

// 4. 安装 vue 及 vue 依赖(vue需要安装到生产依赖)
npm i vue
npm i vue-loader vue-template-compiler -D 

// 5. 安装 cross-env
npm i cross-env -D
```

### 4. 创建 .eslintrc.js文件

```javascript
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    parserOptions: {
        parser: "@babel/eslint-parser"
    }
}
```

### 5. 创建babel.config.js文件

```javascript
module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"]
}
```

### 6. 创建vue项目页面

#### 6.1 创建 main.js 文件

```javascript
// src/main.js
import { createApp } from "vue";
import App from './App';

createApp(App).mount(document.getElementById("app"));
```

#### 6.2 创建 App.vue 文件

```vue
<!-- src/App.vue -->
<template>
    <h1 class="title">Hello app</h1>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style>
.title {
    color: pink;
}
</style>
```

#### 6.3 创建 index.html 页面

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue Cli</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### 7. 运行

```bash
npm start
```



