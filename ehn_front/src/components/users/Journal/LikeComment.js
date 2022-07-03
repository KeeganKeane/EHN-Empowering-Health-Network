import { Tooltip } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";
import ApiClient from "../../../util/axios";
import { getUserId, isLoggedIn } from "../../../util/userUtils";
import Zoom from '@mui/material/Zoom';

const LikeComment = (props) => {
  const [likedFrag, setLikedFrag] = useState();

  useEffect(() => {
    setLikedFrag(!!props.msgObject.likedStatus);
  }, []);

  const postLike = (path) => {
    let data = {
      journalId: props.msgObject.journalId
    }
    ApiClient.post(`/journal/${path}`, data)
      .then()
      .catch((error) => {
        props.setErrorFunc(error.response.data.message);
      })
  }

  const handleClick = (e) => {
    if (isLoggedIn()) {
      if (likedFrag) {
        e.target.classList.remove('like-comment-icon-click');
        e.target.parentElement.classList.remove('journal-like-button-is-active');
        e.target.classList.remove('fa-solid');
        postLike("removeLike");
        props.likeBtnClickHandler(-1);
      } else {
        e.target.classList.add('like-comment-icon-click');
        e.target.parentElement.classList.add('journal-like-button-is-active');
        e.target.classList.add('fa-solid');
        postLike("like");
        props.likeBtnClickHandler(1);
      }
      setLikedFrag(!likedFrag);
    }
  }


  return (
    <div className={"journal-like-button border-5 px-3 py-3 rounded-full " +
      ((likedFrag && !!props.msgObject.likedStatus) && ' journal-like-button-is-active ') + (isLoggedIn() && ' journal-like-button-hover ')}>
      <Tooltip title={<span style={{ fontSize: "12px" }}>{isLoggedIn() ? (likedFrag ? "RESET" : "LIKE") : "Please Log in"}</span>} disableFocusListener>
        <i className={
          "fa-regular fa-thumbs-up fa-2x like-comment-icon " +
          ((likedFrag && !!props.msgObject.likedStatus)&& 'like-comment-icon-click fa-solid')}
          onClick={handleClick}></i>
      </Tooltip>
    </div>
  )

}

export default LikeComment;