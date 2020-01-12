# tongzhong-music
<a href="./README_en.md">English</a>

<img src="./screenshots/qr_code.png" width="64" alt="mobile">

<h3>将QQ音乐、网易云音乐和虾米音乐上的歌添加到一个列表来播放！</h3>

## 地址
- 深圳：<a href="http://mini.tongzhong.xyz" target="_blank">mini.tongzhong.xyz</a>
- 上海：<a href="http://sh.mini.tongzhong.xyz" target="_blank">sh.mini.tongzhong.xyz</a>
- 北京：<a href="http://bj.mini.tongzhong.xyz" target="_blank">bj.mini.tongzhong.xyz</a>

## 功能
### 桌面版
- 搜索
 (支持使用查询字符串搜索，如: <a href="http://mini.tongzhong.xyz/search?keyword=Iron%20Man&type=song" target="_blank">http://mini.tongzhong.xyz/search?keyword=Iron%20Man&type=song</a>.)
- 播放
- 下载
- 热歌榜（包括QQ音乐和网易云音乐）
- 记录搜索历史

<img src="./screenshots/0111.PNG" alt="desktop">

### 移动版
- 搜索
- 播放

<img src="./screenshots/m.PNG" alt="mobile">

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

## 致谢
- <a href="https://github.com/Binaryify/NeteaseCloudMusicApi">Binaryify/NeteaseCloudMusicApi</a>
- <a href="https://github.com/LIU9293/musicAPI">LIU9293/musicAPI</a>

## License
MIT
