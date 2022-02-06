import React, { useEffect } from 'react';
import { loadData, feedValue } from 'redux/feedSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'redux/feedSlice';

export default function TimeLine() {
  // userValueをパラメーターにしないで、　storeのstateを取得する方法はないのか

  const state = useAppSelector(feedValue);
  const dispatch = useAppDispatch();

  // loadDataイベントは、コンポーネントのレンダー前にセットされていないといけない
  useEffect(() => {
    dispatch(loadData())
  },[]);

  return (
    <div>
      <ul>
      {Object.entries(state.tweets).map(([key, value]) => {
        return  (
            <li key={key}>
            <p>User Name: {value.displayName}</p>
            <p>{value.message}</p>
            {/*--<p>投稿画像</p>--*/}
            </li>
          )
        })}
      </ul>
      <hr />
      <a onClick={() => dispatch(logout())} style={{ cursor: 'pointer' }}>
        logout
      </a>
    </div>
  )
}
