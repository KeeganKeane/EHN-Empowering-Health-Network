import React, { useEffect, useState } from 'react';
import {dateFunction} from '../../../util/utils';

const JournalComment = (props) => {
  return (
    <div className="comment-area px-5 py-4 flex flex-col bg-red-500">
      <div className="font-bold text-2xl"
           style={{ color: '#6B6B6B'}}>
        {props.comment.userName}
      </div>
      <div className="text-xl"
           style={{ color: '#6B6B6B'}}>
        {dateFunction(props.comment.createdAt)}
      </div>
      <br />
      <div className="text-2xl whitespace-pre-line"
           style={{ color: '#6B6B6B'}}>
        {props.comment.comment}
      </div>
    </div>
  )
}

export default JournalComment;