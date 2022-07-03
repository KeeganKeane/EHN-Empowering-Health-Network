import React from 'react';
import { Link } from 'react-router-dom';

const AdminAnalyticsPage = () => (
    <div className="sm:m-4">
        <div className="flex flex-row w-full h-full py-3 px-5 gap-3 mx-auto text-center">
            <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
            to="/admin/top">
                <div className="flex mx-auto text-3xl place-content-center content-center">
                    <i className="fa-solid fa-bell px-3 self-center"></i>
                    <div className="hidden sm:block self-center"> Notifications </div>
                </div>
            </Link>

            <Link className="admintop-button flex w-full border-3 rounded-full py-3 bg-gray-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
            to="/admin/posts/hide">
                <div className="flex mx-auto text-3xl place-content-center ">
                    <i className="fa-solid fa-trash-arrow-up px-3 self-center"></i>
                    <div className="hidden sm:block self-center "> Hidden Posts </div>
                </div>
            </Link>

            <Link className="admintop-button flex w-full border-3 rounded-full py-3 border-gray-400 bg-blue-100 text-gray-400 hover:text-white hover:bg-blue-300 hover:border-gray-400"
            to="/admin/analytics">
                <div className="flex mx-auto text-3xl place-content-center content-center">
                    <i className="fa-solid fa-chart-line px-3 self-center"></i>
                    <div className="hidden sm:block self-center"> Analytics </div>
                </div>
            </Link>
        </div>

        <div className="report detail area">
            <div className="report-notification self-center font-bold text-4xl mt-4 text-left">Analytics Page</div>
            <div className="flex text-center p-4 w-full mx-auto my-2 sm:my-4 border bg-white rounded-full text-3xl text-zinc-500">
                <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full self-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

                <div className="text-center pl-3">This page is under construction. Please come back later.</div>

            </div>


        </div>

    </div>
);

export default AdminAnalyticsPage;

