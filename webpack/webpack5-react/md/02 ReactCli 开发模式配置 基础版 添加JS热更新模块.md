react js模块 热更新

### 1. 安装对应包

```bash
npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

### 2.使用方法：

```javascript
// webpack.dev.js

// 1. 设置hot为true
devServer:{
	hot:true,
}

// 2. 引入插件
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 3. 设置js的rules
{
    test: /\.(jsx|js)$/,
    include: path.resolve(__dirname, "../src"),
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      cacheCompression: false,
      /*** 此处为新增代码 ***/
      plugins: [
          'react-refresh/babel'
      ]
      /*** 此处为新增代码 ***/
    },
}
 
// 4. new 插件
plugins: [
    new ReactRefreshWebpackPlugin()
]
```





