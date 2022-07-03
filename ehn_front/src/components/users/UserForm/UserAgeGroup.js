import React from 'react';
import { useForm } from "react-hook-form";

export const UserAgeGroup = (props) => {
    const { ageGroup, onChange } = props

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

  return (
    <React.Fragment>
      <div className="flex flex-col w-full sm:flex-row">
        <div className="flex w-full items-center whitespace-pre ">Age Group: </div>
        <div className="flex w-full border">
          <select value={ageGroup}
            {...register('ageGroup', { required: true })}
            onChange={onChange}
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
    </React.Fragment>


  );
}
