import React, { Fragment } from 'react';

export default function Artists ({ artists }) {
  return artists.map((artist, index) => {
      return (
        <Fragment key={artist.link}>
          {artist.name}
          &ensp;
        </Fragment>
      );
    });
};
