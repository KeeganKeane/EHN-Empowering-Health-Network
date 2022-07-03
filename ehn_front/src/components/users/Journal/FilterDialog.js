import React, { useState } from "react";
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { TabPanel, convertAgeGroup } from "../../../util/utils";
import { Slider, Tab, Tabs } from "@mui/material";

const FilterDialog = (props) => {
    const maxRatingValue = 11;
    const { isOpen, handleClose, setErrorFunc, filterFunc } = props;
    const [filterIndex, setFilterIndex] = useState(1);
    const [lowerAgeGroup, setLowerAgeGroup] = useState(0);
    const [upperAgeGroup, setUpperAgeGroup] = useState(10);
    const [lowerDate, setLowerDate] = useState("");
    const [upperDate, setUpperDate] = useState("");
    const [lowerRating, setLowerRating] = useState(0);
    const [upperRating, setUpperRating] = useState(maxRatingValue);
    const filterKeys = ["ageGroup", "date", "rating"];
    const filterLabels = ["Age Group", "Date Range", "Rating"];

    const CustomButton = styled(Button)({
      color: '#A09F9F',
      "&:hover": {
          color: '#ffffff',
      },
    });


    const handleAgeSlider = (event, newValue) => {
        setLowerAgeGroup(newValue[0]);
        setUpperAgeGroup(newValue[1]);
    }

    const handleRatingSlider = (event, newValue) => {
        setLowerRating(newValue[0]);
        setUpperRating(newValue[1]);
    }

    const marks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 1,
            label: '10'
        },
        {
            value: 2,
            label: '20'
        },
        {
            value: 3,
            label: '30'
        },
        {
            value: 4,
            label: '40'
        },
        {
            value: 5,
            label: '50'
        },
        {
            value: 6,
            label: '60'
        },
        {
            value: 7,
            label: '70'
        },
        {
            value: 8,
            label: '80'
        },
        {
            value: 9,
            label: '90'
        },
        {
            value: 10,
            label: '100'
        },

    ]

    const labelRatingValue = (value) => {
        let valueStr = "";
        if (value === 0) valueStr = "0";
        else if (value === maxRatingValue) valueStr = "infinity";
        else valueStr = String(10 ** value);
        return valueStr;
    }

    const switchRatingValue = (value) => {
        return value === maxRatingValue ? "" : labelRatingValue(value);
    }

    const setFilterData = () => {
        return {
            filterKey: filterKeys[filterIndex],
            lowerAgeGroup: lowerAgeGroup,
            upperAgeGroup: upperAgeGroup - 1,
            lowerDate: lowerDate,
            upperDate: upperDate,
            lowerRating: switchRatingValue(lowerRating),
            upperRating: switchRatingValue(upperRating),
        }
    }

  return (
    <Drawer open={isOpen}
            anchor="bottom"
            onClose={handleClose}
            PaperProps={{ style: { borderRadius: "50px 50px 0px 0px"}}}>
      <DialogTitle style={{ fontSize: "23px",
                            fontWeight: "bold",
                            color: "#8A8A8A"}}
                    className="mt-6 pt-6">
        Filter by
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Tabs value={filterIndex}
                onChange={(e, value) => setFilterIndex(value)}
                TabIndicatorProps={{ style: { background: '#E4E1E1' } }}
                aria-label="wrapped label tabs example">
            <Tab value={0}
                 label={filterLabels[0]}
                 style={{  textDecoration: 'none',
                           textTransform: 'none',
                           fontSize: "10px",
                           color: "#8A8A8A"}}
                 className="tab" />
            <Tab value={1}
                 label={filterLabels[1]}
                 style={{  textDecoration: 'none',
                           textTransform: 'none',
                           fontSize: "10px",
                           color: "#8A8A8A" }}
                 className="tab" />
            <Tab value={2}
                 label={filterLabels[2]}
                 style={{  textDecoration: 'none',
                           textTransform: 'none',
                           fontSize: "10px",
                           color: "#8A8A8A"  }}
                 className="tab" />
          </Tabs>

          <TabPanel value={filterIndex}
                    index={0}
                    className="inner-area-background w-full mx-auto">
            <div className="text-center text-3xl">
              {lowerAgeGroup * 10} - {upperAgeGroup * 10 - 1}
            </div>
            <Slider value={[lowerAgeGroup, upperAgeGroup]}
                    onChange={handleAgeSlider}
                    marks={marks}
                    min={0}
                    max={10}/>
          </TabPanel>

          <TabPanel value={filterIndex}
                    index={1}
                    className="inner-area-background w-full mx-auto">
            <div className="flex sm:flex-row flex-col items-center self-center">
              <div className="datepicker relative form-floating mb-3">
                <input className="form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                       type="date"
                       value={lowerDate}
                       onChange={(e) => setLowerDate(e.target.value)} />
                <label htmlFor="floatingInput" className="text-gray-700 text-sm">DATE</label>
              </div>
              -
              <div className="datepicker relative form-floating mb-3">
                  <input className="form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="date"
                      value={upperDate}
                      onChange={(e) => setUpperDate(e.target.value)} />
                  <label htmlFor="floatingInput" className="text-gray-700 text-sm">DATE</label>
              </div>
            </div>
          </TabPanel>


          <TabPanel value={filterIndex}
                    index={2}
                    className="inner-area-background w-full mx-auto">
            <Slider value={[lowerRating, upperRating]}
                    onChange={handleRatingSlider}
                    valueLabelDisplay="on"
                    marks
                    min={0}
                    max={maxRatingValue}
                    scale={labelRatingValue} />
          </TabPanel>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <div className="flex flex-row gap-4 w-full px-2 mx-auto justify-center">
          <div className="cancel-comment-button w-full self-center text-center">
            <CustomButton className="cancel-test h-full w-full"
                          style={{ border: "1px solid #F3F3F3",
                                   textDecoration: 'none',
                                   textTransform: 'none',
                                   fontSize: "18px",
                                   borderRadius: 100, }}
                          onClick={() => handleClose()}>
              <div className="hidden sm:flex">
                Cancel
              </div>
              <div className="sm:hidden">
                <i className="fa-solid fa-xmark button-text"></i>
              </div>

            </CustomButton>

          </div>
            <div className="delete-report-button w-full self-center text-center">
              <CustomButton className="h-full w-full"
                  style={{ border: "1px solid #F3F3F3",
                           textDecoration: 'none',
                           textTransform: 'none',
                           fontSize: "18px",
                           borderRadius: 100, }}
                  onClick={() => { let data = setFilterData()
                                   filterFunc(data);
                                   handleClose();}}>
                  <div className="hidden sm:flex">
                      Apply Filter
                  </div>
                  <div className="sm:hidden">
                    <i className="fa-solid fa-check fa-1x button-text"></i>
                  </div>
              </CustomButton>
            </div>
        </div>
      </DialogActions>
    </Drawer>
  )
}

export default FilterDialog;