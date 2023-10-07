### 1. 安装react-router包

```bash
npm i react-router-dom
```

### 2. 添加about组件

```react
// pages/About/index.jsx
import React from "react";
export default function About () {
    return <h1>About~~~</h1>;
}
```

### 3. 修改main.js文件

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

### 3. 修改App.js文件

```react
import React from 'react';
import { Link,Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";

function App(){
    return (
        <div>
            <h1>App</h1>
           <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
           </ul>

           <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
           </Routes>
        </div>
    );
}

export default App;
```

### 4. 解决前端路由刷新404问题

```js
// webpack.dev.js
devServer:{
	hot:true,
	historyApiFallback: true
}
```

### 5. 路由组件单独打包

```react
// App.js
import React, { Suspense,lazy } from 'react'; // 引入懒加载模块
import { Link, Routes, Route } from 'react-router-dom';

// import Home from "./pages/Home";
// import About from "./pages/About";

const Home = lazy(()=> import(/* webpackChunkName: 'home' */ "./pages/Home"))
const About = lazy(()=> import(/* webpackChunkName: 'about' */ "./pages/About"))

function App(){
    return (
        <div>
            <h1>App</h1>
           <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
           </ul>
           <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                </Routes>
           </Suspense>
        </div>
    );
}

export default App;
```





