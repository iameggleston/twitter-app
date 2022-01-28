import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from 'app/hooks';
import { signUpAsync } from 'redux/userSlice';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const SignUp: React.VFC = () => {

  type Inputs = {
    username: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const dispatch = useAppDispatch();

  // event属性のタイプを指定
  //const submit = (e: React.FormEvent<HTMLFormElement>) => {
  //  e.preventDefault();
  //  dispatch(signUpAsync(value));
  //}

  
  const submit = handleSubmit((data) => {
    dispatch(signUpAsync(data));
    reset();
  })
  return (
    <form method="POST" onSubmit={submit} style={{ marginTop: '30px' }}>
      <TextField
        required
        id="username"
        label="Username"
        variant="outlined"
        {...register('username', {
          required: true,
          pattern: {
            value:
              /^[a-zA-Z0-9_]+$/,
            message: 'ユーザーネームの形式が不正です',
          },
        })}
      />
      <ErrorMessage errors={errors} name="username" />
      <TextField
        required
        id="email"
        label="Email Address"
        variant="outlined"
        {...register('email', {
          required: true,
          maxLength: 60,
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'メールアドレスの形式が不正です',
          },
        })}
      />
      <ErrorMessage errors={errors} name="email" />
      <TextField
        required
        id="password"
        label="Password"
        variant="outlined"
        {...register('password', {
          required: true,
          pattern: {
            value:
            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/,
            message: 'パスワードの形式が不正です',
          },
        })}
      />
      <ErrorMessage errors={errors} name="password" />
      <Button
        type="submit"
        id="submit"
        variant="contained"
      >
        登録
      </Button>
    </form>
  )
}

export default SignUp;