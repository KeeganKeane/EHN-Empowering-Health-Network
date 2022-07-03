import React, { useState } from 'react';
import { Button } from '@mui/material';
import JournalContent from './Journal/JournalContent';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import LikeReport from './Journal/LikeReport';


const JournalWrapper = (props) => {
  const [errorMessage, setErrorMessage] = useState();

  return (
    <div className="journal-background flex flex-row">
      <Button component={Link}
        to={`/users/posts/${props.msgObject.journalId}`}
        variant="text"
        className="w-full"
        style={{
          textDecoration: 'none',
          textTransform: 'none',
          justifyContent: 'flex-start',
          borderRadius: '50px 0px 0px 50px'
        }}>
        <div className="flex flex-row pl-12">
          <JournalContent key={props.msgObject.journalId}
            msgObject={props.msgObject} />
        </div>
      </Button>

      <LikeReport key={props.msgObject.journalId} msgObject={props.msgObject} setErrorFunc={(message) => setErrorMessage(message)}/>

      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />
    </div>
  )
}

export default JournalWrapper;