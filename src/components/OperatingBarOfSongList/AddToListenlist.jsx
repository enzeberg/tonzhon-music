import { notification, Button } from 'antd'
import { Plus } from 'lucide-react'
import { useListenlist } from '../../contexts/MusicContext'

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 2,
})

export default function AddToListenlist({ data }) {
  const { addSongsToListenlist } = useListenlist()

  function handleClick() {
    addSongsToListenlist(data)
    notification.open({
      message: '已添加到聆听列表',
    })
  }

  return (
    <Button icon={<Plus size={16} />} onClick={handleClick}>
      添加到聆听列表
    </Button>
  )
}
