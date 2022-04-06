
## 预览服务地址
- http://cs.unicornhunter.cn:8001/#/

## 环境配置
- node 版本 ^12.22.0 || ^14.17.0 || >=16.0.0 & <17.0.0
- npm i --registry=https://registry.npmmirror.com/
- 限定该环境的原因是使用了最新的`create-react-app`，基础库对版本有一定的要求；以及nodejs > 17版本，不支持`node-sass`；

## 启动服务
- 启动node服务(天气api在node服务里)
    - npm run server
    - api接口为：http://127.0.0.1:8001/api/weather?city=<城市名>
    - api使用的是爬虫百度网页

- 开发前端代码
    - npm start
    - 需要先启动node服务才能获取天气信息
    - 访问 http://127.0.0.1:3000 即可调试页面

- 打包编译前端代码
    - npm run build
    - 编译后的代码将会打包到`build`文件夹
    - 重新执行node服务
        - npm run server
    - 访问 http://127.0.0.1:8001 即可预览页面

## 后续可做优化
- 图片和资源放到CDN地址，并可做gzip压缩
- 补充Suspense的页面，并且使用新的 transition API
- 使用Error Boundaries做错误捕捉
- 一些组件抽得更细，做code-split，但尽可能不做过度优化
- 额外增加客户端的内存缓存，lru-cache（目前做了服务端的，以及读localstorage）
- 时钟和天气用服务端校准，优化轮询机制
- 。。。其实有很多优化空间的，只是因为demo，以及准备面试，所以没有深入
