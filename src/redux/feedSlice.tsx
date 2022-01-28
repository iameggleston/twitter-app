import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { timeout } from 'app/timeout'
import { ref, child, get } from "firebase/database"
import { createUserWithEmailAndPassword  } from "firebase/auth"
import { auth, database } from "../firebase"
//import { fetchCount } from 'features/counter/counterAPI';

type tweet = {
  uid: string | null;
  displayName: string | null;
  message: string | null;
}

type UserState = {
  tweets: {
    tweet: tweet[]
  }
}

const initialState: UserState = {
  tweets: {
    tweet: {
      uid: '',
      displayName: '',
      message: '',
    }
  }
};

export const loadAsync = createAsyncThunk(
  'feed/load',
  async () => {
    const dbRef = ref(database);
    // Reference.get()の戻り値。
    await get(child(dbRef, '/users')).then((snapshot) => {
      if (snapshot.exists()) {
        const obj = snapshot.val();
        let objLengyh = Object.keys(obj).length
        console.log(objLengyh);
        return objLengyh
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      alert("error")
      console.error(error);
    });
  }
)

// 後ほど非同期処理のactionCreatorを追加する

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    logout: () => {
      timeout();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsync.pending, (state) => {
        // ローディングアニメーションflag true
        alert('pending');

      })
      .addCase(loadAsync.fulfilled, (state, action) => {
        alert('fulfilled');
        // stateにuidを格納

        
      })
      .addCase(loadAsync.rejected, (state, action) => {
        // エラーメッセージの表示
        alert('rejected');

        
      })
  }
});

export const { logout } = feedSlice.actions;

export const feedValue = (state: RootState) => state.feed;

export default feedSlice.reducer;
