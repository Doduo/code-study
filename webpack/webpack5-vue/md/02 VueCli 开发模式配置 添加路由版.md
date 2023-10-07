### 1. 安装路由依赖

```bash
npm i vue-router
```

### 2. 添加路由配置目录

```javascript
// scr/router/index.js
import { createRouter,createWebHistory } from "vue-router";

const Home = ()=> import('../views/Home')
const About = ()=> import('../views/About')

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        }
    ]
})
```

### 3. 添加vue子组件

```vue
<!-- 1. src/Home/index.vue -->
<template>
    <h1 class="home-title">Home~~~</h1>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style>
.home-title {
    color: deeppink;
    font-size: 30px;
}
</style>

<!-- 2. src/About/index.vue -->
<template>
    <h1>About~~~</h1>
</template>

<script>
    export default {
        name: "About",
    }
</script>

<style>
</style>
```

### 4. 修改 App.vue 文件 引入路由资源

```vue
<template>
    <div>
        <h1 class="title">Hello app</h1>
        <ul>
            <li>
                <router-link to="/home">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
        <router-view />
    </div>
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

### 5. 修改 main.js 文件

```javascript
import { createApp } from "vue";
import App from './App';

import router  from "./router";

// 挂载前 use router
createApp(App).use(router).mount(document.getElementById("app"));
```

### 6. 运行

```bash
npm start
```



