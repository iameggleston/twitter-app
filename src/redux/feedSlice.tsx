import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { RootState } from 'app/store'
import { timeout } from 'app/timeout'
import { ref, child, get, onValue, onChildAdded, set } from "firebase/database"
import { createUserWithEmailAndPassword  } from "firebase/auth"
import { auth, database } from "../firebase"
//import { fetchCount } from 'features/counter/counterAPI';

export interface UserState  {
  tweets: {
    tweet: {
      uid: string | null
      displayName: string | null
      message: string | null
    }
  }
}
export interface InputVal {
  displayName: string | null
  message: string | null
  uid : string | null
}

const initialState: UserState = {
  tweets: {
    tweet: {
      uid: '',
      displayName: '',
      message: '',
    },
  }
};

export const loadData = () => (dispatch: Dispatch) => {
  const dbRef = ref(database, '/tweets');
    // Reference.get()の戻り値。
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setData(data));
    });
}

export const tweetPost = (val:InputVal) => (dispatch: Dispatch)　=> {
  set(ref(database, 'tweets/tweet' + val.uid), {
    displayName: val.displayName,
    message: val.message,
    uid : val.uid,
  })
}

// 後ほど非同期処理のactionCreatorを追加する

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    logout: () => {
      timeout();
    },
    setData: (state, action) => {
      state.tweets = action.payload;
    }
  }
});

export const { logout, setData } = feedSlice.actions;

export const feedValue = (state: RootState) => state.feed;

export default feedSlice.reducer;
