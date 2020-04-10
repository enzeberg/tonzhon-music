import React from 'react';

export default function ArtistLinks({ artists, fontColor }) {
  return artists.map((artist, index) => {
    return (
      <a
        key={artist.link}
        href={artist.link}
        target="_blank"
        title={artist.name}
        style={{ color: fontColor }}
      >
        {artist.name}
        &ensp;
      </a>
    );
  });
};