import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ApiClient from '../../util/axios';
import LoadModel from '../LoadModal';
import ErrorMessage from './ErrorMessage';
import FoodSearch from './frt/FoodSearch';
import FrtCard from './frt/FrtCard';
import queryString from 'query-string';

const FRTListPage = () => {
  const [frtList, setFrtList] = useState([]);
  const [modalOpen, setModelOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setModelOpen(true);
    if (!!Object.keys(queryString.parse(location.search)).length) {
      let q = queryString.parse(location.search)["q"];
      setSearchKeyword(q);
      ApiClient.get(`/frt/search?keyword=${q}`)
      .then(res => {
        setFrtList(res.data);
        setModelOpen(false);
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
        setModelOpen(false);
      })
    }else {
      ApiClient.get('/frt')
      .then(res => {
        setFrtList(res.data);
        setModelOpen(false)
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
        setModelOpen(false)
      })
    }
  }, []);

  const searchHandler = (kw) => {
    setModelOpen(true);
    ApiClient.get(`/frt/search?keyword=${kw}`)
    .then(res => {
      setFrtList(res.data);
      setSearchKeyword(kw);
      history.push(`/users/frt?q=${kw}`);
      setModelOpen(false);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setModelOpen(false);
    })
  }
  

  return (
    <div>
      <br />
      <FoodSearch searchHandler={searchHandler} searchKeyword={searchKeyword} />
      <div className="text-4xl font-bold other-user-name ml-4 mt-2">Most voted food</div>
      <div className="frt-area-background py-4 flex flex-col gap-2">
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
      <LoadModel open={modalOpen}/>
      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />
    </div>
  )

};

export default FRTListPage;

