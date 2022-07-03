import React from 'react';
import { useForm } from "react-hook-form";

export const UserParosmia = (props) => {
    const { parosmia, onChange } = props;

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

  return (
    <React.Fragment>
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
                   onChange={onChange}
                   checked={parosmia}/>
            Yes
          </div>
          <div>
            <input className="form-check-input mr-2"
                   type="radio"
                   value={false}
                   {...register('parosmia')}
                   onChange={onChange}
                   checked={parosmia != null && !parosmia}/>
            No
          </div>
          <div>
            <input className="form-check-input mr-2"
                   type="radio"
                   value={null}
                   {...register('parosmia')}
                   onChange={onChange}
                   checked={parosmia === null}/>
            Prefer not say
          </div>
        </div>
      </div>
    </React.Fragment>



  );
}