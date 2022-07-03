import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/users/MainPage';
import AboutPage from '../components/users/AboutPage';
import FRTDetailPage from '../components/users/FRTDetailPage';
import FRTListPage from '../components/users/FRTListPage';
import LoginPage from '../components/users/LoginPage';
import NewEditPostPage from '../components/users/NewEditPostPage';
import PostDetailPage from '../components/users/PostDetailPage';
import RegisterPage from '../components/users/RegisterPage';
import UserPage from '../components/users/UserPage';
import OtherUserPage from '../components/users/OtherUserPage';
import EditUserProfilePage from '../components/users/EditUserProfilePage';
import AdminAnalyticsPage from '../components/admin/AdminAnalyticsPage';
import AdminFoodItemListPage from '../components/admin/AdminFoodItemListPage';
import AdminFoodRequestDetailPage from '../components/admin/AdminFoodRequestDetailPage';
import AdminIndivisualReportPage from '../components/admin/AdminIndivisualReportPage';
import AdminNewEditFoodPage from '../components/admin/AdminNewEditFoodPage';
import AdminTopPage from '../components/admin/AdminTopPage';
import AdminHiddenPostsPage from '../components/admin/AdminHiddenPostsPage';
import AdminIndivisualHiddenPage from '../components/admin/AdminIndivisualHiddenPage';
import Header from '../components/Header';
import { getUserName, isAdministrator,isLoggedIn } from '../util/userUtils';

export const LoginContext = React.createContext();
export const AdminContext = React.createContext();
export const AccountNameContext = React.createContext();
const AppRouter = () => {
  const [isLogIn, setIsLogIn] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [accountName, setAccountName] = useState(getUserName());
  const adminValidateMessage = "You are not an Administrator. Please log in as an administrator.";
  const loginValidateMessage = "You are not logged in. Please log in."
  useEffect(() => {
    // TODO: TOKEN detect logged in or Logged out
    setIsLogIn(isLoggedIn());
    setIsAdmin(isAdministrator());
  }, [])
  return (
    <BrowserRouter>
      <div>
        <AdminContext.Provider value={[isAdmin, setIsAdmin]}>
          <LoginContext.Provider value={[isLogIn, setIsLogIn]}>
            <AccountNameContext.Provider value={[accountName, setAccountName]}>
            <Header />
            <Switch>
              <Route path="/" component={MainPage} exact={true} />
              <Route path="/users/login" component={LoginPage} exact={true} />
              <Route path="/users/register" component={RegisterPage} exact={true} />
              <Route path="/users/mypage" component={UserPage} exact={true} />
              <Route path="/users/edit" component={EditUserProfilePage} render={props => isLogIn
                ? (<EditUserProfilePage/>)
                : (<MainPage {...props} validationMessage={loginValidateMessage}/>)
              }/>
              <Route path="/users/posts/new" render={props => isLogIn
                ? (<NewEditPostPage/>)
                : (<MainPage {...props} validationMessage={loginValidateMessage}/>)
              }/>
              <Route path="/users/posts/edit/:id" component={NewEditPostPage} />
              <Route path="/users/posts/:id" component={PostDetailPage} />
              <Route path="/users/frt" component={FRTListPage} exact={true} />
              <Route path="/users/frt/:id" component={FRTDetailPage} />
              <Route path="/users/about" component={AboutPage} exact={true} />
              <Route path="/users/:id" component={OtherUserPage}/>
              <Route path="/admin/top" exact={true} render={props => isAdmin
                ? (<AdminTopPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              } />
              
              <Route path="/admin/foods" exact={true} render={props => isAdmin
                ? (<AdminFoodItemListPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              } />
              <Route path="/admin/foods/new" exact={true} render={props => isAdmin
                ? (<AdminNewEditFoodPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              } />
              <Route path="/admin/foods/request" component={AdminFoodRequestDetailPage} exact={true} render={props => isAdmin
                ? (<AdminTopPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              }/>
              <Route path="/admin/foods/:id" render={props => isAdmin
                ? (<AdminNewEditFoodPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              }/>
              <Route path="/admin/analytics" exact={true} render={props => isAdmin
                ? (<AdminAnalyticsPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              }/>
              <Route path="/admin/posts/hide" exact={true} render={props => isAdmin
                ? (<AdminHiddenPostsPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              } />
              <Route path="/admin/posts/hide/:id" render={props => isAdmin
                ? (<AdminIndivisualHiddenPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              }/>
              <Route path="/admin/posts/:id" render={props => isAdmin
                ? (<AdminIndivisualReportPage/>)
                : (<MainPage {...props} validationMessage={adminValidateMessage}/>)
              }/>
              <Route component={MainPage} exact={true} />
            </Switch>
            </AccountNameContext.Provider>
          </LoginContext.Provider>
        </AdminContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

