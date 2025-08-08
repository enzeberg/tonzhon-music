function padZero(num) {
  return num < 10 ? `0${num}` : `${num}`
}

export default function toMinAndSec(seconds) {
  const totalSeconds = Math.floor(seconds)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60

  return `${padZero(minutes)}:${padZero(remainingSeconds)}`
}
