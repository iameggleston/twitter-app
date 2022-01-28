import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Img from "assets/upload.png"

export default function Tweet() {
  return (
    <form method="POST" style={{ marginTop: '30px' }}>
      <TextField
        required
        id="tweet"
        value=""
        label="Tweet"
        variant="outlined"
        //onChange={() =>alert('change')}
      />
      {/*--<img src={Img} style={{ width: '30px', height: '30px' }}/>--*/}
      <Button
        type="submit"
        id="submit"
        variant="contained"
      >
        Tweet
      </Button>
    </form>
  )
}
