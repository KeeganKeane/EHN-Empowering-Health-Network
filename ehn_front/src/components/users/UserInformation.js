import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import NoFoodIcon from '@mui/icons-material/NoFood';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { dateFunction, convertAgeGroup, convertVaccinationStatus } from '../../util/utils';
import ApiClient from '../../util/axios';

const UserInformation = (props) => {
  const [userInfo, setUserInfo] = useState({});
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
      ApiClient.get(`/user/${sessionStorage.getItem('userId')}`)
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(error => {
          setErrorMessage(error.response.data.message);
        });
    }, []);

  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpenDrawer(open);
    };
  
    const list = () => (
      <Box role="presentation"
           className="h-full w-full"
           onClick={toggleDrawer(false)}
           onKeyDown={toggleDrawer(false)}>

        <div className="flex flex-row h-full">
          <div className="flex flex-col py-12 w-full pl-5">
            <div className="flex text-4xl pb-12 font-bold"
                 style={{ color: "#8A8A8A" }}>
              My Info
            </div>
            <div className="view-profile-text flex flex-col h-full gap-5">

              <div className="flex flex-row gap-4">
                <div className="self-center">
                  <Avatar style={{ backgroundColor: "#DC3737"}}>
                      <AccessibilityIcon />
                  </Avatar>
                </div>
                <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">User Name</div>
                  <div className="text-xl sm:text-3xl">{userInfo.userName}</div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="self-center">
                  <Avatar style={{ backgroundColor: "#1572A1"}}>
                      <EmailIcon />
                  </Avatar>
                </div>
                <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">Email Address</div>
                  <div className="text-xl sm:text-3xl">{userInfo.email}</div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="self-center">
                  <Avatar style={{ backgroundColor: "#00CF95"}}>
                      <PeopleAltIcon />
                  </Avatar>
                </div>
                <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">Age Group</div>
                  <div className="text-xl sm:text-3xl">{convertAgeGroup(userInfo.ageGroup)} y/o</div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="self-center">
                  <Avatar style={{ backgroundColor: "#E798AE"}}>
                      <VaccinesIcon />
                  </Avatar>
                </div>
                <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">Vaccination Status</div>
                  <div className="text-xl sm:text-3xl">{convertVaccinationStatus(userInfo.vaccinationStatus)}</div>
                </div>
              </div>
              <div className="flex flex-row gap-4">
                <div className="self-center">
                  <Avatar style={{ backgroundColor: "#FFD124"}}>
                      <CalendarViewMonthIcon />
                  </Avatar>
                </div>
                <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">Date of Last Positive Result</div>
                  <div className="text-xl sm:text-3xl">{!!userInfo.postiveResultDate ? dateFunction(userInfo.postiveResultDate) : "-"}</div>
                </div>
              </div>
                <div className="flex flex-row gap-4">
                  <div className="self-center">
                    <Avatar style={{ backgroundColor: "#CC704B"}}>
                        <NoFoodIcon />
                    </Avatar>
                  </div>
                  <div className="flex flex-col self-center">
                  <div className="font-bold text-sm sm:text-lg">Parosmia</div>
                    <div className="text-xl sm:text-3xl">{userInfo.parosmia ? "Yes" : "No"}</div>
                  </div>
                </div>
            </div>
            <div className="edit-profile-button mx-auto">
              <Link to="/users/edit"
                    style={{ textDecoration: 'none'}}>
                <Button className="text-center h-full w-full"
                        style={{ textDecoration: 'none',
                                 textTransform: 'none',
                                 color: "#8A8A8A",
                                 fontSize: '18px'}}>
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-23 h-full self-center">
            <Button style={{ textDecoration: 'none',
                             textTransform: 'none',
                             color: "#8A8A8A"}}>
              <i className="fa-solid fa-angle-left fa-2x"
                 onClick={toggleDrawer(false)}></i>
            </Button>
          </div>
        </div>
      </Box>
    );
    return (
      <div>
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer(true)}
                  className="view-profile-button mt-4"
                  style={{ textDecoration: 'none',
                           textTransform: 'none',
                           border: "2px solid ",
                           borderRadius: "100px",
                           borderColor: "#8A8A8A",
                           color: "#8A8A8A"}}>
            <div className="hidden sm:flex" >
              <i className="fa-solid fa-user fa-2x flex w-14 py-3 rounded-full"
                 style={{ backgroundColor: "#E4E1E1" }}></i>
            </div>
            <div className="flex sm:hidden gap-2">
              <i className="fa-solid fa-user fa-2x flex w-14 py-3 rounded-full"
                 style={{ backgroundColor: "#E4E1E1" }}></i>
              <span className="text-2xl pl-3 self-center">My Profile</span>
            </div>
          </Button>
          <Drawer anchor='left'
                  open={openDrawer}
                  onClose={toggleDrawer(false)}
                  PaperProps={{ style: { borderRadius: "0px 50px 50px 0px"}}}>
              {list()}
          </Drawer>
        </React.Fragment>
      </div>
    );
  }

export default UserInformation;