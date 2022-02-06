import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from 'app/hooks';
import { FormValues, signInAsync } from 'redux/userSlice';

const SignIn: React.VFC = () => {

  const initialVal: FormValues = {
    username: '',
    email: '',
    password: '',
  }

  const [val, setVal] = useState(initialVal);

  const dispatch = useAppDispatch();
  
  // event属性のタイプを指定
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInAsync(val));
    setVal({username: '', email: '', password: ''});
  }

  return (
    <form method="POST" onSubmit={submit} style={{ marginTop: '30px' }}>
      <a href="/signup">create new account?</a>
      <TextField
        required
        id="email"
        value={val['email']}
        label="Email Address"
        variant="outlined"
        onChange={(e) => setVal({ ...val,  email: e.target.value})}
      />
      <TextField
        required
        id="password"
        value={val['password']}
        label="Password"
        variant="outlined"
        onChange={(e) => setVal({ ...val,  password: e.target.value})}
      />
      <Button
        type="submit"
        id="submit"
        variant="contained"
      >
        ログイン
      </Button>
    </form>
  )
}

export default SignIn
