import React from 'react';
import { Tag } from 'antd';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom';
import recommendations from '../../../config/search_recommendations';

export default function SearchRecommendations() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {
        recommendations.map(item => (
          <Link
            to={`/search?keyword=${encodeURIComponent(item)}&type=song`}
            key={item}
          >
            <Chip style={{ margin: 4 }}>
              {item}
            </Chip>
          </Link>
        ))
      }
    </div>
  );
}
