import React, { Component, useContext, useEffect, useState } from 'react';
import SortJournal from './Journal/SortJournal';
import TextField from "@mui/material/TextField";
import ApiClient from '../../util/axios';
import JournalWrapper from './JournalWrapper';
import { getUserId } from '../../util/userUtils'
import { useLocation, Link, useHistory} from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { LoginContext } from '../../routers/AppRouter';
import FilterJournal from './Journal/FilterJournal';
import queryString from 'query-string';

const MainPage = (props) => {
  const [sort, setSort] = useState("newest");
  const [journalMsg, setJournalMsg] = useState([]);
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isValidation, setIsValidation] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLogIn, setIsLogIn] = useContext(LoginContext);

  const history = useHistory();
  const location = useLocation();
  const sortGenre = ["newest", "popular", "oldest"];




  useEffect(() => {
    if (!!props.validationMessage) {
      setIsValidation(true);
    }
    if (!!Object.keys(queryString.parse(location.search)).length) {
      let q = queryString.parse(location.search)["q"];
      setSearchKeyword(q);
      ApiClient.get(`/journal/search?size=${null}&page=${null}&keyword=${q}&sortKey=${sort}`)
      .then(res => {
        setJournalMsg(res.data);
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
      }
      )
    }else {
      ApiClient.get(`/journal/sort?sortKey=newest`)
      .then(res => {
        setJournalMsg(res.data);
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
      })
    }


  }, [isLogIn]);


  const sortJournalHandler = (sortKey) => {
    ApiClient.get(`/journal/sort?sortKey=${sortKey}`)
      .then(res => {
        setJournalMsg(res.data);
        setSort(sortKey);
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
      })
  }

  const filterJournalHandler = (filterData) => {
    ApiClient.get(`/journal/filterBy?filterKey=${filterData.filterKey}&lowerAgeGroup=${filterData.lowerAgeGroup}&upperAgeGroup=${filterData.upperAgeGroup}&lowerDate=${filterData.lowerDate}&upperDate=${filterData.upperDate}&lowerRating=${filterData.lowerRating}&upperRating=${filterData.upperRating}&userId=${getUserId()}`)
    .then(res => {
      setJournalMsg(res.data);
      setSort(sort);
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
    })
  }

  const onSearch = (key) => {
    ApiClient.get(`/journal/search?size=${null}&page=${null}&keyword=${key}&sortKey=${sort}`)
      .then(res => {
        setJournalMsg(res.data);
        history.push(`/?q=${key}`);
        console.log(location.search);
      }).catch((error) => {
        setErrorMessage(error.response.data.message);
      }
      )
  }

  return (
    <div className="sm:px-4 flex flex-col">
      <Collapse in={isValidation}>
        <Alert severity="error"
               action={ <IconButton aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => { setIsValidation(false);}}>
                          <CloseIcon fontSize="inherit" />
                        </IconButton> } >
          <div className='text-xl'>
            {props.validationMessage}
          </div>
        </Alert>
      </Collapse>

      <br />


      <div className="flex flex-row mx-4 mb-4 justify-center">
        <TextField id="outlined-basic"
                   variant="outlined"
                   label="Search"
                   className="w-full"
                   value={searchKeyword}
                   onChange={(e) => setSearchKeyword(e.target.value)}
                   onKeyPress={(e) => { if (e.key === 'Enter') { onSearch(e.target.value);}}} />
        <div className="sm:hidden">
          <Button className="w-1/5 h-full border"
                  style={{ backgroundColor: "#8FBDD3" }}
                  onClick={() => onSearch(searchKeyword)}>
            <i className="fa-solid fa-magnifying-glass fa-2x"></i>
          </Button>
        </div>
      </div>

      <br />

      <div className="flex flex-row">
        <div className="flex w-full">
          <SortJournal sortJournalHandler={sortJournalHandler}
            sortGenre={sortGenre} sort={sort}/>
        </div>

        <div className="flex justify-right mr-6">
          <FilterJournal filterJournalHandler={filterJournalHandler}/>
        </div>
      </div>

      <div className="journal-area-background flex flex-col pt-5 sm:px-6 border gap-2">
        {
          journalMsg.map((msg, index) => {
            return (
              <JournalWrapper msgObject={msg}
                              key={index}/>
            );
          })
        }
      </div>
      {isLogIn &&
      <div className="journal-add-post-button border-5 px-3 py-3 rounded-full">
        <Link to={"/users/posts/new"}
        style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="fa-solid fa-stack-1x fa-circle-plus fa-2x align-center"></i>
        </Link>
      </div>
      }

      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />

    </div>
  )
};


export default MainPage;

