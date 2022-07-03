import React from 'react';
import { useForm } from "react-hook-form";

export const UserEmail = (props) => {
    const { email, onChange } = props;
    const {
        register,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

    return (
        <React.Fragment>
            <div className="flex col-span-2 items-center whitespace-pre my-2">Email Address:
                <div className="flex flex-col pl-2 whitespace-normal text-xl text-amber-600 sm:text-2xl">
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
            </div>
            <div className="flex items-center col-span-2 mb-4">
                <input
                    value={email}
                    {...register('email', {
                        required: { value: true, message: "*" },
                        maxLength: { value: 256, message: " Invalid email address" },
                        pattern: { value: /\S{1,64}@\S+\.\S+/, message: " Invalid email address" }
                    })}
                    onChange={onChange}
                    className="block w-full text-left px-1 py-3 text-2xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address" />
            </div>
        </React.Fragment>

    );
}
