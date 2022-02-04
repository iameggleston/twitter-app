import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { catheClear } from 'app/catheClear'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { set, ref } from "firebase/database";
import { auth, database } from "../firebase"

export interface UserState {
  user: {
    uid: string | null,
    photoUrl: string | null,
    displayName: string | null,
  };
  error: any;
}

const initialState: UserState = {
  user: {
    uid: '',
    photoUrl: '',
    displayName: 'cccc',
  },
  error: '',
};

// exportで外部ファイルに適用
// 複数interfaceを1つのファイルで管理可能

export interface FormValues {
  username: string;
  email: string;
  password: string;
}

export const signUpAsync = createAsyncThunk(
  'action/signUp',
  // thunkAPIは、dispatchやrejectWithValueなどのkeyを含むオブジェクト
  // 分割代入でrejectWithValueを抜き出して使う
  async (value: FormValues, {rejectWithValue}) => {
    const username = value.username;
    const email = value.email;
    const password = value.password;
    // firebase auth create acount
    const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      //userCredentialを引数にプロフィール情報を登録
      updateProfile(user, {
        displayName: username,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      // 通信に成功してもsingnupに失敗した場合はrejectする
      // rejectWithValueはエラー処理するとき使う関数
      return rejectWithValue(errorMessage)
    });
    return response;
  }
)

export const signInAsync = createAsyncThunk(
  'action/signIn',
  async (value: FormValues, {rejectWithValue, dispatch}) => {
    const email = value.email;
    const password = value.password;
    // firebase auth Signed in
    const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      
      set(ref(database, '/users/user-' + user.uid), {
        "displayName" :  user.displayName,
        "uid" : user.uid,
      })

      dispatch(setUser(user))
    })
    .catch((error) => {
      const errorMessage = error.message;
      // 通信に成功してもsingnupに失敗した場合はrejectする
      return rejectWithValue(errorMessage)
    });
    return response;
  }
)

export const userSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    // データをstateにいれておくときに、firebaseのtimestampフォーマットをそのままいれるとエラーになる
    setUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.displayName = action.payload.displayName;
      console.log(action.payload.uid)
      console.log(action.payload.displayName)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.fulfilled, (state: UserState, action) => {
        // ログインページに遷移
        window.location.href = "/"
      })
      .addCase(signUpAsync.rejected, (state: UserState, action) => {
        // エラーメッセージの表示
        state.error = action.payload;
      })

      .addCase(signInAsync.fulfilled, (state: UserState, action) => {
        // localStorageのセッションを切り、ルートに遷移するタイムアウト処理
        catheClear();
      })
      .addCase(signInAsync.rejected, (state: UserState, action) => {
        // エラーメッセージの表示
        state.error = action.payload;
      })
  }
});

export const { setUser } = userSlice.actions;

export const userValue = (state: RootState) => state.user;

export default userSlice.reducer;
