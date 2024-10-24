# nextjs 学习笔记


## SSR 跟 SSG

1. **SSR**
   * 在每次请求时，服务器生成HTML内容返回给客户端。
   * 适用于动态内容频繁更新的页面，比如用户个人资料、新闻网站等。
   * 优点：可以保证内容总是最新的，seo友好
   * 缺点：每次请求都需要服务器处理，可能导致延迟
2. **SSG**
   * 在构建时预先生成HTML文件，静态文件直接提供到客户端

## SSG 跟 RSC 的区别
* SSG 在构建时生成静态内容，适合不常变动的页面。
* RSC 在运行时动态生成内容，适合需要实时更新的页面。
* **ssg是build time 跟rsc 是runtime**
     
## 前置知识（服务器组件RSC）
[服务器组件RSC](https://www.joshwcomeau.com/react/server-components/)

![image](https://github.com/user-attachments/assets/918b353e-c85e-491d-ab5c-486d3ad0994d)

### rsc  跟 client c 
```
HomePage、 Header、MainConent  是rsc， 而ColorProvider 是client 组件，以上代码结构由此得出下面结论：
1.决定能不能渲染rsc的不是父组件是不是rsc，而是所在文件是不是rsc。
2.client 组件import 的组件都会隐式转换为客户端组件也就是客户端组件只能导入其他客户端组件。
```

### 服务器组件是如何序列化并通过网络发送的
[服务器组件是如何序列化并通过网络发送的](https://www.alvar.dev/blog/creating-devtools-for-react-server-components)

### 什么是请求瀑布
瀑布是指依赖于先前请求完成的一系列网络请求。在数据获取的情况下，每个请求只能在前一个请求返还数据才开始请求
***会造成的问题***
* 增加页面加载时间，导致粗塞

```
当然在特定情况下的时候比如先需要获取A获取对应的ID或者别打时候B请求
才可以发送，这种行为就是瀑布流，是我们需要的。

但是无意的瀑布流是我们要避免的，比如：
1. 多个请求依赖于同一个数据
2. 多个请求依赖于同一个请求
```
***如何解决***
* 使用缓存
* 使用并发请求


## 什么是streaming
streaming 是服务器组件的特性，允许服务器组件在生成HTML内容时逐步发送数据，而不是一次性发送所有数据。通过把路由分解成更小的块，可以减少页面加载时间，提高用户体验。

***在nextjs中实现streaming传输***
* 对于特定组件使用<Suspense>包裹
### 确定Suspense的边界

Suspense 的界限取决于一下几点：

1. 希望用户在流式传输的页面时能够获取到什么样的体验。
2. 想要优先考虑那些内容。
3. 如果组件依赖于数据请求获取。
