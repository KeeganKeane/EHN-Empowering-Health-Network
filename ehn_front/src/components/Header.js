import React, { useContext, useState, useRef } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { LoginContext, AdminContext, AccountNameContext } from '../routers/AppRouter';
import ReactDOM from "react-dom";
import { getUserName, isLoggedIn, logout } from '../util/userUtils';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ErrorMessage from './users/ErrorMessage';

const pages = ['About', 'Journal'];


const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLogIn, setIsLogIn] = useContext(LoginContext);
  const [isAdmin, setIsAdmin] = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [accountName, setAccountName] = useContext(AccountNameContext);
  const [positionTop, setPositionTop] = useState(0);
  const [positionLeft, setPositionLeft ] = useState(0);
  const [errorMessage, setErrorMessage] = useState();
  const [openUser, setOpenUser] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
      setAuth(event.target.checked);
    };

  const handleMenu = (event) => {
    let top = document.getElementById('menu-icon').getBoundingClientRect().top;
    let left = document.getElementById('menu-icon').getBoundingClientRect().left;
    setPositionTop(top);
    setPositionLeft(left);
    setAnchorEl(event.currentTarget);
    setOpenUser(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
    setOpenUser(false);
  };

  const handleClick = event =>{
    setIsActive(current => !current);
  }

  const id = open ? "menu-appbar" : undefined;
  const ref = useRef(null);

  const LoggedInOut = () => {

    return isLogIn ? (
      <div>
        <IconButton aria-label="account of current user"
                    aria-haspopup="true"
                    aria-describedby={id}
                    ref={ref}
                    onClick={handleMenu}
                    style={{ color: '#8A8A8A'}}
                    id="menu-icon" >
          <i className="header-nav-login fa-solid fa-circle-user fa-3x"></i>
        </IconButton>
        <Menu id={id}
              anchorEl={ref}
              anchorReference="anchorPosition"
              anchorPosition={{ top: positionTop, left: positionLeft }}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              open={openUser}
              onClose={handleClose}
              MenuListProps={{'aria-labelledby': 'basic-button'}}>
          <NavLink to="/users/mypage"
                   style={{  textDecoration: 'none',
                             color: '#8A8A8A'}}>
            <MenuItem onClick={handleClose}>
              <i className="fa-solid fa-user-large"></i>
              <span className="pl-4">My Page</span>
            </MenuItem>
          </NavLink>
          {isLogIn && isAdmin &&
            <NavLink to="/admin/top"
                     style={{  textDecoration: 'none',
                               color: '#8A8A8A'}}>
              <MenuItem onClick={handleClose}>
                <i className="fa-solid fa-shield"></i>
                <span className="pl-4">Admin</span>
              </MenuItem>
            </NavLink>
          }
          <Divider />
          <MenuItem style={{  textDecoration: 'none',
                              color: '#8A8A8A' }}
                    onClick={() => { logout((msg) => setErrorMessage(msg));
                                     setIsLogIn(false);
                                     setIsAdmin(false);
                                     history.push("/");
                                     handleClose;}}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="pl-4">Logout</span>
          </MenuItem>

        </Menu>
      </div>
    ) : (
      <div>
        <IconButton size="large"
                    aria-haspopup="true"
                    style={{ color: '#8A8A8A'}} >
          <NavLink to="/users/login"
                   style={{  textDecoration: 'none',
                             color: '#8A8A8A'}}>
             <i className="header-nav-login fa-solid fa-arrow-right-to-bracket fa-2x"></i>
          </NavLink>
        </IconButton>
      </div>
    )
  }

  return (
    <div>
        <Box className="sm:px-4 sm:py-4">
        <AppBar className='header-back-background'
                elevation={0}
                position="static">
          <AppBar className="header-main-front-background flex flex-row mx-auto w-full h-72"
                  position="static">

            <div className="w-full"></div>
            <div className="w-full">
              <NavLink to="/" >
                <div className="hidden sm:flex self-center h-full">
                  <img className='logo object-contain'
                       src="https://i.ibb.co/YWbrVHZ/ehn-logo.png"
                       alt='logo' />
                </div>
                <div className="flex sm:hidden self-center h-full">
                  <img className='logo object-contain '
                       src="https://i.ibb.co/s2cKjSr/ehn-symbol.png"
                       alt='symbol' />
                </div>
              </NavLink>
            </div>
            <div className="w-full mx-auto  text-center self-center">
              <LoggedInOut />
            </div>
          </AppBar>

          <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">

            <NavLink to="/users/about"
                     className="header-nav-about w-full self-center"
                     activeClassName="header-is-active"
                     exact={true}
                     style={{ textDecoration: 'none' }}>
              <div className="flex w-full text-center border-3 rounded-full "
                   style={{ borderColor: '#A09F9F' }}>
                <Button className="h-full w-full"
                        style={{  color: '#8A8A8A',
                                  borderRadius: 100,
                                  fontSize: '23px'  }}>
                  <div className="hidden sm:flex">
                    <i className="fa-solid fa-circle-info"></i>
                    <span className= "text-3xl font-bold pl-4"
                          style= {{ textDecoration: 'none',
                                    textTransform: 'none',
                                    color: '#8A8A8A'}}>
                      ABOUT </span>
                  </div>
                  <div className="sm:hidden p-0">
                    <i className="fa-solid fa-circle-info sm:hidden"></i>
                  </div>
                </Button>
              </div>
            </NavLink>

            <NavLink to="/"
                     className="header-nav-journal w-full self-center"
                     activeClassName="header-is-active"
                     exact={true}
                     style={{  textDecoration: 'none' }}>
              <div className="flex w-full text-center border-3 rounded-full "
                   style={{ borderColor: '#A09F9F' }}>
                <Button className="h-full w-full"
                        style={{  color: '#8A8A8A',
                                  borderRadius: 100,
                                  fontSize: '23px' }}>
                  <div className="hidden sm:flex">
                    <i className="fa-solid fa-book"></i>
                    <span className="text-3xl font-bold pl-4"
                      style={{  textDecoration: 'none',
                                textTransform: 'none',
                                color: '#8A8A8A' }}>
                      JOURNAL </span>
                  </div>
                  <div className="sm:hidden">
                    <i className="fa-solid fa-book"></i>
                  </div>
                </Button>
              </div>
             </NavLink>

            <NavLink to="/users/frt"
                     className="header-nav-frt w-full self-center"
                     activeClassName="header-is-active"
                     exact={true}
                     style={{  textDecoration: 'none' }}>
              <div className="flex w-full text-center border-3 rounded-full "
                   style={{ borderColor: '#A09F9F' }}>
                <Button className="h-full w-full"
                        style={{  color: '#8A8A8A',
                                  borderRadius: 100,
                                  fontSize: '23px' }}>
                  <div className="hidden sm:flex">
                    <i className="fa-solid fa-drumstick-bite"></i>
                    <span className="text-3xl font-bold pl-4"
                      style={{  textDecoration: 'none',
                                textTransform: 'none',
                                color: '#8A8A8A' }}>
                      FOOMY </span>
                  </div>
                  <div className="sm:hidden">
                    <i className="fa-solid fa-drumstick-bite"></i>
                  </div>
                </Button>
              </div>
             </NavLink>
          </div>

        </AppBar>
      </Box>
      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />

    </div>
  )
}


export default Header;