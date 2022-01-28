import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// 単純な `useDispatch` や `useSelector` の代わりに、アプリ全体で使用する。
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useSelector コンポーネントからstoreのstateにアクセスする際に使う
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
