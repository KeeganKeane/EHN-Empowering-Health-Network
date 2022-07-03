import React, {useState, useEffect} from 'react';
import { convertFlavourMessage } from '../../../util/utils';
import FrtChartDetailed from './FrtChartDetailed';
import ApiClient from '../../../util/axios';
import { getUserId } from '../../../util/userUtils';
import Fab from '@material-ui/core/Fab';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import FrtChart from './FrtChart';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const FrtDetailCart = (props) => {
  const [frtData, setFrtData] = useState({});
  const [pieData, setPieData] = useState([]);
  const [showLoad, setShowLoad] = useState(false);
  const [hasAnyRating , setHasAnyRating] = useState(false);
  const [openSnack, setOpenSnack] = useState(false); 
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    setShowLoad(true);
    ApiClient.get(`/frt/getFood/${props.foodId}`)
    .then(res => {
      let foodCategory = res.data.breadcrumbs[0];
      setFrtData({...res.data, foodCategory: foodCategory});
      if ( res.data.noTastesCount || res.data.tastesDifferentCount || res.data.tastesSameCount || res.data.tastesWorseCount) {
        setHasAnyRating(true)
      }

      setPieData([
        {
          name: convertFlavourMessage("noTastesCount"),
          value: res.data.noTastesCount,
          color: "#D1D1D1"
        },
        {
          name: convertFlavourMessage("tastesDifferentCount"),
          value: res.data.tastesDifferentCount,
          color: "#F7D59C"
        },
        {
          name: convertFlavourMessage("tastesSameCount"),
          value: res.data.tastesSameCount,
          color: "#B4CFB0"
        },
        {
          name: convertFlavourMessage("tastesWorseCount"),
          value: res.data.tastesWorseCount,
          color: "#FF7878"
        }
      ])
      setShowLoad(false);
    }).catch((error) => {
      props.errorHandler(error.response.data.message)
      setShowLoad(false);
    }
    )
  },[])

  const handleCloseSnackbar = () => {
    setOpenSnack(false);
  };

  const sortFRT = (data) => {
    if (data.length === 0){
      return "Tastes Same"
    }
    return data.slice().sort((a,b) => b.value - a.value)
  }

  const handleClickRating = (e) => {
    var data = {
      foodId: frtData.foodId,
      userId: getUserId(),
      rating: e.currentTarget.dataset.value
    }
    setSnackbarMsg(`You have voted to ${e.currentTarget.dataset.value}. Thanks for voting!!`)
    setHasAnyRating(true)
    ApiClient.post("/frt/rate", data)
    .then(res => {
        ApiClient.get(`/frt/getFood/${props.foodId}`)
        .then(foodRes => {
          setFrtData(foodRes.data)
          setPieData([
            {
              name: convertFlavourMessage("noTastesCount"),
              value: foodRes.data.noTastesCount,
              color: "#D1D1D1"
            },
            {
              name: convertFlavourMessage("tastesDifferentCount"),
              value: foodRes.data.tastesDifferentCount,
              color: "#F7D59C"
            },
            {
              name: convertFlavourMessage("tastesSameCount"),
              value: foodRes.data.tastesSameCount,
              color: "#B4CFB0"
            },
            {
              name: convertFlavourMessage("tastesWorseCount"),
              value: foodRes.data.tastesWorseCount,
              color: "#FF7878"
            }
          ])
          setOpenSnack(true);
        }).catch((error) => {
          props.errorHandler(error.response.data.message)
        }
        )

    }).catch((error) => {
      props.errorHandler(error.response.data.message)
    }
    )
  }

  return (
    <div className="frt-post-background flex gap-4 flex-col py-3 px-4">

      <div className="flex flex-col gap-4 py-3 px-4"
           style={{ color: "#8A8A8A"}}>
        <div className="w-full text-5xl font-bold">
          {frtData.foodName}
        </div>

        <div className="flex flex-col xl:flex-row gap-4 xl:py-3 xl:px-4">
          <div className="relative flex-shrink-0 w-96 rounded-2xl border h-96 mx-auto ">
            {showLoad ?
              <Box sx={{ display: 'flex',justifyContent: 'center',alignItems: 'center', p: '40%'}}>
                <CircularProgress />
              </Box>
              :
              <a href={`https://search.rakuten.co.jp/search/mall/coke/`}>
              <img src={frtData.photoAddress}
              alt={frtData.foodName}
              className="absolute object-contain h-96 w-96 border bg-white rounded-2xl" /></a>
            }

          </div>

          <div className="flex flex-col w-full gap-2">

            { hasAnyRating ?
              <div>
                <div className="flex text-xl sm:text-2xl">
                  Most People say it
                </div>
                <div className="flex font-bold text-3xl sm:text-5xl">
                  {sortFRT(pieData)[0].name}
                </div>
              </div>
            :
              <div>
                <div className="text-xl sm:text-3xl">
                  Sorry, there are currently no reviews for this item
                </div>
                <div className="font-bold sm:text-5xl">
                  Be the first to review!
                </div>
              </div>
            }

            <div className="flex sm:hidden sm:w-1/2 self-center ">
              { hasAnyRating ?
                <FrtChartDetailed pieData={pieData} />
              :
                <Avatar sx={{ width: 65,
                              height: 65 }}
                        className="mx-auto self-center justify-center">
                    <CloseIcon fontSize="large" />
                </Avatar>
              }
            </div>

            <div className="flex flex-row h-auto mx-auto pt-4 text-center font-bold">
              How does it taste?
            </div>
            <div className="flex flex-shrink-0 flex-col sm:flex-row w-full h-full gap-2">

              <div className="flex flex-row sm:flex-col w-full gap-2">
                <div className="tastes-same-button sm:w-52 sm:h-80 flex mx-auto">
                  <Button variant="text"
                          size="large"
                          className="rateButton w-full flex mx-auto"
                          onClick={handleClickRating}
                          data-value="Tastes Same"
                          style={{ textDecoration: 'none',
                                   textTransform: 'none',
                                   justifyContent: 'flex-start',
                                   borderRadius: '20px',
                                   color: "#65995D",
                          }}>
                    <div className="flex flex-col w-full h-full gap-2">
                      <div className="flex h-full self-center">
                        <i className="fa-solid fa-face-smile fa-5x self-center"></i>
                      </div>
                      <div className="hidden sm:flex h-full">
                        <span className="uppercase text-xl mx-auto ">
                          Tastes Same as Before
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="tastes-different-button flex sm:w-52 sm:h-80 mx-auto">
                  <Button variant="text"
                          size="large"
                          className="rateButton w-full flex mx-auto"
                          onClick={handleClickRating}
                          data-value="Tastes Different"
                          style={{ textDecoration: 'none',
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    borderRadius: '20px',
                                    color: "#9D8863",
                          }}>
                    <div className="flex flex-col w-full h-full gap-2">
                      <div className="flex h-full self-center">
                        <i className="fa-solid fa-face-surprise fa-5x self-center"></i>
                      </div>
                      <div className="hidden sm:flex h-full">
                        <span className="uppercase text-xl mx-auto ">
                          Tastes different than before
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col w-full gap-2">
                <div className="tastes-worse-button flex sm:w-52 sm:h-80 mx-auto">
                  <Button variant="text"
                          size="large"
                          className="rateButton w-full flex mx-auto"
                          onClick={handleClickRating}
                          data-value="Tastes Worse"
                          style={{ textDecoration: 'none',
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    borderRadius: '20px',
                                    color: "#994848",
                          }}>
                    <div className="flex flex-col w-full h-full gap-2">
                      <div className="flex h-full self-center">
                        <i className="fa-solid fa-face-tired fa-5x self-center"></i>
                      </div>
                      <div className="hidden sm:flex h-full">
                        <span className="uppercase text-xl mx-auto">
                          Tastes worse than before
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>

                <div className="no-taste-button flex sm:w-52 sm:h-80 mx-auto">
                  <Button variant="text"
                          size="large"
                          className="rateButton w-full flex mx-auto"
                          onClick={handleClickRating}
                          data-value="No Tastes"
                          style={{ textDecoration: 'none',
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    borderRadius: '20px',
                                    color: "#686868",
                          }}>
                    <div className="flex flex-col w-full h-full gap-2">
                      <div className="flex h-full self-center">
                        <i className="fa-solid fa-face-grimace fa-5x self-center"></i>
                      </div>
                      <div className="hidden sm:flex h-full">
                        <span className="uppercase text-xl mx-auto ">
                          Has no taste
                        </span>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex sm:w-1/2 self-center ">
            { hasAnyRating ?
              <FrtChartDetailed pieData={pieData} />
            :
              <Avatar sx={{ width: 65,
                            height: 65 }}
                      className="mx-auto self-center justify-center">
                  <CloseIcon fontSize="large" />
              </Avatar>
            }
          </div>
        </div>

        <div className="w-full text-3xl font-bold text-center sm:text-right mt-2 sm:mt-0">
          Click
          <a href={`https://search.rakuten.co.jp/search/mall/coke/`} className="buy-food text-gray-600"> here </a>
          to buy similar products!
        </div>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnack}
        onClose={handleCloseSnackbar}
        autoHideDuration={100000}
        key={'bottomleft'}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontSize: '1.8rem' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
      </div>
    </div>
  )
}

export default FrtDetailCart;