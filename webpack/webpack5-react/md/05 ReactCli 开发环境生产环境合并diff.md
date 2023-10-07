### 1. 修改运行指令

```json
// package.json
"scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.config.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
},
```

### 2. 执行对应命令

```bash
// 开发环境
npm run start

// 生产环境
npm run build
```

### 3. 合并后文件diff

![react开发环境生产环境合并diff](http://qn.flywb.com/img/react%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E5%90%88%E5%B9%B6diff.png)