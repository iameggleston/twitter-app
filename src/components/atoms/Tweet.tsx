import React, {useState } from 'react';
import { userValue } from 'redux/userSlice';
import { tweetPost, InputVal } from 'redux/feedSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Img from "assets/upload.png"

export default function Tweet() {

  const state = useAppSelector(userValue);

  const dispatch = useAppDispatch();

  const initialVal: InputVal = {
    displayName: state.user.displayName,
    message: '',
    uid : state.user.uid,
  }

  const [val, setVal] = useState(initialVal);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(tweetPost(val))
    setVal({ ...val, message: '' })
  }

  return (
    <form method="POST" onSubmit={submit} style={{ marginTop: '30px' }}>
      <TextField
        required
        id="tweet"
        value={val['message']}
        label="Tweet"
        variant="outlined"
        onChange={(e) => setVal({ ...val, message: e.target.value })}
      />
      {/*--<img src={Img} style={{ width: '30px', height: '30px' }}/>--*/}
      <Button
        type="submit"
        id="submit"
        variant="contained"
      >
        Tweet
      </Button>
    </form>
  )
}
