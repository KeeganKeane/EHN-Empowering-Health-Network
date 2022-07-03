import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiClient from '../../util/axios';
import ErrorMessage from '../users/ErrorMessage';
import Badge from '@mui/material/Badge';

class AdminTopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportList: [],
      errorMessage: null
    }
  }

  componentDidMount() {
    ApiClient.get('/admin/getAllReports')
    .then(res => {
      console.log(res);
      this.setState(() => ({
        reportList: res.data
      }))
    }).catch(error => {
      this.setState(() => ({
        errorMessage: error.response.data.message
      }))}
    )
  }

  render() {
    return (
      <div className="sm:m-4">

        <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">
          <Link className="admintop-button flex w-full border-3 rounded-full py-3 border-gray-400 bg-blue-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                to="/admin/top">
            {
              this.state.reportList.length > 0 ?
              <div className="flex mx-auto text-3xl place-content-center content-center">
                <Badge badgeContent={this.state.reportList.length}
                       color="error"
                       anchorOrigin={{  vertical: 'top',
                                        horizontal: 'left' }}>
                    <i className="fa-solid fa-bell px-3 self-center"></i>
                </Badge>
                <div className="hidden sm:block self-center">
                  Notifications
                </div>
              </div>
              :
              <div className="flex mx-auto text-3xl place-content-center content-center">
                <i className="fa-solid fa-bell px-3 self-center"></i>
                <div className="hidden sm:block self-center">
                  Notifications
                </div>
              </div>

            }
          </Link>

          <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                to="/admin/posts/hide">
            <div className="flex mx-auto text-3xl place-content-center content-center">
                <i class="fa-solid fa-trash-arrow-up px-3 self-center"></i>
                <div className="hidden sm:block self-center">
                  Hidden Posts
                </div>
            </div>
            </Link>

          <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                to="/admin/analytics">
            <div className="flex mx-auto text-3xl place-content-center content-center">
                <i className="fa-solid fa-chart-line px-3 self-center"></i>
                <div className="hidden sm:block self-center">
                  Analytics
                </div>
            </div>
          </Link>

        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="report-notification font-bold text-4xl mt-4">
            Report Notifications
          </div>
          <div className="report-area-background w-full mx-auto flex flex-col">
            {
            this.state.reportList.map((msg, index) => {
              return (
                <div key={index}
                     className="flex flex-col p-4 w-full sm:mx-auto my-2 sm:my-4 border bg-white rounded-3xl sm:rounded-full">
                  <Link className="reported-info"
                        to={`/admin/posts/${msg.journalId}`}>
                    <div className="grid grid-cols-4 sm:grid-cols-3 sm:ml-7">
                      <div className="info grid flex flex-nowrap col-span-3 sm:col-span-2">
                        <div className="report-title text-2xl sm:text-4xl font-bold my-2">
                          Reported by: {msg.reportedCount} user(s)
                        </div>
                        <div className="report-title text-base sm:text-2xl font-bold my-1">
                          Reported Post:【 {msg.journalTitle} 】
                        </div>
                        <div className="report-title text-base sm:text-2xl my-1">
                          Reported User: {msg.userName}
                        </div>
                      </div>

                      <div className="reported-detail-button place-self-center text-6xl flex">
                        <div className="hidden md:block place-self-center pr-4 whitespace-pre text-3xl report-title">
                          More detail
                        </div>
                        <i className="fa-solid fa-circle-arrow-right text-5xl sm:text-6xl"></i>
                      </div>
                    </div>
                  </Link>

                </div>
                );
                })}
            </div>

          </div>
          <ErrorMessage message={this.state.errorMessage} handleClose={() => {this.setState(() => ({
          errorMessage: null
        }))}}/>

      </div>
    )
  };

}
export default AdminTopPage;