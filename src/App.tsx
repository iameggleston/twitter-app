import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { userValue, UserState } from 'redux/userSlice';
import Feed from 'components/molecules/Feed';
import { auth } from "./firebase";
import Spinner from 'components/atoms/Spinner';

const SignIn = lazy(() => import('./components/molecules/SignIn'));
const SignUp = lazy(() => import('./components/molecules/SignUp'));

export default function App() {
  const val = useAppSelector(userValue);

  return (
    <div className="App">
      {val.user.uid ?
        <Suspense fallback={<Spinner />}>
          <Feed />
        </Suspense>
        : <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<Spinner />}>
                  <SignIn />
                </Suspense>
              } />
              <Route path="/signup" element={
                <Suspense fallback={<Spinner />}>
                  <SignUp />
                </Suspense>
              } />
              <Route path="*" element={<p>Not found</p>} />
            </Routes>
            <p className="error">{ val.error }</p>
        </BrowserRouter>}
    </div>
  );
}
