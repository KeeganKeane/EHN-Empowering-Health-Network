import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiClient from '../../util/axios';
import ErrorMessage from '../users/ErrorMessage';
import { useParams ,withRouter} from 'react-router-dom';



const AdminIndivisualHiddenPage = (props) => {
    const [journalMsg, setJournalMsg] = useState({});
    const [reportMsg, setReportMsg] = useState([]);
    const [id, setId] = useState(useParams().id);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        ApiClient.get(`/admin/hidedJournal/${id}`)
        .then(res => {
            console.log(res);
            setJournalMsg(res.data);
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
        })
    }, [])

    const clickHide = () => {
        ApiClient.patch(`/admin/unhideJournal/${id}`).then(res => {
            props.history.push("/admin/posts/hide")
        }).catch((error) => {
                setErrorMessage(error.response.data.message);
            })
    }

  return (

    <div className="sm:m-4">


      <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">
        <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
              to="/admin/top">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i className="fa-solid fa-bell px-3 self-center"></i>
            <div className="hidden sm:block self-center">
              Notifications
            </div>
          </div>
        </Link>

        <Link className="admintop-button flex w-full border-3 rounded-full py-3 border-gray-400 bg-blue-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
        to="/admin/posts/hide">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i className="fa-solid fa-trash-arrow-up px-3 self-center"></i>
            <div className="hidden sm:block self-center">
              Hidden Posts
            </div>
          </div>
        </Link>

        <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
        to="/admin/analytics">
          <div className="flex mx-auto text-3xl place-content-center content-center">
            <i className="fa-solid fa-chart-line px-3 self-center"></i>
            <div className="hidden sm:block self-center">
              Analytics
            </div>
          </div>
        </Link>

      </div>


      <div className="report detail area">
        <div className="text-center text-xl sm:text-3xl p-4 bg-red-300" >
          <b>Important:</b> Post will be reinstated once Unhide Post button is clicked
        </div>

        <div className="flex flex-col">
          <div className="report-notification font-bold text-4xl my-4">
            Hidden Post Detail
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
                  by {journalMsg.userName}
                </div>
              </div>
              <div className="flex flex-col self-center bg-white p-4 border-2 rounded-full adminhide-button">
                <button onClick={clickHide}>
                  <div className="flex mx-auto text-3xl place-content-center content-center">
                    <i className="fa-solid fa-ban text-4xl"></i>
                    <div className="pl-4 hidden sm:block self-center whitespace-pre">
                      Unhide Post
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
        </div>
        <ErrorMessage massage={errorMessage} handleClose={() =>{ setErrorMessage(null)} }/>
      </div>

    </div>

  )


}



export default withRouter(AdminIndivisualHiddenPage);