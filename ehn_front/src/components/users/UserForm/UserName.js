import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export const UserName = (props) => {
    const { userName, onChange } = props;

    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

    return (
        <React.Fragment>
            <div className="flex col-span-2 items-center whitespace-pre my-2">User Name:
                <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                    {errors.userName && <span>{errors.userName.message}</span>}
                </div>
            </div>
            <div className="flex items-center col-span-2 mb-4">
                <input 
                value={userName}
                {...register('userName', {
                    required: { value: true, message: "*" },
                    maxLength: { value: 16, message: " 16 characters max." }
                })}
                    onChange={onChange} 
                    className="block w-full px-1 py-3 text-2xl font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Username" />
            </div>
        </React.Fragment>
    );
}
