import React from 'react';
import ReactLoading from 'react-loading';


export default function Spinner() {
  return (
    <ReactLoading type='spin' color='#000' height='50px' width='50px' className='mx-auto' />
  );
}