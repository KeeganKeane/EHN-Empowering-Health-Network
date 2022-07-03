import React, { useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FrtChart from './FrtChart';
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import { convertFlavourMessage, truncateContext } from '../../../util/utils';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import Button from '@mui/material/Button';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const FrtCard = (props) => {
  const {foodName, noTastesCount, photoAddress, tastesDifferentCount, tastesSameCount, tastesWorseCount, rating} = props.foodInfo;
  const hasRating = props.hasRating;
  const pieData = [
    {
      name: convertFlavourMessage("noTastesCount"),
      value: noTastesCount,
      color: "#D1D1D1"
    },
    {
      name: convertFlavourMessage("tastesDifferentCount"),
      value: tastesDifferentCount,
      color: "#F7D59C"
    },
    {
      name: convertFlavourMessage("tastesSameCount"),
      value: tastesSameCount,
      color: "#B4CFB0"
    },
    {
      name: convertFlavourMessage("tastesWorseCount"),
      value: tastesWorseCount,
      color: "#FF7878"
    }
  ];

  const theme = useTheme();

  const sortFRT = () => {
    return pieData.sort((a,b) => b.value - a.value)
  }

  return (
    <div className="sm:mx-7">
      <Link to={`/users/frt/${props.foodInfo.foodId}`}
            style={{ textDecoration: 'none' }}>
        <div className="frt-entry-background flex flex-row gap-4 sm:mx-auto w-full">
          <div className="self-center pl-6 ml-6 py-4">
              <div className="h-32 w-32 sm:h-52 sm:w-52 mx-auto">
                <img src={photoAddress}
                     alt={foodName}
                     className="object-contain bg-white h-32 w-32 sm:h-52 sm:w-52 rounded-full" />
              </div>
            <div className="flex sm:hidden mx-auto pl-2 w-full self-center"
                 style={{ width: "110px",
                          height: "100px" }}>
              <FrtChart pieData={pieData}
                        className="object-cover self-center"/>
            </div>
          </div>
          <div className="flex flex-col py-4 pr-4 h-98 pl-6 w-full sm:pl-0"
               style={{ color : "#6B6B6B"}}>
            <div className="hidden sm:flex text-3xl w-auto sm:text-4xl font-bold">
              {foodName}
            </div>
            <div className="flex sm:hidden text-3xl h-full sm:text-4xl font-bold">
              {truncateContext(foodName)}
            </div>

            { hasRating ?
              <div className="flex flex-row h-full w-full mt-4">
                <div className="hidden sm:flex mx-auto h-full w-auto self-center"
                     style={{ width: "110px",
                              height: "100px" }}>
                  <FrtChart pieData={pieData}
                            className="object-cover self-center"/>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:self-center gap-4">
                  <div className={`flex flex-col h-full ${!!rating ? "w-6/12" : "w-full"}`}>
                    <div className="flex text-xl sm:text-2xl">Most People say it</div>
                    <div className="flex font-bold sm:text-3xl">
                      {sortFRT(pieData)[0].name}
                    </div>
                  </div>
                  {
                    rating &&
                      <div className={`flex flex-col h-full ${!!rating ? "w-6/12" : "w-full"}`}>
                        <div className="flex text-xl sm:text-2xl">You have said it</div>
                        <div className="flex font-bold sm:text-3xl">
                          {rating}
                        </div>
                      </div>
                    }
                </div>
              </div>
              :
              <div className="flex flex-row h-full w-full">
                <div className="hidden sm:flex w-full self-center"
                     style={{ width: "110px",
                              height: "100px" }}>
                    <Avatar sx={{ width: 65,
                                  height: 65 }}
                            className="mx-auto self-center justify-center">
                        <CloseIcon fontSize="large" />
                    </Avatar>
                </div>

                <div className="flex flex-col w-full self-center sm:pl-4">
                  <div className="text-xl sm:text-2xl">
                    Sorry, there are currently no reviews for this item
                  </div>
                  <div className="font-bold sm:text-3xl">
                    Please check back later!
                  </div>
                </div>
              </div>
             }
          </div>
        </div>

      </Link>
    </div>
  )
}


export default FrtCard;

