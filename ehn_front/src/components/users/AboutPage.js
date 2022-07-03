import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ButtonBase from '@mui/material/ButtonBase';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const AboutPage = () => {
return (
    <div className="grid">

        <div className="z-0 about-wrapper absolute h-32"></div>

        <div className="z-10">
            <div className="spacer p-4"></div>

            <div className="box-left flex flex-col mr-auto w-3/4 sm:w-2/3 text-left">
                <div className="text-title text-bold text-3xl sm:text-6xl">About EHN</div>
                <div className="text-sub text-xl sm:text-4xl">
                (縁) EHN - Is the Empowering Health Network where users are able to connect and share their experience with others.
                </div>
            </div>

            <div className="box-right flex flex-col ml-auto w-3/4 sm:w-2/3 text-left my-5">
                <div className="text-title text-bold text-3xl sm:text-6xl">Our Mission</div>
                <div className="text-sub text-xl sm:text-4xl">
                To give people the power to build a community by connecting and empowering people through relatable experiences.
                </div>
            </div>

            <div className="box-center flex flex-col m-auto w-4/5 sm:w-2/3 text-left">
                <div className="text-title text-bold text-3xl sm:text-5xl">What is Foomy?</div>
                <div className="text-sub text-xl sm:text-4xl">
                COVID can change the way your food tastes. Foomy is our crowd sourced flavor rating tool.
                See how other people rate different foods and share your own experience with others!
                Recommended to users with Parosmia.
                </div>
            </div>

            <div className="spacer sm:p-12" ></div>

            <div className="box-bottom grid grid-cols-2 place-content-center my-5 mb-auto pt-10 pb-24">
                <div className="grid col-span-2 text-title text-bold text-3xl sm:text-5xl text-center pb-4">Explore our site</div>
                <div className="grid place-items-center">
                    <a href="/">
                    <button className="circle1 hover:shadow-xl">
                        <div className="text text-white text-6xl">
                            <i className="fa-solid fa-book"></i>
                        </div>
                    </button></a>
                </div>

                <div className="grid place-items-center">
                    <a href="/users/frt">
                    <button className="circle2 hover:shadow-xl">
                        <div className="text text-white text-6xl">
                            <i className="fa-solid fa-drumstick-bite"></i>
                        </div>
                    </button></a>
                </div>

                <div className="grid col-span-2">
                    <div className="grid grid-cols-2 text-center1 text-center text-3xl sm:text-5xl my-3">
                        <div>Post Journals</div>
                        <div>Foomy</div>
                    </div>
                    <div className="flex flex-wrap grid grid-cols-2 text-center2 text-center text-2xl sm:text-3xl whitespace-pre-line">
                        <div>Upload and share your experience.</div>
                        <div>Find and rate food flavor changes.</div>
                    </div>
                </div>

            </div>

        </div>

    </div>


);
}

export default AboutPage;

