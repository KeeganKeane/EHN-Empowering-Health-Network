import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ApiClient from '../../../util/axios';
import { getUserId } from '../../../util/userUtils';
import { LoginContext } from '../../../routers/AppRouter';

const ReportComment = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageReport, setShowMessageReport] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogIn, setIsLogIn] = useContext(LoginContext);
  const { setErrorFunc } = props;

  const handleClose = () => {
    setIsOpen(false);
    setShowMessageReport(false);
  }
  const handleClickOpen = () => {
    setIsOpen(true);
  }

  const handlePostReport = () => {
    if(!isLogIn){
      setShowMessageReport(true);
      return
    }
    let data = {
      userId: getUserId(),
      journalId: props.msgObject.journalId,
      message: message
    }
    ApiClient.post("/journal/report", data)
      .then(res => {
        setIsOpen(false);
        setMessage("");
      }).catch((error) => {
        setErrorFunc(error.response.data.message);
      })
  }

  return (
    <div>
      <div className="journal-report-button border-5 px-3 py-3 rounded-full">
        <i className="report-button-icon fa-solid fa-triangle-exclamation fa-2x"
          onClick={handleClickOpen}>
        </i>
      </div>

      <Dialog open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#EAE7E7",
            paddingTop: "20px",
            paddingBottom: "30px",
            paddingLeft: "2px",
            paddingRight: "2px",
            width: "500px",
            boxShadow: 'none',
            borderRadius: "20px",
            border: "3px solid #A09F9F",
          },
        }}>
        <DialogTitle style={{
          fontSize: "23px",
          fontWeight: "bold",
          color: "#8A8A8A"
        }}>
          Report Journal
          {
            showMessageReport &&
            <p className='reportComment-login-message'>
              You Need To Login To Report A Journal
            </p>
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please tell us what you think made this journal inappropriate.
            The administrator will view your report and make a decision.
          </DialogContentText>
          <TextField autoFocus
            margin="dense"
            id="name"
            type="report"
            fullWidth
            variant="standard"
            style={{
              border: "1px solid #F3F3F3",
              borderRadius: "20px",
              paddingRight: "20px",
              paddingLeft: "20px",
              backgroundColor: "#FFFFFF",
            }}
            multiline
            rows={6}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: 18 }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <div className="flex flex-row gap-4 w-full px-2 mx-auto justify-center">

            <div className="cancel-comment-button w-full self-center text-center">
              <Button className="h-full w-full"
                      style={{ border: "1px solid #F3F3F3",
                               textDecoration: 'none',
                               textTransform: 'none',
                               fontSize: "18px",
                               borderRadius: 100,}}
                      onClick={handleClose}>
                <div className="hidden sm:flex">
                  <span className="button-text"
                        style={{ textDecoration: 'none',
                                 textTransform: 'none',}}>
                    Cancel </span>
                </div>
                <div className="sm:hidden">
                  <i className="fa-solid fa-xmark button-text"></i>
                </div>
              </Button>
            </div>

            <div className="send-comment-button w-full self-center text-center">
              <Button className="h-full w-full"
                      style={{  border: "1px solid #F3F3F3",
                                textDecoration: 'none',
                                textTransform: 'none',
                                fontSize: "18px",
                                borderRadius: 100, }}
                      onClick={handlePostReport}>
                <div className="hidden sm:flex">
                  <span className="button-text"
                    style={{  textDecoration: 'none',
                              textTransform: 'none',
                    }}>
                    Report </span>
                </div>
                <div className="sm:hidden">
                  <i className="fa-solid fa-check fa-1x button-text"></i>
                </div>
              </Button>
            </div>
          </div>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ReportComment;