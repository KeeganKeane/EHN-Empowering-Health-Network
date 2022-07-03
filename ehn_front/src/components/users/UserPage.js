import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from '../../util/utils';
import UserInformation from './UserInformation';
import ApiClient from '../../util/axios';
import MyPageWrapper from './MyPageWrapper';
import { getUserId } from '../../util/userUtils';
import ErrorMessage from './ErrorMessage';
import FrtCard from './frt/FrtCard';
import { Link } from 'react-router-dom';


const UserPage = () => {
  const [tabValue, setTabValue] = useState(1);
  const [journalMsg, setJournalMsg] = useState([]);
  const [likedJournalMsg, setLikedJournalMsg] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [frtList, setFrtList] = useState([]);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    ApiClient.get(`/journal/user/${getUserId()}`)
      .then(res => {
        setJournalMsg(res.data);
      }).catch(error => {
        setErrorMessage(error.response.data.message);
    })

    ApiClient.get(`/journal/like`)
      .then(res => {
        setLikedJournalMsg(res.data);
      }).catch(error => {
        setErrorMessage(error.response.data.message);
    })

    ApiClient.get(`/frt/allRateHistory`)
    .then(res => {
      setFrtList(res.data);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
    })
  }, []);


  return (
    <div className="sm:mx-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mx-auto">
          <UserInformation />
        </div>

        <div className="flex flex-col w-full">
          <Tabs value={tabValue}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: '#E4E1E1' } }}
            aria-label="wrapped label tabs example">

            <Tab value={1}
              label="My Posts"
              style={{
                textDecoration: 'none',
                textTransform: 'none',
                fontSize: "14px",
                color: "#8A8A8A"
              }}
              className="tab" />
            <Tab value={2}
              label="Liked Posts"
              style={{
                textDecoration: 'none',
                textTransform: 'none',
                fontSize: "14px",
                color: "#8A8A8A"
              }}
              className="tab" />
            <Tab value={3}
              label="Flavour Rating"
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
                        <MyPageWrapper msgObject={msg}
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
                        No posts. Go to Journal to create your first post!
                     </div>
                </Link>
            }
          </TabPanel>

          <TabPanel value={tabValue}
            index={2}
            className="my-post-area-background w-full mx-auto">
            {
              likedJournalMsg.length >= 1 ?
                <div className="flex flex-col py-4 sm:px-4 h-full w-full mx-auto gap-2">
                  {
                    likedJournalMsg.map((msg, index) => {
                      return (
                        <MyPageWrapper msgObject={msg} key={index} isMine={false} />
                      );
                    })
                  }
                </div>
                :
                <Link className="reported-info" to={`/`}>
                     <div className="comment-area p-4 text-xl sm:text-3xl text-bold text-zinc-500">
                        No liked posts. Go to Journal to like your first post!
                     </div>
                </Link>
            }

          </TabPanel>

          <TabPanel value={tabValue}
            index={3}
            className="my-post-area-background w-full mx-auto">
            {
             frtList.length >= 1 ?
             <div className="py-4 sm:px-4 flex flex-col gap-4">
               {
                 frtList.map((frt, index) => {
                   var hasRating;
                   if (!frt.noTasteCount && !frt.tastesDifferentCount && !frt.tastesSameCount &&!frt.tastesWorseCount){
                     hasRating=false;
                   }else{
                     hasRating=true;
                   }
                   return <FrtCard foodInfo={frt} key={index} hasRating={hasRating}/>
                 })
               }
             </div>
             :
            <Link className="reported-info" to={`/users/frt`}>
                 <div className="comment-area p-4 text-xl sm:text-3xl text-bold text-zinc-500 self-center">
                    Go to Foomy to rate your first food item!
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

export default UserPage;