import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel } from '../../util/utils';
import ApiClient from '../../util/axios';
import UserPageWrapper from './UserPageWrapper';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const OtherUserPage = (props) => {
  const [tabValue, setTabValue] = useState(1);
  const [UserMsg, setUserMsg] = useState([]);
  const [journalMsg, setJournalMsg] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [id, setId] = useState(useParams().id);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    ApiClient.get(`/journal/user/${id}`)
      .then(res => {
        setJournalMsg(res.data);
      }).catch(error => {
        setErrorMessage(error.response.data.message);
    })
  }, []);

  useEffect(() => {
    ApiClient.get(`/user/${id}`)
      .then(res => {
        setUserMsg(res.data);
      }).catch(error => {
        setErrorMessage(error.response.data.message);
    })
  }, []);


  return (
    <div className="sm:mx-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col w-full">
          <div className="text-5xl font-bold other-user-name ml-4 mt-2">{UserMsg.userName}'s Posts </div>
          <Tabs value={tabValue}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#E4E1E1' } }}
            aria-label="wrapped label tabs example">

            <Tab value={1}
              label="All Posts"
              style={{
                textDecoration: 'none',
                textTransform: 'none',
                fontSize: "14px",
                color: "#8A8A8A"
              }}
              className="tab" />
          </Tabs>

          <TabPanel value={tabValue}
            index={1}
            className="my-post-area-background w-full mx-auto">
            {
              journalMsg.length >= 1 ?
                <div className="flex flex-col py-4 sm:px-4 h-full w-full sm:mx-auto gap-2">
                  {
                    journalMsg.map((msg, index) => {
                      return (
                        <UserPageWrapper msgObject={msg}
                                       key={index}
                                       isMine={true}
                                       deleteFunc={() => {
                          let tempArray = [...journalMsg];
                          tempArray.splice(index, 1);
                          setJournalMsg(tempArray);
                        }} />
                      );
                    })
                  }
                </div>
                :
                <Link className="reported-info" to={`/`}>
                     <div className="comment-area p-4 text-xl sm:text-3xl text-bold text-zinc-500">
                        No posts.
                     </div>
                </Link>
            }
          </TabPanel>
        </div>

      </div>
      <ErrorMessage message={errorMessage} handleClose={() => {setErrorMessage(null)}}/>
    </div>
  )
}

export default OtherUserPage;