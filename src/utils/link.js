const qq = 'https://y.qq.com/n/yqq/';
const netease = 'https://music.163.com/#/';
const kuwo = 'http://www.kuwo.cn';

function buildSongLink(platform, id) {
  switch(platform) {
    case 'qq':
      return `${qq}song/${id}.html`;
    case 'netease':
      return `${netease}song?id=${id}`;
    case 'kuwo':
      return `${kuwo}/play_detail/${id}`;
    default:
      return;
  }
}

function buildMvLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}mv/v/${id}.html`;
    case 'netease':
      return `${netease}mv?id=${id}`;
    default:
      return;
  }
}

function buildArtistLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}singer/${id}.html`;
    case 'netease':
      return `${netease}artist?id=${id}`;
    case 'kuwo':
      return `${kuwo}/singer_detail/${id}`;
    default:
      return;
  }
}

function buildAlbumLink(platform, id) {
  switch (platform) {
    case 'qq':
      return `${qq}album/${id}.html`;
    case 'netease':
      return `${netease}album?id=${id}`;
    case 'kuwo':
      return `${kuwo}/album_detail/${id}`;
    default:
      return;
  }
}

export {
  buildSongLink,
  buildMvLink,
  buildArtistLink,
  buildAlbumLink,
};