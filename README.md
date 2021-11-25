# tonzhon-music
[English](./README_en.md)

[更新日志](./CHANGELOG.md)


<h3>将QQ音乐、网易云音乐和酷我音乐上的歌添加到一个列表来播放！</h3>

This repository is the early Tonzhon Lite, now Tonzhon Lite has been split into `tonzhon-lite`, `tonzhon-lite-server` and `tonzhon-lite-mobile`.

## 地址
- [https://tonzhon.com](https://tonzhon.com)
- [lite.tonzhon.com](http://lite.tonzhon.com)

## 功能
### 桌面版
- 搜索
 (支持使用查询字符串搜索，如: [http://lite.tonzhon.com/search?keyword=Iron%20Man](http://lite.tonzhon.com/search?keyword=Iron%20Man))
- 播放
- 下载
- 加载网易云音乐的歌单
 （如：[http://lite.tonzhon.com/netease-playlist/5132177936](http://lite.tonzhon.com/netease-playlist/5132177936))
- 热歌榜（包括QQ音乐、网易云音乐和酷我音乐）
- 记录搜索历史

### 移动版
- 搜索
- 播放

## 使用
    # Install dependencies
    npm install
    # Build client-side bundle
    npm run build
    # Start the server
    npm run server
打开 `http://localhost:8081` 即可。

## 开发
### 后端
    # Start nodemon dev server (需要全局安装 nodemon)
    npm run dev-server

### 前端
    # Start webpack dev server
    npm start
桌面版打开 `http://localhost:3000/`，移动版打开`http://localhost:3000/m/`。（注意是 `/m/`）

## License
MIT