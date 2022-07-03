import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router-dom';
import ApiClient from "../../util/axios"
import Button from '@mui/material/Button';
import { dateFunction, stringToBoolean } from '../../util/utils';
import ErrorMessage from './ErrorMessage';
import Avatar from '@mui/material/Avatar';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import EmailIcon from '@mui/icons-material/Email';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import NoFoodIcon from '@mui/icons-material/NoFood';
import EditIcon from '@mui/icons-material/Edit';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { AccountNameContext } from '../../routers/AppRouter';

const EditUserProfilePage = () => {
  const [parosmia, setParosmia] = useState();
  const [currentlyInfected, setCurrentlyInfected] = useState();
  const [hadCovid, setHadCovid] = useState();
  const [accountName, setAccountName] = useContext(AccountNameContext);

  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    ApiClient.get(`/user/${sessionStorage.getItem('userId')}`)
      .then(res => {
        setValue('userName', res.data.userName);
        setValue('email', res.data.email);
        setValue('ageGroup', res.data.ageGroup);
        setValue('vaccinationStatus', res.data.vaccinationStatus);
        setValue('positiveResultDate', dateFunction(new Date(res.data.positiveResultDate)));
        setParosmia(res.data.parosmia);
        setCurrentlyInfected(res.data.currentlyInfected);
        setHadCovid(!!res.data.positiveResultDate);
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  }, []);

  const ShowCovidDate = () => {
    return hadCovid && (
      <div className="flex flex-col justify-left w-full">
        <div className="flex flex-wrap text-md my-2 mr-2">
          Date of last infection:
        </div>
        <div className="flex items-center">
          <div className="datepicker relative form-floating mb-3">
            <input className="form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="date"
              {...register('positiveResultDate')} />
            <label htmlFor="floatingInput" className="text-gray-700 text-sm">DATE</label>
          </div>
        </div>

      </div>
    );
  }


  const onSubmit = (data) => {
    console.log(data);
    ApiClient.patch(`/user/updateInfo`, data)
      .then((res) => {
        sessionStorage.setItem('userName', res.data.userName);
        setAccountName(res.data.userName);
        history.push("/users/mypage");
      })
      .catch(error => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div>
      <div className="sm:px-4">
        <br />

        <div className="self-center w-full font-bold text-3xl"
          style={{ color: "#8A8A8A" }}>
          Edit my info
        </div>

        <br />

        <div className="register-form flex flex-col p-4 grid mx-auto mb-10 border border-2 rounded-3xl">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-row gap-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#DC3737" }}>
                  <AccessibilityIcon />
                </Avatar>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex col-span-2 items-center whitespace-pre my-2">User Name:
                  <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                    {errors.userName && <span>{errors.userName.message}</span>}
                  </div>
                </div>
                <div className="flex items-center col-span-2 mb-4">
                  <input
                    {...register('userName', {
                      required: { value: true, message: "*" },
                      maxLength: { value: 16, message: " 16 characters max." }
                    })}
                    className="block w-full px-1 py-3 text-2xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Username" />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#1572A1" }}>
                  <EmailIcon />
                </Avatar>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex col-span-2 items-center whitespace-pre my-2">Email Address:
                  <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>
                </div>
                <div className="flex items-center col-span-2 mb-4">
                  <input
                    {...register('email', {
                      required: { value: true, message: "*" },
                      maxLength: { value: 256, message: " Invalid email address" },
                      pattern: { value: /\S{1,64}@\S+\.\S+/, message: " Invalid email address" }
                    })}
                    className="block w-full text-left px-1 py-3 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address" />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2 mb-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#00CF95" }}>
                  <PeopleAltIcon />
                </Avatar>
              </div>
              <div className="flex flex-row w-full gap-4 self-center">
                <div className="flex flex-col w-full sm:flex-row">
                  <div className="flex w-full items-center whitespace-pre ">Age Group: </div>
                  <div className="flex w-full border">
                    <select
                      {...register('ageGroup', { required: true })}
                      className="w-full">
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
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2 mb-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#E798AE" }}>
                  <VaccinesIcon />
                </Avatar>
              </div>
              <div className="flex flex-row w-full gap-4 self-center">
                <div className="flex flex-col w-full sm:flex-row">
                  <div className="flex w-full items-center whitespace-pre">Vaccination Status:</div>
                  <div className="flex w-full">
                    <select
                      {...register('vaccinationStatus')}
                      className="w-full">
                      <option value={0}>Unvaccinated</option>
                      <option value={1}>Partially Vaccinated</option>
                      <option value={2}>Fully Vaccinated</option>
                      <option value={3}>Fully Vaccinated + Boosted</option>
                      <option value={4}>Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2 mb-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#5F7161" }}>
                  <CoronavirusIcon />
                </Avatar>
              </div>
              <div className="flex flex-row w-full gap-4 self-center">
                {/* <UserInfected currentlyInfected={currentlyInfected}
                  onChange={(e) => { setCurrentlyInfected(stringToBoolean(e.target.value)) }} /> */}

                <div className="flex flex-col sm:flex-row w-full gap-4 self-center">
                  <div className="flex w-full items-center">Are you currently dealing with COVID-19?</div>
                  <div className="flex flex-col w-full">
                    <div className="flex w-full">
                      <input className="form-check-input mr-2"
                        type="radio"
                        value={true}
                        {...register('currentlyInfected')}
                        onChange={(e) => { setCurrentlyInfected(stringToBoolean(e.target.value)) }}
                        checked={currentlyInfected} />
                      Yes
                    </div>
                    <div>
                      <input className="form-check-input mr-2"
                        type="radio"
                        value={false}
                        {...register('currentlyInfected')}
                        onChange={(e) => { setCurrentlyInfected(stringToBoolean(e.target.value)) }}
                        checked={currentlyInfected != null && !currentlyInfected} />
                      No
                    </div>
                    <div>
                      <input className="form-check-input mr-2"
                        type="radio"
                        value={null}
                        {...register('currentlyInfected')}
                        onChange={(e) => { setCurrentlyInfected(stringToBoolean(e.target.value)) }}
                        checked={currentlyInfected === null} />
                      Prefer not say
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2 mb-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#FFD124" }}>
                  <CalendarViewMonthIcon />
                </Avatar>
              </div>
              <div className="flex flex-row w-full gap-4 self-center">
                {/* <UserCovidDate positiveResultDate={positiveResultDate}
                  onChange={(e) => { setPositiveResultDate(e.target.value) }} /> */}
                <div className="flex flex-col w-full gap-4">
                  <div className="flex flex-col sm:flex-row w-full gap-4 self-center">
                    <div className="flex w-full items-center">
                      Have you received a positive COVID-19 result before?
                    </div>
                    <div className="flex flex-col w-full">
                      <div>
                        <input className="form-check-input mr-2"
                          type="radio"
                          value={true}
                          {...register('hadCOVID')}
                          onChange={(e) => { setHadCovid(true) }}
                          checked={hadCovid}/>
                        Yes
                      </div>
                      <div>
                        <input className="form-check-input mr-2"
                          type="radio"
                          value={false}
                          {...register('hadCOVID')}
                          onChange={(e) => { setHadCovid(false) }} />
                        No
                      </div>
                      <div>
                        <input className="form-check-input mr-2"
                          type="radio"
                          value={null}
                          {...register('hadCOVID')}
                          onChange={(e) => { setHadCovid(false)}}/>
                        Prefer not say
                      </div>

                      <div className="mt-4 flex flex-col items-center">
                        <ShowCovidDate />
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div className="flex flex-row gap-4 mt-2 mb-4">
              <div className="self-center">
                <Avatar style={{ backgroundColor: "#CC704B" }}>
                  <NoFoodIcon />
                </Avatar>
              </div>
              <div className="flex flex-row w-full gap-4 self-center">
                {/* <UserParosmia parosmia={parosmia}
                  onChange={(e) => { setParosmia(stringToBoolean(e.target.value)) }} /> */}

<div className="flex flex-col sm:flex-row w-full gap-4 self-center">
        <div className="flex w-full items-center">
          Do you have Parosmia?
        </div>
        <div className="flex flex-col w-full">
          <div>
            <input className="form-check-input mr-2"
                   type="radio"
                   value={true}
                   {...register('parosmia')}
                   onChange={(e) => { setParosmia(stringToBoolean(e.target.value)) }}
                   checked={parosmia}/>
            Yes
          </div>
          <div>
            <input className="form-check-input mr-2"
                   type="radio"
                   value={false}
                   {...register('parosmia')}
                   onChange={(e) => { setParosmia(stringToBoolean(e.target.value)) }}
                   checked={parosmia != null && !parosmia}/>
            No
          </div>
          <div>
            <input className="form-check-input mr-2"
                   type="radio"
                   value={null}
                   {...register('parosmia')}
                   onChange={(e) => { setParosmia(stringToBoolean(e.target.value)) }}
                   checked={parosmia === null}/>
            Prefer not say
          </div>
        </div>
      </div>

              </div>
            </div>


            <div className="edit-profile-button mx-auto">
              <Button className="text-center h-full w-full"
                style={{
                  textDecoration: 'none',
                  textTransform: 'none',
                  color: "#8A8A8A",
                  fontSize: '18px'
                }}>
                <input type="submit" value="Submit" />
              </Button>
            </div>

          </form>
        </div>
      </div>
      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />
    </div>
  );
};

export default EditUserProfilePage;

