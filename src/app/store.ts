import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from 'redux/userSlice';
import feedReducer from 'redux/feedSlice';
import { save, load } from 'redux-localstorage-simple';

// configureStoreを使用して、作成したSliceを1つにまとめstoreに入れます。
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
  preloadedState: load(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // データをstateにいれておくときに、firebaseのtimestampフォーマットをそのままいれるとエラーになる
    // 問題のあるActionを指定し回避
    serializableCheck: {
      ignoredActions: ['action/setUser'],
    },
  }).concat(save()),
  // middlewareにdefault middlewareとsave　middlewareを追加している
});


// type→型に名前をつけられる 型エイリアス
// typeOf 型の取得

export type AppDispatch = typeof store.dispatch;

// Rootstateに複数にReducerをまとめた場合の、最終的なStateの型を渡しています。
export type RootState = ReturnType<typeof store.getState>;

// ReturnType 関数の戻り値の型から新たな型を生成します。
// 戻り値がない関数の戻り値を型注釈するにはvoid型を用います
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// ThunkActionは『DispatchとStateを引数にもつ関数』です。
// つまりThunkActionを返すActionCreatorとは、関数を返すActionCreatorのことを指します。
// ThunkAction内に非同期処理を実装することで、Reduxでも非同期処理が扱えます。

// Thunk Actionは、「dispatchとgetStateを受け取るような関数」を返す関数を作る

// 第一引数がDispatchされたActionの戻り値型
// 第二引数がStateの型
// 第三引数はdispatchとgetStateの他にもうひとつ取れる引数の型
// 第四引数がActionの型です