# tonzhon-music

<h3>将QQ音乐、网易云音乐和酷我音乐上的歌添加到一个列表来播放！</h3>

## 背景
当今音乐版权竞争激烈，我们经常需要去往不同的音乐平台来满足我们的听歌需求，相当麻烦。铜钟则试图将分散的音乐资源聚集起来，来尽力满足用户“在一处聆听所有音乐”的诉求。而QQ音乐、网易云音乐和酷我音乐几乎囊括了市场上所有的主流音乐，因此铜钟选择将这三者的音乐资源聚到一处，呈现给用户，为用户带来了极大的便捷和独特的听歌体验。

## 功能
- 搜索
 (支持使用 query string 搜索，如: [https://tonzhon.com/search?keyword=%E5%9B%9E%E6%A2%A6%E6%B8%B8%E4%BB%99](https://tonzhon.com/search?keyword=%E5%9B%9E%E6%A2%A6%E6%B8%B8%E4%BB%99))
- 播放
- 下载歌曲
- 热歌榜（包括QQ音乐、网易云音乐和酷我音乐）

## 运行
    npm install
    npm run server
    npm start
桌面版打开 `http://localhost:3000/`，移动版打开`http://localhost:3000/m/`。（注意是 `/m/`）

## License
MIT