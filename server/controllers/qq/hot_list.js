const fetch = require('node-fetch');

const getHotList = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI22414475500725972&g_tk=230873919&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A26%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222020_1%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`)
      .then(res => res.text())
      .then(text => {
        const parsed = JSON.parse(text);
        resolve({
          songs: songsMapper(parsed.detail.data.songInfoList),
        });
      })
      .catch(err => reject(err));
  });
};

// 跟搜索接口的数据格式不一样
const songsMapper = (songs) => {
  return songs.map(song => {
    const mvId = song.mv.vid;
    return ({
      originalId: song.mid,
      newId: `qq${song.mid}`,
      name: song.name,
      // link: `${qqMusicUrl}song/${song.mid}.html`,
      alias: song.subtitle, // if no lyric: ''
      // mvLink: mvId ? `${qqMusicUrl}mv/v/${mvId}.html` : null,
      mv: mvId ? mvId : null,
      artists: song.singer.map((artist) => {
        return {
          name: artist.name,
          // link: `${qqMusicUrl}singer/${artist.mid}.html`,
          id: artist.mid,
        };
      }),
      album: {
        name: song.album.name,
        // link: `${qqMusicUrl}album/${song.album.mid}.html`,
        id: song.album.mid
      },
      // hasCopyright: true,
      platform: 'qq',
    });
  });
};

module.exports = getHotList;