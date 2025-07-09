import { Fragment } from 'react';

export default function Artists({ artists }) {
  return artists.map((artist) => {
      return (
        <Fragment key={artist.id}>
          {artist.name}
          &ensp;
        </Fragment>
      );
    });
};