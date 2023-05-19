import React from 'react';
import { MdOndemandVideo } from 'react-icons/md';

import { buildMvLink } from '../../../utils/link';

export default function MVIcon({ platform, id, color }) {
  return (
    <a
      href={buildMvLink(platform, id)}
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