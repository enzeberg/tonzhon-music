import React from 'react'

function Artists({ artists }) {
  return artists.map((artist) => artist.name).join(', ')
}

export default React.memo(Artists)
