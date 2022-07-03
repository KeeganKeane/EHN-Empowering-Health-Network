import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiClient from '../../util/axios';
import ErrorMessage from '../users/ErrorMessage';
import { useParams, withRouter } from 'react-router-dom';




const AdminIndivisualReportPage = (props) => {
  const [journalMsg, setJournalMsg] = useState({});
  const [reportMsg, setReportMsg] = useState([]);
  const [id, setId] = useState(useParams().id);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    ApiClient.get(`/journal/post?journalId=${id}`)
    .then(res => {
      console.log(res);
      setJournalMsg(res.data);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
    })
    ApiClient.get(`/admin/getReports/${id}`)
    .then(res => {
      console.log(res.data);
      setReportMsg(res.data);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
    })

  }, [])

  const clickHide = () => {
    ApiClient.post(`/admin/hide/${id}`).then(res => {
      props.history.push("/admin/top")}).catch((error) => {
        setErrorMessage(error.response.data.message);
    })
  }

  const clickDismiss = () => {
    ApiClient.post(`/admin/dismissReport/${id}`).then(res => {
      props.history.push("/admin/top")}).catch((error) => {
        setErrorMessage(error.response.data.message);
    })
  }

  return (

    <div className="mt-4 mb-4 sm:mx-5">

      <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">
        <Link className="admintop-button flex w-full border-3 rounded-full py-3 border-gray-400 bg-blue-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
              to="/admin/top">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i className="fa-solid fa-bell px-3 self-center"></i>
            <div className="hidden sm:block self-center">
              Notifications
            </div>
          </div>
        </Link>

        <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
              to="/admin/posts/hide">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i class="fa-solid fa-trash-arrow-up px-3 self-center"></i>
            <div className="hidden sm:block self-center">
              Hidden Posts
            </div>
          </div>
        </Link>

        <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
              to="/admin/analytics">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i className="fa-solid fa-chart-line px-3 self-center"></i>
            <div className="hidden sm:block self-center"> Analytics </div>
          </div>
        </Link>
      </div>


      <div className="flex flex-col">
        <div className="report-notification font-bold text-4xl my-4">
          Report Detail
        </div>

        <div className="journal-post-background flex flex-col mx-auto w-full p-4">
          <div className="flex flex-row ml-6">
            <div className="flex flex-col w-full self-center my-2">
              <div className="text-3xl sm:text-5xl font-bold break-all"
                   style= {{ color: '#6B6B6B'}}>
                {journalMsg.title}
              </div>
              <div className="text-md"
                   style= {{ color: '#6B6B6B'}}>
               by {journalMsg.username}
              </div>
            </div>
            <div className="flex flex-col self-center bg-white p-4 border-2 rounded-full adminhide-button">
              <button onClick={clickHide}>
                <div className="flex mx-auto text-3xl place-content-center content-center">
                  <i class="fa-solid fa-ban text-4xl"></i>
                  <div className="pl-4 hidden sm:block self-center whitespace-pre">
                    Hide Post
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col py-3 sm:py-5 px-12 h-full w-full mx-auto my-2 sm:my-4 bg-white rounded-3xl text-2xl break-all"
               style= {{ color: '#8A8A8A'}}>
            {journalMsg.content}
          </div>
        </div>



        <div className="flex flex-col my-6 gap-2">
          <div className="flex mx-6">
            <div className="flex w-full my-2 font-bold text-3xl self-end report-notification ">
              Comments
            </div>
            <div className="flex flex-col self-center p-4 border-2 rounded-full py-4 admindismiss-button">
              <button onClick={clickDismiss}>
                <div className="flex mx-auto text-3xl place-content-center content-center">
                  <i className="fa-solid fa-comment-slash text-4xl"></i>
                  <div className="hidden sm:block self-center pl-4 whitespace-pre">
                    Dismiss Reporters
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="comment-area-background flex flex-col w-full mx-auto gap-4 p-4">
            {reportMsg.map((msg, index) => {
              return (
                <div className="flex w-full mx-auto"
                     style={{ color: "#8A8A8A"}}>
                  <div key={index}
                       className="comment-area flex flex-col p-4 sm:mx-6 w-full pl-6">
                    <div className="flex flex-row font-bold ml-6">
                      Reporter:
                      <div className="flex font-normal pl-1" >
                        {msg.userName}
                      </div>
                    </div>
                    <div className="flex-col font-bold ml-6">
                      Reporters comment:
                      <div className="font-normal w-full pr-2 break-all">
                        {msg.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ErrorMessage massage={errorMessage} handleClose={() =>{ setErrorMessage(null)} }/>
        </div>

      </div>

    )


}



export default withRouter(AdminIndivisualReportPage);