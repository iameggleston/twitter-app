import React from 'react';
import Tweet from 'components/atoms/Tweet';
import TimeLine from 'components/molecules/TimeLine';

export default function Feed() {
  return (
    <div>
      <Tweet />
      <hr />
      <TimeLine />
    </div>
  )
}
