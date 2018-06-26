const https = require('https');
const querystring = require('querystring');
const request = require('../../../utils/request');
const Crypto = require('../../../utils/crypto');

const xiamiSite = 'http://www.xiami.com/';
const xiamiAPIUrl = 'https://api.xiami.com/web?';
const NEW_API_URL = 'http://acs.m.xiami.com/h5/';
let g = global;

require('isomorphic-fetch');

const options = {
  host: 'api.xiami.com',
  method: 'GET',
  // mode: 'no-cors',
  headers: {
    referer: 'https://h.xiami.com/', // 去掉这行虾米会返回：“非法请求”

  },
};

const requestXiami = (query) => {
  options.path = `/web?${querystring.stringify(query)}`;
  return new Promise((resolve, reject) => {
    request(options, null, 'https')
      .then(res => JSON.parse(res))
      .then(json => resolve(json))
      .catch(err => reject(err));
  });
};

const searchSongs = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    requestXiami({
      v: 2.0,
      app_key: 1,
      key: keyword,
      page: page,
      limit: limit,
      _ksTS: '1519692593395_60',
      // callback: 'jsonp61', // causes Xiami return jsonp61({...})
      r: 'search/songs'
    })
      .then(json => {
        if (json.data.total === 0) {
          return reject({ message: '抱歉，未搜索到相关内容！' });
        } else {
          const songs = json.data.songs.map((song, i) => ({
            originalId: song.song_id,
            name: song.song_name,
            link: `${xiamiSite}song/${song.song_id}`,
            playLink: `${xiamiSite}play?ids=/song/playlist/id/${song.song_id}/object_name/default/object_id/0#open`,
            artists: [{
              name: song.artist_name,
              link: `${xiamiSite}artist/${song.artist_id}`
            }],
            album: {
              name: song.album_name,
              link: `${xiamiSite}album/${song.album_id}`
            },
            hasCopyright: true,
            platform: 'xiami',
          }));
          return resolve({
            songs: songs,
            totalCount: json.data.total
          });
        }
      })
      .catch(err => reject(err));
  });
};

// copy copy copy
const newRequest = (api, query) => {
  if (!g.XIAMI_TOKEN || !g.XIAMI_SIGNED_TOKEN) {
    return new Promise((resolve, reject) => {
      getXiamiToken(api)
        .then(tokenObj => {
          // set cache
          g.XIAMI_TOKEN = tokenObj.token;
          g.XIAMI_SIGNED_TOKEN = tokenObj.signedToken;

          return makeXiamiRequest(api, query, tokenObj.token, tokenObj.signedToken);
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err)
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      makeXiamiRequest(api, query, g.XIAMI_TOKEN + '1', g.XIAMI_SIGNED_TOKEN)
        .then(res => {
          if(JSON.stringify(res.data) === '{}') {
            throw 'sign error';
          }
          resolve(res);
        })
        .catch(err => {
          getXiamiToken(api)
            .then(tokenObj => {
              // set cache
              g.XIAMI_TOKEN = tokenObj.token;
              g.XIAMI_SIGNED_TOKEN = tokenObj.signedToken;

              return makeXiamiRequest(api, query, tokenObj.token, tokenObj.signedToken);
            })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err)
            });
        });
    });
  }
}

const getXiamiToken = (api) => {
  return new Promise((resolve, reject) => {
    /*
     *  get token from xiami
     *  exmaple: http://acs.m.xiami.com/h5/mtop.alimusic.search.searchservice.searchsongs/1.0/
     */
     fetch(`${NEW_API_URL}${api}/1.0/`)
       .then(res => {

         // myToken is the final token we need;
         let token = Array.from(res.headers._headers['set-cookie']);
         token = token.map(i => i.split(';')[0].trim());
         const myToken = token[0].replace('_m_h5_tk=', '').split('_')[0];

         resolve({
           token,
           signedToken: myToken
         });
       })
       .catch(err => {
         reject(err);
       })
   });
}

const makeXiamiRequest = (api, query, token, signedToken) => {
  // set up query data, will use to generate url and get sign
  let queryData = {
    header: {
      appId: 200,
      appVersion: 1000000,
      callId: new Date().getTime(),
      network: 1,
      platformId: "mac",
      remoteIp: "192.168.1.101",
      resolution: "1178*778"
    },
    model: query
  };
  let queryStr = JSON.stringify({
    requestStr: JSON.stringify(queryData)
  });

  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 244) + 1;
    /*
     * use token to get sign
     */
    let appKey = "12574478"
    let t = new Date().getTime();
    let sign = Crypto.MD5(`${signedToken}&${t.toString()}&${appKey}&${queryStr}`);

    /*
     * generate request data
     */
     let params = {
       appKey: 12574478,
       t,
       sign,
       v: 1.0,
       type: 'originaljson',
       dataType: 'json',
       api,
       data: queryStr
     };
     let opts = {
       headers: {
         Host: 'acs.m.xiami.com',
         'Content-Type': 'application/x-www-form-urlencoded',
         'X-Real-IP': `211.161.244.${random}`,
         Cookie: `${token[0]};${token[1]}`
       },
     };

     /*
      * make request
      */
      fetch(`${NEW_API_URL}${api}/1.0/?${querystring.stringify(params)}`, opts)
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
  });
}
// end end end  copy copy copy

const searchAlbums = (keyword, limit, page) => {
  return new Promise((resolve, reject) => {
    newRequest('mtop.alimusic.search.searchservice.searchalbums', {
      key: keyword,
      pagingVO: {
        page: page,
        pageSize: limit,
      },
    })
      .then(res => {
        const albums = res.data.data.albums.map(album => ({
          name: album.albumName,
          link: `${xiamiSite}album/${album.albumId}`,
          picUrl: `${album.albumLogo}@1e_1c_0i_1o_100Q_150w_150h`,
          artists: [
            {
              name: album.artistName,
              link: `${xiamiSite}artist/${album.artistId}`
            }
          ]
        }));
        resolve({
          albums: albums,
          totalCount: res.data.data.pagingVO.count
        });
      })
      .catch(err => reject(err));
  });
};

const search = (keyword, type, limit, page) => {
  if (type === 'song') {
    return searchSongs(keyword, limit, page);
  // } else if (type === 'album') {
  //   return searchSongs(keyword, limit, page);
  // } else if (type === 'artist') {
  //   return searchSongs(keyword, limit, page);
  } else {
    return Promise.reject({ message: 'Xiami Music does not support this search type!' });
  }
};

module.exports = {
  search,
  searchSongs
};
// searchSongs('dsfphkpeoarkherh', 4, 1)
// searchAlbums('taylor', 40, 1)
//   .then((res) => {console.log(res)})
//   .catch((err) => {console.error(err)})
