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

## 网络请求

网络请求使用的是 redux-thunk + fetch 的方式来处理。

你需要构建一个描述网络请求各种功能的 `action`，这个 action 会被 middleware/callApi 处理