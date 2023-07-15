import { List } from 'antd';
import SongItem from './SongItem';

function SongList() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={this.props.songs}
      renderItem={song => {
        return (
          <SongItem key={song.link}
            song={song}
          />
        );
      }}
      className="song-list"
    />
  );
}

export default SongList;