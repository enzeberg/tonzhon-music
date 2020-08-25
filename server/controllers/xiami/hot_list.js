const fetch = require('node-fetch');

const getHotList = () => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.xiami.com/api/billboard/getBillboardDetail?_q=%7B%22billboardId%22:%22103%22%7D&_s=5126983853ddaeca047442a2d0f827ea`, {
      headers: {
        cookie: 'xmgid=0d39d264-7339-47ba-b513-a8958314f234; xm_sg_tk=5364c63c11e3f7f6f7bdd73ea3689e7f_1598340851222; xm_sg_tk.sig=8WVFZzYM826y7bQ7ydeKcXd6cumvF7O5hEzOYf_xBaU; _uab_collina=159834085149192734178971; cna=wmHLF2Jp+QwCAXTonnGfJxSj; _xm_umtoken=T2gAq1YifTkwjolIJnHa457YkeL_b2jjf0mqDo39z0xIHIcGVbCVcT8lJKvK27ar-sMVQY2vCmdmf00clKDPuhUU; xlly_s=1; gid=159834085623256; _xiamitoken=9af34f5a265d276e9daaeae54222a46c; _unsign_token=35c22e38d1552227d37529876f1c5ed7; xm_traceid=0b08135915983408770922173eae8b; xm_oauth_state=76a0331e824b80d35a4516ecfde1554d; _xm_cf_=3pYK-Bpae-MPQEsLPcwm2qMJ; tfstk=cJUVBoAtyZQ4Pgu1vqgw5PqrN_iAa7UgRihtmlqlKXy2fGimLs2yBb2vL-ewe8nc.; l=eBanlufPOYLKJYchBO5Z-urza77TfIdf1sPzaNbMiInca1PRtdTcSNQ4wFfvSdtj_t50oetPC8EqeRH9y-4LRxaYzHkie2hGLdvMRe1..; isg=BFlZdzTPYowYhz4YVUndOQLJaEUz5k2Y0xcgL3sPPwB8gnoUwzK6aHLUhE70OuXQ',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('json: ', json)
        const { result } = json;
        if (json.code === 'SUCCESS' && result && result.status === 'SUCCESS') {
          resolve({
            songs: songsMapper(result.data.billboard.songs),
          });
        } else {
          reject({
            message: 'failed',
          });
        }
      })
      .catch(err => reject(err));
  });
};

// 跟搜索接口的数据格式不一样
const songsMapper = (songs) => {
  return songs.map(song => {
    return ({
      originalId: song.songStringId,
      newId: `xiami${song.songStringId}`,
      name: song.songName,
      mv: song.mvId,
      artists: song.singerVOs.map(item => ({
        name: item.artistName,
        id: item.artistStringId,
      })),
      album: {
        name: song.albumName,
        id: song.albumStringId,
      },
      // hasCopyright: true,
      platform: 'xiami',
    });
  });
};

// getHotList()
//   .then(songs => console.log(songs))
//   .catch(err => console.error(err));

module.exports = getHotList;