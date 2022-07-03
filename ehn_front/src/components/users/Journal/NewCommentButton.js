import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ApiClient from '../../../util/axios';
import { getUserId, isLoggedIn } from '../../../util/userUtils';


class NewCommentButton extends Component {
  constructor(props) {
    super(props);
    this.transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    this.state = {
      openCommentForm: false,
      commentError: false,
      newComment: ""
    }

    this.handleClickOpenCommentForm = this.handleClickOpenCommentForm.bind(this);
    this.handleClickCloseCommentForm = this.handleClickCloseCommentForm.bind(this);
    this.handleClickSendComment = this.handleClickSendComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.errorHandler = this.props.errorHandler;
  }

  handleClickOpenCommentForm() {
    this.setState(() => ({
      openCommentForm: true
    }))
  }

  handleClickCloseCommentForm() {
    this.setState(() => ({
      openCommentForm: false,
      commentError: false
    }))
  }


  handleChangeComment(event) {
    this.setState(() => ({
      newComment: event.target.value
    }))
  }

  handleClickSendComment(event) {
    if (!isLoggedIn()){
      this.setState(() => ({
        commentError: true,
      }))
      return;
    }
    ApiClient.post('/journal/comment',{
      userId: getUserId(),
      journalId: this.props.journalId,
      comment: this.state.newComment
    }).then( res => {
      this.props.updateCommentsNumber()
    }).catch(error => {
      this.errorHandler(error.response.data.message)
    })
    this.setState(() => ({
      openCommentForm: false,
      newComment: ""
    }))
  }

  render() {
    return (
      <div className="rounded-full text-center">
        <Button variant="text"
                onClick={this.handleClickOpenCommentForm}
                style={{ color: '#8A8A8A',
                         fontSize: '15px',
                         textDecoration: 'none',
                         textTransform: 'none'}}>
          <div className="sm:hidden flex">
            <i className="fa-solid fa-circle-plus fa-2x sm:hidden"></i>
          </div>
          <div className="hidden sm:flex"> New Comment </div>
        </Button>
        <Dialog 
          open={this.state.openCommentForm} 
          onClose={this.handleClickCloseCommentForm}
          TransitionComponent={this.transition}
          keepMounted
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
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ fontSize: "23px",
                                fontWeight: "bold",
                                color: "#8A8A8A"}}>
            Add a Comment
          </DialogTitle>
          {
            this.state.commentError &&
            <div className='comment-error-msg'>
              Please Log In to Comment.
            </div>
          }

          <DialogContent>
            <TextField autoFocus
                       margin="dense"
                       id="name"
                       type="text"
                       fullWidth
                       rows={6}
                       style={{ border: "1px solid #F3F3F3",
                                borderRadius: "20px",
                                paddingRight: "20px",
                                paddingLeft: "20px",
                                backgroundColor: "#FFFFFF",
                       }}
                       multiline
                       variant="standard"
                       InputProps={{ disableUnderline: true,
                                     style: { fontSize: 18 }}}
                       value={this.state.newComment}
                       onChange={this.handleChangeComment} />
          </DialogContent>

          <DialogActions>
            <div className="flex flex-row gap-4 w-full px-2 mx-auto justify-center">
              <div className="cancel-comment-button w-full self-center text-center">
                <Button className="h-full w-full"
                        style={{ border: "1px solid #F3F3F3",
                                 textDecoration: 'none',
                                 textTransform: 'none',
                                 fontSize: "18px",
                                 borderRadius: 100,
                        }}
                        onClick={this.handleClickCloseCommentForm}>
                  <div className="hidden sm:flex">
                    <span className= "button-text"
                          style= {{ textDecoration: 'none',
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
                        style={{ border: "1px solid #F3F3F3",
                                 textDecoration: 'none',
                                 textTransform: 'none',
                                 fontSize: "18px",
                                 borderRadius: 100,
                        }}
                        onClick={this.handleClickSendComment}>
                  <div className="hidden sm:flex">
                    <span className= "button-text"
                          style= {{ textDecoration: 'none',
                                    textTransform: 'none',}}>
                          Send Comment </span>
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

}

export default NewCommentButton;