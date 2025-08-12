import { DeleteOutlined } from '@ant-design/icons'
import { Button, List, Row, Col } from 'antd'
import { connect } from 'react-redux'
import ItemInListenlist from './SongItem/in_listenlist'

function Listenlist() {
  return (
    <div style={styles.wrapper}>
      <Row
        type='flex'
        align='middle'
        justify='space-between'
        style={styles.header}
      >
        <Col span={20}>聆听列表</Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button
            icon={<DeleteOutlined />}
            ghost
            onClick={this.props.clearListenlist}
          >
            清空
          </Button>
        </Col>
      </Row>
      <List
        id='listenlist'
        style={styles.list}
        itemLayout='horizontal'
        dataSource={this.props.dataSource}
        renderItem={(song) => {
          return <ItemInListenlist key={song.link} song={song} />
        }}
      />
      <style jsx='true'>{`
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

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 64,
    color: 'white',
    right: `${(document.body.clientWidth - 1000) / 2}px`,
    width: 600,
    height: 320,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    background: 'rgb(70,70,70)',
  },
  header: {
    padding: 10,
    background: '#222',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  list: {
    color: 'white',
    overflow: 'auto',
    height: 268,
  },
}

function mapStateToProps(state) {
  return {
    dataSource: state.listenlist,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    clearListenlist: () => {
      dispatch({ type: 'CLEAR_LISTENLIST' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listenlist)
