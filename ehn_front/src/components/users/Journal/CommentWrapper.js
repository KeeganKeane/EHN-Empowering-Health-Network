import React from 'react';
import JournalComment from './JournalComment';


const CommentWrapper = (props) => {
  const {comments} = props
  const renderNoComments = () => {
    return (
      <div className="self-center text-bold text-white sm:text-3xl">
        Be the first to comment!
      </div>
    )
  }

  console.log(comments);

  return (
    <div>
      <div className="flex flex-col gap-3">
        {comments.length > 0 ?
            comments.map((comment,index) => {
              return (
                  <JournalComment key={index} comment={comment} />
              )
            })
            :
            renderNoComments()
        }
      </div>
    </div>
  )
}

export default CommentWrapper;