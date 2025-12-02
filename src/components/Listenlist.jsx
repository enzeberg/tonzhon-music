import { Trash2 } from 'lucide-react'
import { Button } from 'antd'
import ItemInListenlist from './SongItem/in_listenlist'
import { useListenlist } from '../contexts/MusicContext'

export default function Listenlist() {
  const { listenlist, clearListenlist } = useListenlist()
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 64,
        color: 'white',
        right: `${(document.body.clientWidth - 1000) / 2}px`,
        width: 600,
        height: 320,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        background: 'rgb(70,70,70)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          background: '#222',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        <span>聆听列表</span>
        <Button icon={<Trash2 size={16} />} ghost onClick={clearListenlist}>
          清空
        </Button>
      </div>
      <ol
        id="listenlist"
        style={{
          color: 'white',
          overflow: 'auto',
          height: 268,
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        {listenlist.map((song) => (
          <ItemInListenlist key={song.link} song={song} />
        ))}
      </ol>
      <style jsx="true">{`
        #listenlist::-webkit-scrollbar {
          background-color: #222;
          width: 7px;
          border-radius: 10px;
        }
        #listenlist::-webkit-scrollbar-thumb {
          background-color: #999;
          border-radius: 10px;
          /* width: 5px; */
        }
        #listenlist::-webkit-scrollbar-track {
          display: none;
          border-radius: 10px;
        }
        #listenlist::-webkit-scrollbar-track-piece {
          border-radius: 10px;
        }
        #listenlist li:hover {
          cursor: pointer;
          background-color: rgb(50, 50, 50);
        }
        #listenlist li.playing {
          background-color: rgb(60, 60, 60);
        }
      `}</style>
    </div>
  )
}
