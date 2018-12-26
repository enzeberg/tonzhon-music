import React from 'react';

export default function Artists ({ artists, fontColor }) {
  const newArtists = [];
  const n = artists.length;
  for (let i = 0; i < n; i++) {
    let artist = artists[i];
    newArtists.push(
      <a
        key={artist.link}
        href={artist.link}
        target="_blank"
        title={artist.name}
        style={{ color: fontColor }}
      >
        {artist.name}
      </a>
    );
    if (i < n - 1) {
      newArtists.push(' / ');
    }
  }
  return newArtists;
};
