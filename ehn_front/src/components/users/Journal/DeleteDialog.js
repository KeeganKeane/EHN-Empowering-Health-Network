import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ApiClient from "../../../util/axios";
import { styled } from '@mui/material/styles';

const DeleteDialog = (props) => {
    const {isOpen, journalId, handleClose, setErrorFunc, deleteFunc} = props;

    const handleDelete = () => {
      ApiClient.delete(`/journal/${journalId}`)
      .then((res) => {
        deleteFunc()
        handleClose()
      })
      .catch((error) => {
        setErrorFunc(error.response.data.message);
      });
    }

    const CustomButton = styled(Button)({
      color: '#A09F9F',
      "&:hover": {
        color:  '#ffffff',
      },
    });

    return (
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
            Delete?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* TODO: Dialog text */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-row gap-4 w-full px-2 mx-auto justify-center">
              <div className="cancel-comment-button w-full self-center text-center">
                <CustomButton className="cancel-test h-full w-full"
                  style={{
                    border: "1px solid #F3F3F3",
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontSize: "18px",
                    borderRadius: 100,
                  }}
                  onClick={() => handleClose()}>
                  Cancel
                </CustomButton>
              </div>
              <div className="delete-report-button w-full self-center text-center">
                <CustomButton className="h-full w-full"
                  style={{
                    border: "1px solid #F3F3F3",
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontSize: "18px",
                    borderRadius: 100,
                  }}
                  onClick={() => handleDelete()}>
                    Delete
                </CustomButton>
              </div>
            </div>

          </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;