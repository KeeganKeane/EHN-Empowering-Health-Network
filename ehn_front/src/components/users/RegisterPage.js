import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../routers/AppRouter';
import ApiClient from "../../util/axios"
import { login } from '../../util/userUtils';

const RegisterPage = () => {

    const [hadCovid, setHadCovid] = useState([]);
    const [hasParosmia, setHasParosmia] = useState();
    const [isInfected, setIsInfected] = useState();
    const [registerPassword, setRegisterPassword] = useState("password");
    const history = useHistory([]);
    const [errorMessage, setErrorMessage] = useState();
    const [isLogIn, setIsLogIn] = useContext(LoginContext);

    useEffect(() => {
        setHadCovid(false);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        mode: 'onChange'
    });


    const onSubmit = (data) => {
        ApiClient.post("/user/register", data)
            .then((res) => {
                setIsLogIn(true);
                sessionStorage.setItem('userId', res.data.userId);
                sessionStorage.setItem('isAdmin', res.data.adminFlag);
                sessionStorage.setItem('userName', res.data.userName);
                history.push("/")
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    }
    
    const onChangeHadCOVID = (value) => {
        if (value.target.value === 'null') setHadCovid(null);
        else if (value.target.value === 'true') setHadCovid(true);
        else if (value.target.value === 'false') setHadCovid(false);
    }

    const ShowCovidDate = () => {
        return hadCovid ? (
            <div className="flex flex-nowrap justify-left w-full">
                <div className="flex flex-wrap my-2 mr-2">
                    Infected Date:
                </div>
                <div className="flex items-center">
                    <div className= "datepicker relative form-floating mb-3">
                        <input className="form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="date" {...register('positiveResultDate')} />
                        <label htmlFor="floatingInput" className="text-gray-700 text-sm">DATE</label>
                    </div>
                </div>

            </div>
        ) : "";
    }

    const showPasswordHandler = () => {
        if (registerPassword === "password") {
            document.getElementById("togglePassword").className="fa-solid fa-eye-slash";
            setRegisterPassword("text");
        }else{
            setRegisterPassword("password");
            document.getElementById("togglePassword").className="far fa-eye";
        }
    }

    const password = useRef([]);
    password.current = watch("password", "");

    return (
        <div className="register-form grid mb-10 min-w-fit m-auto sm:w-1/3">
            <div className="register-title font-bold text-4xl mt-4">Register</div>

            <div className="grid mb-10 min-w-fit border border-2 rounded-3xl flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="m-5">

                    <div className="grid grid-cols-2 flex flex-row">

                        <div className="flex col-span-2 items-center whitespace-pre my-2">Username:
                            <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                            {errors.userName && <span>{errors.userName.message}</span>}
                            </div>
                        </div>
                        <div className="flex items-center col-span-2 mb-4">
                            <input {...register('userName', {
                            required: { value: true, message: "*" },
                            maxLength: { value: 16, message: " 16 characters max." }
                            })}
                            className="block w-full px-1 py-3 text-2xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Username"/>
                        </div>

                        <div className="flex col-span-2 items-center whitespace-pre my-2">Email:
                            <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                            {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="flex items-center col-span-2 mb-4">
                            <input {...register('email', {
                            required: { value: true, message: "*" },
                            maxLength: { value: 256, message: " Invalid email address" },
                            pattern: {value: /\S{1,64}@\S+\.\S+/, message: " Invalid email address"}
                            })}
                            className="block w-full text-left px-1 py-3 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Email address"/>
                        </div>

                        <div className="flex col-span-2 items-center whitespace-pre my-2">Password:
                            <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                            {errors.password && <span>{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="flex items-center col-span-2 mb-4">
                            <input {...register('password', {
                            required: { value: true, message: "*" },
                            minLength: { value: 8, message: " Input at least 8 characters" },
                            maxLength: { value: 32, message: " Input between 8 - 32 characters" },
                            pattern: {value: /^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])(?!\w*\W)/, message: " Must contain number, upper and lower case letter"}
                            })}
                            className="block w-full text-left px-1 py-3 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type={registerPassword}
                            placeholder="Password"
                            />
                            <span className="field-icon" onClick={showPasswordHandler} ><i className="far fa-eye" id="togglePassword"></i></span>
                        </div>

                        <div className="flex col-span-2 items-center whitespace-pre my-2">Confirm Password:
                            <div className=" flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                            </div>
                        </div>
                        <div className="flex col-span-2 items-center mb-4">
                            <input {...register('confirmPassword', {
                            required: { value: true, message: "*" },
                            validate: (input) => input === password.current || " Not a match"
                            })}
                            className="block w-full text-left px-1 py-3 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Confirm Password"/>
                        </div>



                        <div className="flex items-center col-span-3"> </div>

                        <div className="flex items-center whitespace-pre my-2">Age Group: </div>
                        <div className="flex flex-col col-span-2 mb-2">
                            <select {...register('ageGroup', { required: true })}>
                                <option value={0}>0 - 9</option>
                                <option value={1}>10 - 19</option>
                                <option value={2}>20 - 29</option>
                                <option value={3}>30 - 39</option>
                                <option value={4}>40 - 49</option>
                                <option value={5}>50 - 59</option>
                                <option value={6}>60 - 69</option>
                                <option value={7}>70 - 79</option>
                                <option value={8}>80 - 89</option>
                                <option value={9}>90 - 99+</option>
                            </select>
                        </div>


                        <div className="flex items-center whitespace-pre my-2">Vaccination:</div>
                        <div className="flex col-span-2 flex-col mb-2 justify-start">
                            <select {...register('vaccinationStatus')}>
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>Prefer not to say</option>
                            </select>
                        </div>


                        <div className="flex flex-wrap place-content-start my-2">Have you had COVID-19 before?:</div>
                        <div className="flex flex-wrap flex-col sm:justify-around col-span-2 my-2" onChange={onChangeHadCOVID}>
                            <div> <input className="form-check-input mr-2" type="radio" value={true} {...register('hadCOVID')}/>Yes </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={false} {...register('hadCOVID')}/>No </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={null} {...register('hadCOVID')}/>Prefer not say </div>
                        </div>

                        <div className="flex items-center col-span-3 my-1">
                            <ShowCovidDate/>
                        </div>


                        <div className="flex flex-wrap place-content-start  my-2">Do you have Parosmia?:</div>
                        <div className="flex flex-wrap flex-col justify-around col-span-2 my-2">
                            <div> <input className="form-check-input mr-2" type="radio" value={true} {...register('parosmia')}/>Yes </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={false} {...register('parosmia')}/>No </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={null} {...register('parosmia')}/>Prefer not say </div>
                        </div>


                        <div className="flex flex-wrap place-content-start my-2">Do you currently have COVID?:</div>
                        <div className="flex flex-wrap flex-col justify-around col-span-2 my-2">
                            <div> <input className="form-check-input mr-2" type="radio" value={true} {...register('currentlyInfected')}/>Yes </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={false} {...register('currentlyInfected')}/>No </div>
                            <div> <input className="form-check-input mr-2" type="radio" value={null} {...register('currentlyInfected')}/>Prefer not say </div>
                        </div>

                    </div>

                    <div className="register-button mt-4 flex flex-wrap place-content-center">
                        <button type="submit"
                        className="register-button inline-block px-7 py-3 border border-2 font-medium text-md uppercase rounded-full hover:bg-gray-300 hover:text-white"
                        value={"Submit"} > Register </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default RegisterPage;

