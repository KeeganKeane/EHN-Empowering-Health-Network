import React from 'react';
import { useForm } from "react-hook-form";

export const UserVaccination = (props) => {
    const { vaccinationStatus, onChange } = props;

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

  return (
    <React.Fragment>
      <div className="flex flex-col w-full sm:flex-row">
        <div className="flex w-full items-center whitespace-pre">Vaccination Status:</div>
        <div className="flex w-full">
          <select value={vaccinationStatus}
          {...register('vaccinationStatus')}
          onChange={onChange}
          className="w-full">
            <option value={0}>Unvaccinated</option>
            <option value={1}>Partially Vaccinated</option>
            <option value={2}>Fully Vaccinated</option>
            <option value={3}>Fully Vaccinated + Boosted</option>
            <option value={4}>Prefer not to say</option>
          </select>
        </div>
      </div>
    </React.Fragment>


  );
}
