import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ApiClient from '../../util/axios';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import FilledInput from '@mui/material/FilledInput';
import ErrorMessage from './ErrorMessage';
import { AdminContext, LoginContext } from '../../routers/AppRouter';
import { login } from '../../util/userUtils';

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();
    const [isLogIn, setIsLogIn] = useContext(LoginContext);
    const [isAdmin, setIsAdmin] = useContext(AdminContext);
    const [registerPassword, setRegisterPassword] = useState("password");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
    });

    const onSubmit = (data) => {
        login(data,
            (adminFlag) => {
                setIsLogIn(true);
                setIsAdmin(adminFlag)
                history.push("/");
            },
            (msg) => setErrorMessage(msg))
    }


    const showPasswordHandler = () => {
        if (registerPassword === "password") {
            document.getElementById("togglePassword").className = "fa-solid fa-eye-slash";
            setRegisterPassword("text");
        } else {
            setRegisterPassword("password");
            document.getElementById("togglePassword").className = "far fa-eye";
        }
    }

    return (
        <div className="login-form grid mb-10 min-w-fit m-auto sm:w-1/3">
            <div className="login-title self-center font-bold text-4xl mt-4">Login </div>

            <div className="grid border border-2 rounded-3xl flex flex-col">
                <form className="m-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-col-2">
                        <div className="text flex items-center whitespace-pre my-2">Email:
                            <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="mb-10">
                            <input type="text" {...register('email', {
                                required: { value: true, message: "*" },
                                maxLength: { value: 256, message: " invalid email address" },
                                pattern: {
                                    value: /\S{1,64}@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                                className="block w-full px-4 py-4 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Email address" />
                        </div>

                        <div className='flex items-center whitespace-pre my-2'>Password:
                            <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                                {errors.password && <span>{errors.password.message}</span>}
                            </div>
                        </div>



                    <div className="flex flex-row items-center mb-10">

                            <input {...register('password', {
                                required: { value: true, message: "required" },
                                minLength: { value: 8, message: " Input at least 8 characters" },
                                maxLength: { value: 32, message: " Input between 8 - 32 characters" },
                                pattern: {
                                    value: /^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])(?!\w*\W)/,
                                    message: " Must contain number, upper and lower case letter"
                                }
                            })}
                            type={registerPassword}
                                className="block w-full px-4 py-4 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password" />
                        <span className="field-icon" onClick={showPasswordHandler} ><i className="far fa-eye" id="togglePassword"></i></span>
                        </div>
                    </div>
                    <div className="login-button flex flex-wrap place-content-center">
                        <button type="submit"
                            className="login-button inline-block px-7 py-3 border border-2 font-medium text-md  uppercase rounded-full hover:bg-gray-300 hover:text-white"
                            value="LOGIN"> Sign in </button>
                    </div>

                </form>

                <div className="login-register pl-5 pr-5 grid grid-cols-2">
                    <div className="mb-3 mr-3">
                        Not registered yet?
                        <Link to="/users/register">Register </Link>
                    </div>
                    <div className="mb-3 text-right">
                        <a to="/users/register">Forgot Password? </a>
                    </div>
                </div>

            </div>
            <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />

        </div>
    );
}
export default LoginPage;

