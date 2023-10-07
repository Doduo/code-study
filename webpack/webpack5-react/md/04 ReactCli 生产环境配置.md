### 1. 下载css依赖

```bash
npm i mini-css-extract-plugin css-minimizer-webpack-plugin -D
```

### 2. 下载图片依赖

```bash
npm i image-minimizer-webpack-plugin imagemin -D

// 无损压缩
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```

### 3. 配置package.json

```json
// 添加 build 参数
"scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js"
  },
```

### 4. 打包ico图标等公共文件

```javascript
// 1. 下载依赖
npm install copy-webpack-plugin --save-dev

// 2. webpack.prod.js中引入调用
const CopyPlugin = require("copy-webpack-plugin");

plugin: [
    // ...
    new CopyPlugin({
        patterns: [
            {
              from: path.resolve(__dirname, "../public"),
              to: path.resolve(__dirname, "../dist"),
              globOptions: {
                ignore: ["**/index.html"], // 忽略index.html文件不拷贝
              },
            },
            //{from: "other", to: "public"},
        ]
    })
]
```

### 5. 执行命令 构建打包

```bash
npm run build
```



### dev与prod差异对比

![devandproreactddiff](http://qn.flywb.com/img/devandproreactddiff.png)