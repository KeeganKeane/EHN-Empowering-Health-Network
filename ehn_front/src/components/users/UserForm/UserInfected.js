import React from 'react';
import { useForm } from "react-hook-form";

export const UserInfected = (props) => {
    const { currentlyInfected, onChange } = props;

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

    return (
      <React.Fragment>
        <div className="flex flex-col sm:flex-row w-full gap-4 self-center">
          <div className="flex w-full items-center">Are you currently dealing with COVID-19?</div>
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <input className="form-check-input mr-2"
                     type="radio"
                     value={true}
                     {...register('currentlyInfected')}
                     onChange={onChange}
                     checked={currentlyInfected}/>
                Yes
              </div>
            <div>
              <input className="form-check-input mr-2"
                     type="radio"
                     value={false}
                     {...register('currentlyInfected')}
                     onChange={onChange}
                     checked={currentlyInfected != null && !currentlyInfected}/>
                No
              </div>
            <div>
              <input className="form-check-input mr-2"
                     type="radio"
                     value={null}
                     {...register('currentlyInfected')}
                     onChange={onChange}
                     checked={currentlyInfected === null}/>
                Prefer not say
              </div>
          </div>
        </div>
      </React.Fragment>



    );
}