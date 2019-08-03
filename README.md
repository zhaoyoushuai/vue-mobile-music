﻿# :musical_keyboard: Vue qq音乐 WebApp

基于 Vue(2.9.6) + vuex + vue-router + vue-axios + better-scroll + stylus + ES6 等开发一款移动端音乐，flex 布局适配常见移动端，数据接口都是抓取到的qq音乐官方的接口，通过 jsonp 跨域和服务器端修改请求头中的 Referer 和 host 来请求数据。有些接口会被封掉烦的一批，后续打算自己做一个网易云版本的。


## :rainbow: 技术栈

* `Vue`：用于构建用户界面的 MVVM 框架
* `vue-cli`：Vue 脚手架工具，快速初始化项目代码
* `vue-router`：为单页面应用提供的路由系统，使用了 `Lazy Loading Routes` 技术来实现异步加载优化性能
* `vuex`：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
* `stylus`：css 预编译处理器
* `ES6`：ECMAScript 新一代语法
* `Node.js`：利用 Express 搭建的本地测试服务器
* `vue-axios`：用来请求后端 API 音乐数据

####其他工具

* `fastclick` ：消除 click 移动游览器 300ms 的延迟
* `good--storage` ：处理本地缓存的方法集合
* `vue-lazyload`：实现图片懒加载，节省用户流量，优化页面加载速度
* `better-scroll`：解决移动端各种滚动场景需求的插件，使移动端滑动体验更加流畅
## :video_camera:实现功能

播放器内核、推荐页面、热榜页面、歌手页面、歌单详情、歌手详情、排行榜详情、搜索页面、播放列表、用户中心等等功能。


#### 推荐页面
![](./README-IMG/recommend/1.png)

推荐页分成两个部分，分别是 banner 轮播图、推荐歌单，数据都是使用 `jsonp` 请求 API 获取得到的，图片都使用 `vue-lazyload` 实现懒加载。

轮播图：使用 `better-scroll` 封装的组件slider实现

推荐歌单：上下滑动使用使用 `better-scroll` 封装的组件scroll实现 ，使用`vuex` 管理数据，方便组件之间的数据交互（播放器播放歌曲），


#### 歌手页面
![](./README-IMG/singer/1.png)

歌手页面主要内容是歌手内容区和快捷区的左右联动

内容区 -->  快捷区 : 监听子组件scroll的滑动事件，把滑动位置传递给歌手页面，把滑动y方向的值与listHeight（每一组分类的高度）进行对比，来改变currentIndex实现高亮

快捷区 -->  内容区 : 通过快捷区的点击移动来触发子组件scroll的scrollToElement和scrollTo事件来实现效果


#### 排行榜页面
![](./README-IMG/rank/1.png)

通过获取排行榜数据渲染scroll列表，图片使用了懒加载，比较简单


#### 歌单详情页、排行榜详情页、歌手详情页

![](./README-IMG/detail/2.png)
![](./README-IMG/detail/3.png)

都是复用歌曲列表组件来显示歌曲，页面结构基本相同，


#### 播放器


实现功能：顺序播放、单曲循环、随机播放、收藏等。

播放、暂停使用 HTML5 的 audio 实现。

数据、播放状态、播放历史、习惯歌曲等方面使用了 `vuex` 来进行管理，中间的唱片旋转动画使用了 `animation` 实现。

歌词部分获取歌词数据使用第三方库`lyric-parser`进行处理。实现显示歌词、拖动进度条歌词同步滚动、歌词跟随歌曲进度高亮。

通过 `localstorage` 存储喜欢歌曲、播放历史数据。


#### 播放列表


显示和管理当前播放歌曲，可以用来删除列表中的歌曲、喜欢歌曲、以及选择播放歌曲。


#### 搜索功能
![](./README-IMG/search/1.png)

实现功能：搜索歌手、歌单、歌曲、热门搜索、数据节流、上拉刷新、保存搜索记录。

通过关键字请求 API 获取搜索数据，显示歌手、歌单、歌曲。

实现了上刷新，因为搜索可以设置请求数据的条数，所以可以用来实现上刷新的功能。

通过节流函数实现数据节流，通过 `localstorage` 存储搜索数据。


#### 用户中心

![](./README-IMG/personal/1.png)
![](./README-IMG/personal/2.png)


通过把用户操作的记录存储到本地存储中，实现了喜欢的歌曲和历史歌曲，


## :city_sunrise: 最后

通过学习开发一个 Vue 全家桶项目，让自己更熟练的使用 Vue 全家桶、模块化开发、ES6 等等知识，提高技术能力。

通过开发整个项目，意识到了组件化开发带来的方便，也对vue全家桶，es6等知识更加熟练的应用，

代码中基本都增加了注释，有什么不懂或者觉得写的不对的地方的可以留言一起交流。

