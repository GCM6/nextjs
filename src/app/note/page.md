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