import React, { useState, useEffect } from 'react';
import { userValue } from 'redux/userSlice';
import { loadData, feedValue, UserState } from 'redux/feedSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
      {/*--<div className='comment_wrap'>
        <ul className='comment'>
          <li className='comment_item'>
            <p>コメント1</p>
          </li>
          <li className='comment_item'>
            <p>コメント2</p>
          </li>
        </ul>
        <form method="POST" style={{ marginTop: '30px' }}>
          <TextField
            required
            id="comment"
            value=""
            label="comment"
            variant="outlined"
            //onChange={() =>alert('change')}
          />
          <Button
            type="submit"
            id="submit"
            variant="contained"
          >
            送信
          </Button>
        </form>
      </div>--*/}
      <a onClick={() => dispatch(logout())} style={{ cursor: 'pointer' }}>
        logout
      </a>
    </div>
  )
}
