import React, { useState } from 'react';
import { useForm } from "react-hook-form";


export const UserCovidDate = (props) => {
    const { positiveResultDate, onChange } = props;
    const [hadCovid, setHadCovid] = useState(!!positiveResultDate && true);
    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

  const ShowCovidDate = () => {
    return hadCovid && (
      <div className="flex flex-col justify-left w-full">
        <div className="flex flex-wrap text-md my-2 mr-2">
          Date of last infection:
        </div>
        <div className="flex items-center">
          <div className= "datepicker relative form-floating mb-3">
            <input className="form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="date"
            value={positiveResultDate}
            {...register('positiveResultDate')}
            onChange={onChange}/>
            <label htmlFor="floatingInput" className="text-gray-700 text-sm">DATE</label>
          </div>
        </div>

      </div>
    );
  }

  return (
    <React.Fragment>
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
                     onChange={(e) => { setHadCovid(true) }} />
              Yes
            </div>
            <div>
              <input className="form-check-input mr-2"
                     type="radio"
                     value={false}
                     {...register('hadCOVID')}
                     onChange={(e) => { setHadCovid(false) }}/>
              No
            </div>
            <div>
              <input className="form-check-input mr-2"
                     type="radio"
                     value={null}
                     {...register('hadCOVID')}
                     onChange={(e) => { setHadCovid(false) }}/>
              Prefer not say
            </div>

            <div className="mt-4 flex flex-col items-center">
              <ShowCovidDate />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
