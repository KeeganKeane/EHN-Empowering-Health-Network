import React , {useState, useEffect} from 'react';
import FoodCommentWrapper from './frt/FoodCommentWrapper';
import FrtDetailCart from './frt/frtDetailCart';
import NewCommentButton from './frt/NewCommentButton';
import ApiClient from '../../util/axios';
import ErrorMessage from './ErrorMessage';

const FRTDetailPage = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState("")

   useEffect(() => {
      ApiClient.get(`/frt/comment/${props.match.params.id}`)
      .then(res => {
          console.log(res.data);
          setComments(res.data);
      }).catch(error => {
        setErrorMessage(error.response.data.message);
      });
    },[])

  const updateCommentsNumber = () => {
    ApiClient.get(`/frt/comment/${props.match.params.id}`)
    .then(res => {
      console.log(res);
      setComments(res.data);
    }).catch(error => {
      setErrorMessage(error.response.data.message);
    });
  }

  return(
    <div className="py-4 flex flex-col">
      <FrtDetailCart foodId={props.match.params.id} errorHandler={(message) => setErrorMessage(message)}/>
      <br />
      <div className="new-comment-button-area flex flex-row pb-2">
        <div className="self-center w-full font-bold text-3xl"
             style={{ color: "#8A8A8A"}}>
          Comments
        </div>
        <div className="add-comment-button self-center">
          <NewCommentButton updateCommentsNumber={updateCommentsNumber}
                            foodId={props.match.params.id}
                            errorHandler={(msg) => setErrorMessage(msg)}/>
        </div>
      </div>

      <FoodCommentWrapper comments={comments}/>
      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />
    </div>
  )
};

export default FRTDetailPage;

