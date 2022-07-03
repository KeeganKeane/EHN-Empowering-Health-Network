import React, {useState, useEffect} from 'react';
import FoodCommentContainer from './FoodCommentContainer';
import ApiClient from '../../../util/axios';


const FoodCommentWrapper = (props) => {

  return (
    <div className="frt-comment-area-background">
      {
        props.comments.length === 0 ?
            <div className="flex flex-col py-4">
                <div className="self-center text-bold text-white sm:text-3xl">
                    Be the first to comment!
                </div>
            </div>
        :
        <div className="flex flex-col gap-3 m-4">
          {
            props.comments.map((comment, index) => {
              return <FoodCommentContainer comment={comment} key={index} />
            })
          }
        </div>
      }
    </div>
  )
}

export default FoodCommentWrapper;