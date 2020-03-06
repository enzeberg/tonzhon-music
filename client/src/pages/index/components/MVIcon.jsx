import React from 'react';
import { MdOndemandVideo } from 'react-icons/md';

export default function MVIcon({ link, color }) {
  return (
    <a
       href={link}
       target="_blank"
       title="MV"
    >
      <MdOndemandVideo
        style={{
          display: 'block',
          fontSize: 20,
          color: color || 'black',
        }}
      />
    </a>
  );
};
