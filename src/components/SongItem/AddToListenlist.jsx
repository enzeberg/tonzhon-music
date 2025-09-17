import { Plus } from 'lucide-react'
import { notification } from 'antd'
import { useListenlist } from '../../contexts/ListenlistContext'

export default function AddToListenlist({ data }) {
  const { addSongToListenlist } = useListenlist()

  function handleClick() {
    addSongToListenlist(data)
    notification.open({
      message: '已添加到聆听列表',
    })
  }

  return (
    <a onClick={handleClick} title="添加到聆听列表">
      <Plus
        size={20}
        style={{
          display: 'block',
        }}
      />
    </a>
  )
}
