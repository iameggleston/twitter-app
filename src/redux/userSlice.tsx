import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { set, ref } from "firebase/database";
import { auth, database } from "../firebase"
//import { fetchCount } from 'features/counter/counterAPI';

export interface UserState {
  user: {
    uid: string | null,
    photoUrl: string | null,
    displayName: string | null,
  };
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: UserState = {
  user: {
    uid: '',
    photoUrl: '',
    displayName: 'cccc',
  },
  status: 'idle',
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
  async (value: FormValues, { rejectWithValue }) => {
    const username = value.username;
    const email = value.email;
    const password = value.password;
    // fetch　非同期処理
    const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //userCredentialを引数にプロフィール情報を登録
      updateProfile(user, {
        displayName: username,
      });
      console.log(user.uid);
      return user.uid;
    })
    .catch((error) => {
      const errorMessage = error.message;
      // 通信に成功してもsingnupに失敗した場合はrejectする
      return rejectWithValue(errorMessage)
    });
    return response;
  }
)

export const signInAsync = createAsyncThunk(
  'action/signIn',
  async (value: FormValues, { rejectWithValue }) => {
    const email = value.email;
    const password = value.password;
    // fetch　非同期処理
    const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return {
        uid: user.uid,
        displayName: user.displayName
      };
    })
    .catch((error) => {
      const errorMessage = error.message;
      // 通信に成功してもsingnupに失敗した場合はrejectする
      return rejectWithValue(errorMessage)
    });
    return response;
  }
)

// 後ほど非同期処理のactionCreatorを追加する

export const userSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state: UserState) => {
        // ローディングアニメーションflag true
        alert('pending');
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state: UserState, action) => {
        alert('fulfilled');
        // stateにuidを格納
        state.status = 'idle';
        window.location.href = "/"
        // ログインページに遷移
      })
      .addCase(signUpAsync.rejected, (state: UserState, action) => {
        // エラーメッセージの表示
        alert('rejected');
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(signInAsync.pending, (state: UserState, action) => {
        // ローディングアニメーションflag true
        alert('pending');
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state: UserState, action) => {
        alert('fulfilled');
        // stateにuidを格納
        state.user.uid = action.payload.uid;
        // stateにdisplayNameを格納
        state.user.displayName = action.payload.displayName;
        // firebase databaseに、useを追加


       //get(ref(database, '/tweets/tweet01/members')).then((snapshot) => {
       //  if (snapshot.exists()) {
       //    const obj = snapshot.val();
       //    console.log(Object.keys(obj).length);
       //  } else {
       //    console.log("No data available");
       //  }
       //}).catch((error) => {
       //  console.error(error);
       //});

      // サインイン時にFirebase Realtime Databaseにアカウントを登録
      const user = "user" + `${action.payload.uid}`;
      
      set(ref(database, '/users/user-' + action.payload.uid), {
        "displayName" : `${action.payload.displayName}`,
        "uid" : `${action.payload.uid}`,
      })

        // databaseでデータを取得する

        //const dbRef = ref(database);
        //get(child(dbRef, `users}`)).then((snapshot) => {
        //  if (snapshot.exists()) {
        //    console.log(snapshot.val());
        //  } else {
        //    console.log("No data available");
        //  }
        //}).catch((error) => {
        //  console.error(error);
        //});

        state.status = 'idle';
        // localStorageのセッションを切り、ルートに遷移するタイムアウト処理
        // Feed.tsxの開発の為に、コメントアウト　作業終了後にコメントアウトを削除
        // timeout();
      })
      .addCase(signInAsync.rejected, (state: UserState, action) => {
        // エラーメッセージの表示
        alert('rejected');
        state.status = 'failed';
        //console.log(action.payload);
        state.error = action.payload;
      })
  }
});

export const userValue = (state: RootState) => state.user;

export default userSlice.reducer;
