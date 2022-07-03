import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const dateFunction = (dateString) => {
  let date = new Date(dateString);
  var y = date.getFullYear();
  var m = ('00' + (date.getMonth()+1)).slice(-2);
  var d = ('00' + date.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

const convertAgeGroup = (num) => {
  const strNum = String(num);
  switch(strNum) {
    case "0":
      return "0 - 9";
    case "1":
      return "10 - 19";
    case "2":
      return "20 - 29";
    case "3":
      return "30 - 39";
    case "4":
      return "40 - 49";
    case "5":
      return "50 - 59";
    case "6":
      return "60 - 69";
    case "7":
      return "70 - 79";
    case "8":
      return "80 - 89";
    case "9":
      return "90 -";

  }
}

const convertVaccinationStatus = (num) => {
  const strNum = String(num);
  switch(strNum) {
    case "0":
      return "Unvaccinated";
    case "1":
      return "Partially vaccinated"
    case "2":
      return "Fully vaccinated"
     case "3":
      return "Fully vaccinated + Boosted"
  }
}

const convertFlavourMessage = (msg) => {
  switch(msg) {
    case "noTastesCount":
      return "Has no taste";
    case "tastesDifferentCount":
      return "Tastes different than before!";
    case "tastesSameCount":
      return "Tastes the same as before!";
    case "tastesWorseCount":
      return "Tastes worse than before!";
  }
}



const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const truncateContext = (text, num=20, wordBehind="...") => {
  var newText;
  if (text.length > num) {
    newText = text.substr(0,num);
      newText = newText + wordBehind;
  } else {
    newText = text;
  }
  return newText;
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export const stringToBoolean = (value) => {
  if (value === "true") return true;
  else if (value === "false") return false;
  else return null;
}

export {dateFunction, TabPanel, a11yProps, convertAgeGroup, convertVaccinationStatus, convertFlavourMessage, truncateContext}
