import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import ApiClient from '../../util/axios';

const AdminNewEditFoodPage = (props) => {
    const [titleStr, setTitleStr] = useState("");
    const [buttonStr, setButtonStr] = useState("");

    useEffect(() => {
        !!props.match.params.id ? setTitleStr("Food Detail") : setTitleStr("Add Food Item");
    }, [])

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        ApiClient.post("/admin/addFood", data)
            .then((response) => {
                history.push("/admin/foods");
            });

    }

    return (
        <div>
            <h1>{titleStr}</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {!!props.match.params.id && (
                        <div>
                            Id : {props.match.params.id}
                        </div>
                    )

                    }

                    <tr>
                        <td>Food Name: </td>
                        <td>
                            <input {...register('foodName', {
                                required: { value: true, message: "required" },
                                maxLength: { value: 64, message: "max 64 chars" }
                            })} />
                            <br />
                            {errors.foodName && <span>{errors.foodName.message}</span>}
                        </td>
                    </tr>

                    <tr>
                        <td>Photo Address: </td>
                        <td>
                            <input {...register('photoAddress', {
                                maxLength: { value: 1024, message: "max 1024 chars" },
                                pattern: { value: /^http:\/\/.*|^https:\/\/.*/, message: "this is not URL" }
                            })} />
                            <br />
                            {errors.photoAddress && <span>{errors.photoAddress.message}</span>}
                        </td>
                    </tr>
                    
                    {!props.match.params.id && ( //if add new food item page
                        <div>
                            <input type="submit" value={"POST"} />
                        </div>
                    )}

                    {!!props.match.params.id && ( //if edit food item page
                        <div>
                        <tr>
                            <input type="button" value={"UPDATE"} />
                        </tr>
                        <tr>
                            <input type="button" value={"HIDE"} />
                        </tr>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
};

export default AdminNewEditFoodPage;

