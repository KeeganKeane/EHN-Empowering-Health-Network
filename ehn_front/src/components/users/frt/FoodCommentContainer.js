import React from 'react';
import { dateFunction } from '../../../util/utils';


const FoodCommentContainer = (props) => {
  const {comment} = props
  return (
    <div className="comment-area px-5 py-4 flex flex-col bg-red-500">
      <div className="font-bold text-2xl"
           style={{ color: '#6B6B6B'}}>
        {comment.userName}
      </div>
      <div className="text-xl"
           style={{ color: '#6B6B6B'}}>
        {dateFunction(comment.createdAt)}
      </div>
      <br />
      <div className="text-2xl whitespace-pre-line"
           style={{ color: '#6B6B6B'}}>
        {comment.comment}
      </div>
    </div>
  )
}

export default FoodCommentContainer;