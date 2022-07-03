import React, { Component } from 'react';
import JournalContent from './Journal/JournalContent';
import LikeComment from './Journal/LikeComment';
import ReportComment from './Journal/ReportComment';
import ApiClient from '../../util/axios';
import CommentWrapper from './Journal/CommentWrapper';
import NewCommentButton from './Journal/NewCommentButton';
import { dateFunction } from '../../util/utils'
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';


class PostDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalMsg: {},
      comments: [],
      errorMessage: null,
      likeCount: null
    }
    this.comment = [];
    this.updateCommentsNumber = this.updateCommentsNumber.bind(this);
    this.likeBtnClickHandler = this.likeBtnClickHandler.bind(this);
  }

  componentDidMount() {
    ApiClient.get(`/journal/post?journalId=${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState(() => ({
          journalMsg: res.data,
          likeCount: res.data.overallRating
        }))
      }).catch((error) => {
        this.setErrorMessage(error.response.data.message);
      })
    ApiClient.get(`/journal/comment/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data);
        this.setState(() => ({
          comments: res.data
        }))
      }).catch((error) => {
        this.setErrorMessage(error.response.data.message);
      })
  }

  likeBtnClickHandler(num) {
    this.setState(() => ({
      likeCount: this.state.likeCount + num
    }))
  }

  updateCommentsNumber() {
    ApiClient.get(`/journal/comment/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        this.setState(() => ({
          comments: res.data
        }))
      }).catch((error) => {
        this.setErrorMessage(error.response.data.message);
      })
  }

  setErrorMessage(msg) {
    this.setState(() => ({
      errorMessage: msg
    }))
  }



  render() {
    return (
      <div className="py-4 flex flex-col">

        <div className="journal-post-background flex gap-4 flex-col py-3 px-4 ">
          <div className="py-3 px-4">
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-5/6">
                <div className="text-md"
                  style={{ color: '#6B6B6B' }}>
                  {dateFunction(this.state.journalMsg.createdAt)}
                </div>
                <div className="text-5xl font-bold break-words"
                  style={{ color: '#6B6B6B' }}>
                  {this.state.journalMsg.title}
                </div>
                <div className="text-md" style={{ color: '#6B6B6B' }}>
                  by <Link to={`/users/${this.state.journalMsg.userId}`} className="link-off font-semibold" style={{ color: '#6B6B6B' }}>{this.state.journalMsg.username}</Link>
                </div>
              </div>
              <div className="self-center position-relative">
                <LikeComment key={this.state.journalMsg.journalId}
                  msgObject={this.state.journalMsg}
                  setErrorFunc={(message) => this.setErrorMessage(message)}
                  likeBtnClickHandler={this.likeBtnClickHandler} />
                <span className="position-absolute -bottom-5 -right-4 text-sm bg-gray-200 px-4 py-3 rounded-full">
                  {this.state.likeCount}
                </span>
              </div>
              <div className="self-center">
                <ReportComment key={this.state.journalMsg.journalId} msgObject={this.state.journalMsg} setErrorFunc={(message) => this.setErrorMessage(message)} />
              </div>
            </div>

            <br />

            <div className="w-full text-2xl break-words"
              style={{ color: '#8A8A8A' }}>
              <ReactMarkdown children={this.state.journalMsg.content} remarkPlugins={[remarkGfm]} />
              {console.log(this.state.journalMsg.content)}
            </div>
          </div>
        </div>

        <br />

        <div className="new-comment-button-area flex flex-row pb-2">
          <div className="self-center w-full font-bold text-3xl"
            style={{ color: "#8A8A8A" }}>
            Comments
          </div>
          <div className="add-comment-button self-center">
            <NewCommentButton updateCommentsNumber={this.updateCommentsNumber}
              journalId={this.props.match.params.id}
              errorHandler={(msg) => { this.setState(() => ({ errorMessage: msg })) }} />
          </div>
        </div>

        <div className="comment-area-background">
          <div className="px-4 py-4 mx-auto">
            <CommentWrapper comments={this.state.comments} />
          </div>
        </div>
        <ErrorMessage message={this.state.errorMessage} handleClose={() => { this.setState(() => ({ errorMessage: null })) }} />
      </div>
    )
  }
}

export default PostDetailPage;

