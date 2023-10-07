### 1. 创建webpack.dev.js文件

```javascript
// config/webpack.dev.js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getStyleLoaders = (preProcessor) => {
  return [
    "style-loader",
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
        oneOf: [
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
            test: /\.(jsx|js)$/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
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
    extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 3010,
    hot: true,
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};
```

### 2. 初始化项目

```
// 生成 package.json文件
npm init -y

// 在 package.json 文件中添加以下代码来指定浏览器兼容情况
"browserslist": [
	"last 2 version",
	"> 1%",
	"not dead"
],
```



### 3. 创建 .eslintrc.js文件

```javascript
module.exports = {
  extends: ["react-app"], // 继承 react 官方规则
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],
    },
  },
};
```

### 4. 创建babel.config.js文件

```javascript
module.exports = {
  // 使用react官方规则
  presets: ["react-app"],
};
```

### 5. 创建 react 基本文件

#### 5.1 创建 main.js文件

```react
// src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
```

#### 5.2 创建App.jsx文件

```react
// src/App.jsx
import React from 'react'

function App(){
    return <h1>App</h1>;
}

export default App;
```

#### 5.3 创建index.html文件

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Cli</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

### 6. 安装依赖包

#### 6.1 按照步骤安装所需依赖包

```bash
// 1. 安装css依赖
npm i eslint-webpack-plugin html-webpack-plugin style-loader css-loader postcss-loader postcss-preset-env less-loader sass-loader sass stylus-loader -D

// 2. 安装babel eslint 依赖
npm i babel-loader @babel/core babel-preset-react-app eslint-config-react-app -D

// 3. 安装 webpack 及devserver依赖
npm i webpack webpack-cli webpack-dev-server -D

// 4. 安装 react 依赖 （他们不需要添加到开发依赖，是线上运行的依赖）
npm i react react-dom

// 5. 安装 cross-env
npm i cross-env -D
```

#### 6.2 配置package.json 启动项参数

```json
"scripts": {
	"start": "npm run dev",
	"dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js"
},
```

#### 6.3 最终package.json文件代码

```bash
{
  "name": "react-cli",
  "version": "1.0.0",
  "description": "",
  "main": ".eslintrc.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
  ],
  "devDependencies": {
    "@babel/core": "^7.22.15",
    "babel-loader": "^9.1.3",
    "babel-preset-react-app": "^10.0.1",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "eslint-config-react-app": "^7.0.1",
    "eslint-webpack-plugin": "^4.0.1",
    "html-webpack-plugin": "^5.5.3",
    "less-loader": "^11.1.3",
    "postcss-loader": "^7.3.3",
    "postcss-preset-env": "^9.1.3",
    "sass": "^1.66.1",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "stylus-loader": "^7.1.3",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}

```

#### 7. 启动项目

```bash
npm start
```



