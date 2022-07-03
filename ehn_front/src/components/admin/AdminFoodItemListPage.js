import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiClient from '../../util/axios';
import ErrorMessage from '../users/ErrorMessage';

class AdminFoodItemListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodItemList: [],
            errorMessage: null
        }
    }    

    componentDidMount() {
      ApiClient.get('/frt')
      .then(res => {
          this.setState(() => ({
            foodItemList: res.data
          }))
      }).catch(error => {
        this.setState(() => ({
            errorMessage: error.response.data.message
          }))}
    )
  }

    render() {
        return (
            <div className="m-4 sm:m-2">

                <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">
                    <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                    to="/admin/top">
                        <div className="flex mx-auto text-3xl place-content-center content-center">
                            <i className="fa-solid fa-bell px-3 self-center"></i>
                            <div className="hidden sm:block self-center"> Notifications </div>
                        </div>
                    </Link>

                    <Link className="admintop-button flex w-full border-3 rounded-full py-3 border-gray-400 bg-blue-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                    to="/admin/foods">
                        <div className="flex mx-auto text-3xl place-content-center ">
                            <i className="fa-solid fa-drumstick-bite px-3 self-center"></i>
                            <div className="hidden sm:block self-center "> Food List </div>
                        </div>
                    </Link>

                    <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
                    to="/admin/analytics">
                        <div className="flex mx-auto text-3xl place-content-center content-center">
                            <i className="fa-solid fa-chart-line px-3 self-center"></i>
                            <div className="hidden sm:block self-center"> Analytics </div>
                        </div>
                    </Link>
                </div>


                <div className="adminfoodlist-title self-left w-full m-auto sm:w-2/3 md:w-2/3 font-bold text-4xl mt-4">
                    <div> Food List </div>


                <div className="adminfoodlist-body grid grid-cols-2 m-auto w-full border border-2 rounded-3xl flex flex-col gap-4 p-4 mb-5">

                    {this.state.foodItemList.map((msg, index) => {
                        return (
                        <div key={index}>
                            <Link to={`/admin/foods/${msg.foodId}`} className="adminfoodlist-no-underline relative p-4 place-items-start flex flex-col text-2xl h-96 xl:h-fit xl:text-4xl text-indigo-400 border-2 border-indigo-300 rounded-3xl bg-blue-100 hover:bg-blue-200 transition duration-400 ease-in-out">
                            <div className="self-start">{msg.foodName}</div>
                            <div className="adminfoodlist-image absolute bottom-0 left-0 m-3 w-auto item-self-center sm:static">
                                <img src={msg.photoAddress}/>
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
export default AdminFoodItemListPage;

