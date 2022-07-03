import React from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadModel = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgba(256,256,256,0.5)',
    border: '2px solid rgba(256,256,256,0.5)',
    boxShadow: 32,
    width: 500,
    p: 4,
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="text-center">
        <CircularProgress />
          <div className='text-3xl'>
            <br />
            We are getting the Information. 
            <br />
            Please wait a moment.
          </div>
      </Box>
    </Modal>
  )
}

export default LoadModel;