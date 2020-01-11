import React from 'react';
import Icon from 'react-icons-kit';
import { ic_ondemand_video } from 'react-icons-kit/md/ic_ondemand_video';

export default function MVIcon({ link, fontColor }) {
  return (
    <a
       href={link}
       target="_blank"
       title="MV"
    >
      <Icon
        icon={ic_ondemand_video}
        size={20}
        style={{ verticalAlign: 'middle', color: fontColor }}
      />
    </a>
  );
};
