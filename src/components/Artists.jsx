export default function Artists({ artists }) {
  return artists.map((artist) => artist.name).join(', ')
}
