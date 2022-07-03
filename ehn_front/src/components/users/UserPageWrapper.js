import React, { useState } from 'react';
import { Button } from '@mui/material';
import JournalContent from './Journal/JournalContent';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import LikeReport from './Journal/LikeReport';
import DeleteDialog from './Journal/DeleteDialog';

const UserPageWrapper = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const EditDelete = () => {
    return (
      <div className="flex flex-col w-2/4 lg:w-1/4 mx-auto">
        <div className="flex h-full"></div>
        <div className="flex flex-col sm:flex-row py-2 gap-4 h-full object-contain justify-center">
          <div>
            <Link to={`/users/posts/edit/${props.msgObject.journalId}`}>
                          <button>
                            <div className="journal-edit-button border-4 px-3 py-3 rounded-full flex">
                                <i className="fa-solid fa-pen-to-square fa-2x self-center mx-auto"></i>
                            </div>
                          </button>
                        </Link>
          </div>

          <div>
            <button onClick={() => setIsOpen(true)}>
                            <div className="journal-delete-button border-4 px-3 py-3 rounded-full flex self-center">
                                <i className="fa-solid fa-trash-can fa-2x self-center mx-auto"></i>
                            </div>
                        </button>
                      <DeleteDialog isOpen={isOpen}
                      journalId={props.msgObject.journalId}
                      handleClose={() => setIsOpen(false)}
                      setErrorFunc={(message) => setErrorMessage(message)}
                      deleteFunc={() => props.deleteFunc()}/>
          </div>
        </div>
        <div className="flex h-full"></div>
      </div>
    );
  }



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
          borderRadius: '50px 50px 50px 50px',
        }}>
        <div className="flex flex-row pl-12">
          <JournalContent key={props.msgObject.journalId}
            msgObject={props.msgObject} />
        </div>
      </Button>

      

      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />
    </div>
  )
}

export default UserPageWrapper;