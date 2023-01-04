# React 路由

## 路由的理解

何为路由？

- 一个路由是一个映射关系
- `key` 为路径，`value` 可能是 `function` 或 组件

后端路由：

- `value` 是 `function` ，用于处理客户端的请求
- 注册路由：`router.get(path, function(req, res))`
- 工作过程：Node 接收到请求，根据路径匹配路由，调用对应函数处理请求，返回响应数据

前端路由：

- `value` 是组件
- 注册路由：`<Route path="/test" component={Test}>`
- 工作过程：浏览器路径变为 `/test` ，展示 `Test` 组件

## 路由基本使用

安装 `react-router-dom` ：

```bash
// 安装 5.X 版本路由
npm install react-router-dom@5.2.0 -S

// 最新已经 6.X 版本，用法和 5.X 有所不同
npm install react-router-dom -S
```

`6.x` 版本的用法参考[文章](https://zhuanlan.zhihu.com/p/191419879)

以 `5.x` 版本为例展示基本使用：

导航区使用 `<Link>`，展示区使用 `<Route>`。

```js
// App.jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="list-group">
          <Link className="list-group-item" to="/about">
            About
          </Link>
          <Link className="list-group-item" to="/home">
            Home
          </Link>
        </div>
        <div className="panel-body">
          <Route path="/about" component={About} />
          <Route path="/home" component={Home} />
        </div>
      </div>
    )
  }
}
```

`<App>` 的最外侧包裹 `<BrowserRouter>` 或 `<HashRouter>` ：

```js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

## 路由组件和一般组件

1. 写法不同：

- 一般组件：`<Demo/>`
- 路由组件：`<Route path="/demo" component={Demo}/>`

2. 存放位置不同：

- 一般组件：`components`
- 路由组件：`pages`

3. 接收到的 `props` 不同：

- 一般组件：标签属性传递
- 路由组件：接收到三个固定的属性

```js
history:
  go: ƒ go(n)
  goBack: ƒ goBack()
  goForward: ƒ goForward()
  push: ƒ push(path, state)
  replace: ƒ replace(path, state)

location:
  pathname: "/home/message/detail/2/hello"
  search: ""
  state: undefined

match:
  params: {}
  path: "/home/message/detail/:id/:title"
  url: "/home/message/detail/2/hello"
```

## NavLink 的使用

`NavLink` 可以实现路由链接的高亮，通过 `activeClassName` 指定样式名，默认追加类名为 `active` 。

```html
<NavLink activeClassName="demo" to="/about">About</NavLink>

<NavLink activeClassName="demo" to="/home">Home</NavLink>
```

封装 `NavLink` 组件：由于 `NavLink` 组件中重复的代码太多，因此进行二次封装。

※ 细节点：组件标签的内容会传递到 `this.props.children` 属性中，反过来通过指定标签的 `children` 属性可以修改组件标签内容

```js
// MyNavLink 组件
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    // this.props.children 可以取到标签内容，如 About, Home
    // 反过来通过指定标签的 children 属性可以修改标签内容
    return <NavLink activeClassName="demo" className="list-group-item" {...this.props} />
  }
}
```

```html
<MyNavLink to="/about">About</MyNavLink>

<MyNavLink to="/home">Home</MyNavLink>
```

## Switch 的使用

`Switch` 可以提高路由匹配效率，如果匹配成功，则不再继续匹配后面的路由，即单一匹配。

```html
<!-- 只会展示 Home 组件 -->
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Route path="/home" component="{Test}" />
</Switch>
```

## 解决多级路径刷新页面样式丢失的问题

- `public/index.html` 中 引入样式时不写 `./` 写 `/` （常用）
- `public/index.html` 中 引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）
- 使用 `HashRouter`

```html
<link rel="stylesheet" href="/css/bootstrap.css" />

<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css" />
```

## 路由的严格匹配与模糊匹配

- 默认使用模糊匹配（输入的路径必须包含要匹配的路径，且顺序一致）
- 开启严格匹配：`<Route exact path="/about" component={About}/>`
- 严格匹配需要再开，开启可能会导致无法继续匹配二级路由

## Redirect 的使用

- 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由

```html
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>
```

## 嵌套路由

- 注册子路由需写上父路由的 `path`
- 路由的匹配是按照注册路由的顺序进行的

```html
<!-- 父组件 -->
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home">Home</MyNavLink>

<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>
```

```html
<!-- 子组件 -->
<ul className="nav nav-tabs">
  <li>
    <MyNavLink to="/home/news">News</MyNavLink>
  </li>
  <li>
    <MyNavLink to="/home/message">Message</MyNavLink>
  </li>
</ul>

<Switch>
  <Route path="/home/news" component="{News}" />
  <Route path="/home/message" component="{Message}" />
  <Redirect to="/home/news" />
</Switch>
```

## 路由传参

三种方式：`params, search, state` 参数

三种方式对比：

- `state` 方式当前页面刷新可保留参数，但在新页面打开不能保留。前两种方式由于参数保存在 URL 地址上，因此都能保留参数。
- `params` 和 `search` 参数都会变成字符串

```html
<!-- 路由链接 -->
<Link to='/home/message/detail/Bruce/21'>params</Link>
<Link to={`/home/message/detail/${item.name}/${item.age}`}>{item.name}</Link>

<Link to='/home/message/detail/?name=Bruce&age=21'>search</Link>
<Link to={`/home/message/detail/?id=${item.name}&title=${item.age}`}>{item.name}</Link>

<Link to={{pathname: '/home/message/detail', state: {name: 'Bruce', age: 21}}}>state</Link>

<!-- 注册路由 -->
<Route path='/home/message/detail/:name/:age' component={Detail} />
<!-- search 和 state 按正常注册即可 -->
<Route path='/home/message/detail' component={Detail} />
```

```js
//接收参数
const { name, age } = this.props.match.params

import qs from 'querystring'
const { search } = this.props.location
const { name, age } = qs.parse(search.slice(1))

const { name, age } = this.props.location.state
```

## 编程式导航

编程式导航是使用路由组件 `this.props.history` 提供的 API 进行路由跳转：

```js
this.props.history.push(path, state)
this.props.history.replace(path, state)
this.props.history.goForward()
this.props.history.goBack()
this.props.history.go(n)
```

```js
// 编程式导航传参
this.props.history.push(`/home/message/detail/${id}/${title}`)
this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
this.props.history.push(`/home/message/detail`, { id: id, title: title })
```

## withRouter 的使用

`withRouter` 的作用：加工一般组件，让其拥有路由组件的 API ，如 `this.props.history.push` 等。

```js
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {
  ...
}

export default withRouter(Header)
```

## BrowserRouter 和 HashRouter

底层原理不一样：

- `BrowserRouter` 使用的是 H5 的 history API，不兼容 IE9 及以下版本。
- `HashRouter` 使用的是 URL 的哈希值。

路径表现形式不一样

- `BrowserRouter` 的路径中没有 `#` ，如：`localhost:3000/demo/test`
- `HashRouter` 的路径包含#，如：`localhost:3000/#/demo/test`

刷新后对路由 `state` 参数的影响

- `BrowserRouter` 没有影响，因为 `state` 保存在 `history` 对象中。
- `HashRouter` 刷新后会导致路由 `state` 参数的丢失！

备注：`HashRouter` 可以用于解决一些路径错误相关的[问题](#解决多级路径刷新页面样式丢失的问题)。





# React Router 6 <img src="./images/react-router.png" style="width:30px;" />

[官方文档](https://reactrouter.com/)

## 概述

React Router 发布了三个不同的包：

- `react-router`：路由核心库，提供许多组件、钩子
- `react-router-dom`：包括了 `react-router` 所有内容，同时添加了用于 DOM 的组件，如 `<BrowserRouter>`
- `react-router-native`：包括了 `react-router` 所有内容，同时添加了用于 ReactNative 的 API，如 `<NativeRouter>`

与 React Router 5.x 版本的区别：

- 内置组件的变化：移除 `<Switch/>`，新增 `<Routes/>`……
- 语法变化：`component={About}` 变成 `element={<About/>}`……
- 新增 hook：`useParams`、`useNavigate`、`useMatch`……
- 官方明确表示推荐使用函数式组件

## 基本使用

安装 6 版本的 React Router。

```shell
npm install react-router-dom
```

`index.js` 文件引入 `<BrowserRouter>`。

```jsx
// 从 react-dom/client 引入 ReactDOM
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// React 18 的语法发生改变了
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

`App.js` 设置路由链接和注册路由。`<Route caseSensitive>` 属性用于指定匹配时是否区分大小写（默认为 false）。

```jsx
import { NavLink, Routes, Route } from 'react-router-dom'
import About from './components/About/About'
import Hello from './components/Hello/Hello'

// React 18 默认使用函数式组件了
export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
      </Routes>
    </div>
  )
}
```

## `<BrowserRouter>`

`<BrowserRouter> ` 用于包裹整个应用。

```jsx
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

## `<HashRouter>`

作用与 `<BrowserRouter>` 一样，但 `<HashRouter>` 修改的是地址栏的 hash 值。

6.x 版本中 `<HashRouter>`、`<BrowserRouter>` 的用法与 5.x 相同。

## `<Routes/>`

6 版本中移出了 `<Switch>`，引入了新的替代者：`<Routes>`。

`<Routes>` 和 `<Route>` 要配合使用，且必须要用 `<Routes>` 包裹 `<Route>`。

## `<Navigate>` 重定向

只要 `<Navigate>` 组件被渲染，就会修改路径，切换视图。可用于路由重定向。

`replace` 属性用于控制跳转模式（push 或 replace，默认是 push）。

```jsx
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import About from './components/About/About'
import Hello from './components/Hello/Hello'

export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
        <Route path="/" element={<Navigate to="/about" />}></Route>
      </Routes>
    </div>
  )
}
```

```jsx
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const [sum, setSum] = useState(1)
  return (
    <div>
      <h1>Home</h1>
      {/* 根据sum的值决定是否切换视图 */}
      {sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true} />}
      <button onClick={() => setSum(2)}>将sum变为 2</button>
    </div>
  )
}
```

## `useRoutes()` 路由表

路由规则可以单独抽出一个模块。

```jsx
// 路由表
// routes/index.js
import { Navigate } from 'react-router-dom'
import About from '../components/About/About'
import Hello from '../components/Hello/Hello'

const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]

export default routes
```

```jsx
// 引入路由表
// App.js
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
  // 生成路由规则
  const element = useRoutes(routes)

  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      {element}
    </div>
  )
}
```

## `<Outlet>` 嵌套路由

- 嵌套路由中，需要使用 `<Outlet>` 设置子路由的路由出口，即在何处渲染子路由。
- 设置二级路由链接时，可以是 `to="news"`、`to="./news"`，但不能是 `to="/news"`。

不使用路由表的嵌套路由：

```jsx
// App.js
export default function App() {
  return (
    <div>
      <NavLink to="about">About</NavLink>
      <NavLink to="hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="hello" element={<Hello />}>
          <Route path="news" element={<News />} />
          <Route path="message" element={<Message />} />
        </Route>
        <Route path="/" element={<Navigate to="about" />} />
      </Routes>
    </div>
  )
}
```

使用路由表的嵌套路由：

```jsx
// 路由表
const routes = [
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/hello',
    element: <Hello />,
    // 定义二级路由，注意不要加 /
    children: [
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'message',
        element: <Message />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
]
```

```jsx
// Hello 子组件
import React, { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Hello() {
  return (
    <Fragment>
      <h2>I am Hello!</h2>
      {/* 子路由链接 */}
      <NavLink to="news">News</NavLink>
      <NavLink to="message">Message</NavLink>
      <hr />
      {/* 子路由出口 */}
      <Outlet></Outlet>
    </Fragment>
  )
}
```

## `<NavLink>` 路由高亮

实现导航的 “高亮” 效果，6 版本不能直接指定高亮类名，需要通过函数返回。该函数传入一个对象，类似于 `{isActive: true}` 标识路由是否被激活。

默认情况下，当 `Home` 的子组件匹配成功，`Home` 的导航也会高亮，`end` 属性可移除该效果。

```jsx
// NavLink 默认类名是 active，下面是指定自定义类名

//自定义样式
<NavLink
    to="login"
    className={({ isActive }) => {
        console.log('home', isActive)
        return isActive ? 'base MyClass' : 'base'
    }}
>about</NavLink>

// 默认情况下，当 Home 的子组件匹配成功，Home 的导航也会高亮
// 当 NavLink 上添加了 end 属性后，若 Home 的子组件匹配成功，则 Home 的导航没有高亮效果。
<NavLink to="home" end >home</NavLink>
```

## 路由传参

> 以不使用路由表为例

### 传递 `params`参数

注册路由时声明 `params` 参数，和 React Router 5 一样。

```jsx
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="hello" element={<Hello />}>
          <Route path="message" element={<Message />}>
            <Route path="detail/:id/:name/:age" element={<Detail />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}
```

传递参数。

```jsx
<Link to={`detail/${item.id}/${item.name}/${item.age}`}>{item.name}</Link>
```

使用 `useParams()` 接收 `params` 参数。`useParams()` 返回一个参数对象。

```jsx
import React from 'react'
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  // 解构赋值
  const { id, name, age } = useParams()
  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

### 传递 `search` 参数

和 5 版本一样，正常注册路由即可。

```jsx
<Route path="detail" element={<Detail />} />
```

传递参数。

```jsx
<Link to={`detail?id=${item.id}&name=${item.name}&age=${item.age}`}>{item.name}</Link>
```

使用 `useSearchParams()` 接收参数。该方法返回一个包含两个元素的数组：`search` 参数和修改 `search` 参数的方法。

```jsx
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  // 数组的解构赋值
  const [searchParams, setSearchParams] = useSearchParams()
  // 需要调用 get() 方法获取对应的参数值
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const age = searchParams.get('age')

  function change() {
    setSearchParams('id=666&name=Lily&age=888')
  }

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
      <button onClick={change}>Change search params</button>
    </div>
  )
}
```

### 传递 `state` 参数

和 5 版本一样，正常注册路由即可。

```jsx
<Route path="detail" element={<Detail />} />
```

传递参数，这里相较于 5 版本有所不同，不必写到一个对象里面。

```jsx
<Link to="detail" state={{ id: item.id, name: item.name, age: item.age }}>
  {item.name}
</Link>
```

使用 `useLocation()` 接收参数。该方法返回路由组件的 `location` 对象，就是 5 版本路由组件的 `location` 属性，其中包含 `state` 参数。

```jsx
import { useLocation } from 'react-router-dom'

export default function Detail() {
  // 连续解构赋值
  const {
    state: { id, name, age },
  } = useLocation()

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

## `useNavigate()` 编程式路由导航

`useNavigate()` 返回一个函数，调用该函数实现编程式路由导航。函数有两种参数传递方式。

第一种方式传递两个参数：路由和相关参数。参数只能设置 `replace` 和 `state`。想要传递 `params` 和 `search` 参数直接在路由带上。

第二种方式传递数字，代表前进或后退几步。

```jsx
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Message() {
  const [list] = useState([
    { id: 1, name: 'Bruce', age: 33 },
    { id: 2, name: 'You', age: 3 },
    { id: 3, name: 'React', age: 333 },
  ])

  const navigate = useNavigate()

  function showDetail(item) {
    navigate('detail', {
      replace: true,
      state: {
        id: item.id,
        name: item.name,
        age: item.age,
      },
    })
  }

  function back() {
    navigate(1)
  }

  function forward() {
    navigate(-1)
  }

  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <button onClick={() => showDetail(item)}>查看详情</button>
              <button onClick={back}>后退</button>
              <button onClick={forward}>前进</button>
            </li>
          )
        })}
      </ul>
      <Outlet></Outlet>
    </div>
  )
}
```

## Other Hooks

### `useMatch()`

返回路由组件的 `match` 数据，即 5 版本中的 `match` 属性。

必须传入该组件对应的路由规则才能正确返回，否则返回 `null`。

```jsx
// Detail.jsx
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  const match = useMatch('hello/message/detail/:id/:name/:age')
  console.log(match)
  return (
    <div>
      <li>id</li>
    </div>
  )
}

/*
params: {id: '1', name: 'Bruce', age: '33'}
pathname: "/hello/message/detail/1/Bruce/33"
pathnameBase: "/hello/message/detail/1/Bruce/33"
pattern: {path: 'hello/message/detail/:id/:name/:age', caseSensitive: false, end: true}
*/
```

### `useInRouterContext()`

如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 `true`，否则返回 `false`。即组件有没有被包裹在 `<BrowserRouter>` 这种东西里面。这个对第三方组件库有用处。

### `useNavigationType()`

返回当前的导航类型（用户是如何来到当前页面的）。

返回值：`POP`、`PUSH`、`REPLACE`。

`POP` 是指在浏览器中直接打开了这个路由组件（刷新页面）。

### `useOutlet()`

用来呈现当前组件中渲染的嵌套路由。

```jsx
const result = useOutlet()
console.log(result)
// 如果嵌套路由没有挂载,则返回 null
// 如果嵌套路由已经挂载,则展示嵌套的路由对象
```

### `useResolvedPath()`

给定一个 URL 值，解析其中的：`path`、`search`、`hash` 值。

```jsx
const res = useResolvedPath('/user?id=001&name=Bruce#React')
console.log(res)

/*
hash: '#React'
pathname: '/user'
search: '?id=001&name=Bruce'
*/
```
