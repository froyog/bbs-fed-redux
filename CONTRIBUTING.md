# 求实BBS Web端开发文档

本文档旨在概述BBS基础架构的设计，主要包括网络请求、错误处理、常用组件的使用、错误追踪、流量统计，以及命名规范等基本内容。以帮助后续开发者开发新模块/功能时进行参考。

## 架构设计

### 应用状态管理

BBS 的应用状态管理的技术栈采用 Redux + React-Redux + redux-thunk + ImmutableJS。在开始阅读之前，请确保你已经熟悉上述 package 的基本用法。

首先，整个 state 树必须是 immutable 对象，所以 reducer 中对 state 的操作必须使用 immutablejs 提供的 api。传入 Smart 组件后再用 util 中提供的 toJS 的高阶组件将 immutable 对象转换为普通 Javascript 对象。（后续开发中考虑引入 reselect）绝对**禁止**在 Dumb 组件，mapStateToProps 中使用 immutable 对象。

Smart 组件和 Dumb 组件：需要连接 redux store 的组件为 Smart 组件。它从 store 中获取所需数据，通过 props 传给 Dumb 组件。详细做法参考 [Redux 官方文档](https://cn.redux.js.org/)，不再赘述。

对于哪些数据进入 redux state tree 而哪些数据由组件本身的 state 维护这个问题，请自行决定。目前的实践是，通过网络请求获取的数据，全部由 redux 保存。另外某些遍布整个应用，在很多组件都要用到的数据（例如用户信息），也在 redux 中保存。其他诸如“侧边栏是否展开”这类数据，由组件内部 state 控制。

所有 reducer 使用 `combineReducers` 整合成一个 reducer，详见 [rootReducer](./src/reducers/rootReducer.js)。如果有需要在各个 sliceReducer 中共享数据的需要，可写在 `crossSliceReducer` 中。（这种情况较为少见，主要出现于涉及 user 的 state，如果你大量出现这种情况，可能需要重新考虑 state 结构设计是否得当）

### 路由

采用 React-Router v4 作为路由库，请熟悉其基本用法。

注意 react-router-bootstrap 这个 package。它用于 react-router 和 react-bootstrap 组件的结合，详细用法参考其[官方文档](https://github.com/react-bootstrap/react-router-bootstrap)。

若需要把当前页面的数据带到下一个页面，请使用 `history.pushState(...)`，然后在下一个页面中使用 `location.state` 获取这个数据。没有特殊情况，禁止使用 url parameter 传递数据。

### 网络请求

网络请求使用的是 redux-thunk + fetch 的方式来处理。

你需要构建一个 action-creator，它返回一个**函数**形式的 action，随后这个 action 会被 redux-thunk 处理，进而被 [callApi](./src/middlewares/callApi.js) 这个中间件处理。

一些典型的网络请求 action，可参考 [bbsIndex](./src/actions/bbsIndex) 以及 [messages](./src/actions/profile/messages.js)

#### callApi 何时会被调用？

注意，callApi 识别某个 action 是否为网络请求的方式是判断这个 action 对象是否包含一个名为 `"Call Api"` 的 key（实际代码中用`[CALL_API]`表示）。所以其他非网络请求的 action 不要包含这个 key，否则会被当作网络请求处理，从而报错。

#### 为什么 action-creator 返回的是一个 function 而不是 object？

这是因为 redux-thunk 处理一遍这个 function 时，会将 dispatch，getState 这两个有用的函数当作参数注入进来，这样我们可以在 action 内部直接使用 dispatch，而无需将此操作下放到业务层（smart component 中），实际上 redux-thunk 能拿到的这两个函数（dispatch，getState）也是由 redux 提供的，感兴趣可以参考 redux 源码。

#### 为什么网络请求直接获取的数据的 key 与 store 中储存的不一致？

在 callApi 中间件中我们对获取到的所有 key 进行了驼峰化处理，这是由于后台使用的变量命名方式是 `foo_bar` 而前端使用的是 `fooBar`，所以会进行 camelize 处理。

## 常用组件

### React Component

可复用的 React Component 均放置在 src/components/common/ 下，一些常用的可复用组件包括：

- [Avatar](./src/components/common/Avatar.jsx): 用户头像，无法获取到头像时使用用户名首字母作为头像
- [Card](./src/components/common/Card.jsx): 卡片
- [ErrorModal](./src/components/common/ErrorModal.jsx): 错误界面，用于网络请求失败时显示
- [Input](./src/components/common/Input.jsx): Material Design 风格输入框，api 与 react-rainbow 不同。请参考源码使用
- [Loading](./src/components/common/Loading.jsx): 加载动画，分四种
    - LoadingSpinner: 已弃用
    - LoadingDots：用于小型场景，例如按钮旁边，输入框等
    - LoadingLines：用于中型场景，例如二级列表的渲染
    - FetchingOverlay：用于整个页面的加载场景
- [ThreadItem](./src/components/common/ThreadItem.jsx): 帖子列表的渲染
- [Toast](./src/components/common/Toast.jsx): 就是 Toast，因为需要连接 store，结合 containers 中的 [ToastWrapper](./src/containers/common/Toast.jsx)
- [Time](./src/components/common/Time.jsx): 将时间戳转换为具体时间

### Reducer Factory

目前使用的 reducer 工厂仅包括 [bypassing](./src/reducers/bypassing.js)。该 reducer 工厂用于生成一个“只经过 reducer 储存进 store 中”的reducer，设计哲学类似于 Mobx。

使用示例参见 [rootReducer](./src/reducers/rootReducer.js)

### Action Creators 生成器

可以局部使用，用于生成相似结构的 action creator。如果认为有助于减少样板代码，可以使用。

## 错误追踪 / 流量统计

### 使用 Raven 进行错误追踪

使用 redux-raven-middleware 将错误汇报至 [sentry](https://sentry-twtstudio.com)。

### 使用 Piwik 进行流量统计

以 PiwikReactRouter 代替 React-Router 统计所有经过路由的流量（GET 请求）

piwikTraker 这个

## 编码规范

### 代码格式

我们引入了 [prettier](./.prettierrc) 自动格式化 **src/** 下所有 `.js,.jsx,.less` 文件。且该操作会在 git commit 时自动执行。

[eslint](./.eslintrc) 用于确保一些最佳实践，但这些最佳实践仍在探索当中，所以警告级别仍为 warning，未来确定后会改为 error 且阻止 git commit。

### 命名规范

由于自动化工具无法确保命名的规范性，因此做一下详细说明

- 一些老生常谈参见 [Airbnb Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- 所有函数（方法）应使用动词短语

```jsx
// bad
const userBan = () => {}

// good
const banUser = () => {}
```

- src/ 下现有的子目录应该能满足所有需求，没有特殊情况不要新建 src 的直接子目录
- src/ 子目录（如 src/containers）下的子目录按页面分类，例如 Register 属于登录相关，放置于 src/containers/passport。如果没有新建页面，不要添加新的子目录。
