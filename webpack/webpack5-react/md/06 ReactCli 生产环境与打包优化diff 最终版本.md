### 1. 自定义主题配置

```react
// 1. 安装依赖(5版本找不到antd.less文件)
// npm i antd@4.24.2

// 2. main.js 引入antd.less
import "antd/dist/antd.less"

// 3. App.jsx 使用antd
import { Button } from "antd";

 return (
    <div>
      <h1>App</h1>
      <Button type="primary">按钮</Button>
      <!--......-->   
     </div>
 )

// 4. webpack.config.js 文件修改
preProcessor && {
  loader: preProcessor,
  options:
    preProcessor === "less-loader"
      ? {
          // antd 自定义主题配置
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        }
      : {},
},
```

### 2. 打包优化

由于引入了react、antd等第三方库，打包node_modules目录下生成的文件比较大、需要优化，具体配置如下

```json
// webpack.config.js
optimization: {
    splitChunks: {
        chunks: "all",
		cacheGroups: {
            // react react-dom react-router-dom 一起打包成一个js文件
            react: {
              test: /[\\/]node_modules[\\/]react(.*)?[\\/]/, // 需要打包的文件
              name: "chunk-react",
              priority: 40, // 打包权重
            },
            // antd 单独打包
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: "chunk-antd",
              priority: 30,
            },
            // 剩下node_modules单独打包
            libs: {
              test: /[\\/]node_modules[\\/]/,
              name: "chunk-libs",
              priority: 20,
            },
     	 },
    }
}
```

![reactCli 生产环境与打包优化diff](http://qn.flywb.com/img/reactCli%20%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E4%B8%8E%E6%89%93%E5%8C%85%E4%BC%98%E5%8C%96diff.png)