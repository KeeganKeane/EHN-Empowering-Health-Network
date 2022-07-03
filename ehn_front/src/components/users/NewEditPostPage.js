import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import ApiClient from '../../util/axios';
import { getUserId } from '../../util/userUtils';
import MarkdownEditor from '../MarkdownEditor';

const NewEditPostPage = () => {
    const [headerStr, setHeaderStr] = useState();
    const [buttonStr, setButtonStr] = useState();

    const [title, setTitle] = useState();
    const [content, setContent] = useState("");
    const [journalId, setJournalId] = useState();

    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState();
    const params = useParams();

    useEffect(() => { // if useEffect doesn't use it cause loop render error
        if (!params.id) { // if new post page
            setHeaderStr("Make a new post");
            setButtonStr("Post Now");
        } else { //if edit post page
            setHeaderStr("Edit your post");
            setButtonStr("Save changes");
            ApiClient.get('/journal/post', {
                params: {
                    journalId: parseInt(params.id),
                }
            }).then((res) => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setJournalId(res.data.journalId);
            }).catch((error) => setErrorMessage(error.response.data.message));
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        console.log(data);
        data.userId = getUserId();
        if (!params.id) { // if new post page
            ApiClient.post("/journal", data)
                .then((res) => {
                    history.push("/");
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message);
                });
        } else {
            data.journalId = journalId;
            ApiClient.patch('/journal', data)
                .then((res) => {
                    history.push("/");
                })
                .catch(error => {
                    setErrorMessage(error.response.data.message);
                });
        }
    }

    const onChangeHandler = (value) => {
        setContent(value);
    }

  return (
    <div className="sm:mx-4">

      <div className="newpost-title text-xl font-bold flex w-full pt-4">
        {headerStr}
      </div>

      <div className="newpost-form my-5 mx-auto w-full md:w-10/12 border border-2 rounded-3xl flex"
           style={{ color: "#8A8A8A", }}>
        <form className="m-4 flex flex-col w-full mb-5"
              onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row w-auto mb-5">
            <div className="flex w-auto font-bold self-center whitespace-pre pr-4">
              Post Title:
            </div>
            <div className=" w-full">
              <input type="text"
                     className="block w-full px-4 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 "
                     placeholder="title"
                     {...register('title', {
                      required: { value: true,
                                  message: "required" },
                      maxLength: { value: 128,
                                   message: "128 characters or less" }})}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} />
              {errors.title && errors.title.message}
            </div>
          </div>
          <div className="flex w-auto font-bold whitespace-pre pr-4">
            Post Content:
          </div>
          <div className="flex flex-col">
            <div className="h-0">
              <textarea className='form-hidden'
                        value={content}
                        {...register('content', { required: { value: true,
                                                              message: "required" },
                        maxLength: { value: 4096,
                                     message: "4096 characters or less" }})} />
            </div>
            <div className="flex w-full">
              <MarkdownEditor onChangeHandler={onChangeHandler}
                              content={content}
                              className="w-full" />
            </div>
          </div>

          <div className="newpost-button flex flex-wrap place-content-center">
            <button type="submit"
                    className="newpost-button inline-block px-7 py-3 border border-2 font-medium text-md rounded-full hover:bg-red-300 hover:text-white"
                    value="POST">
              {buttonStr}
            </button>
          </div>
        </form>

      </div>
      <ErrorMessage message={errorMessage} handleClose={() => { setErrorMessage(null) }} />

    </div>

  );
};
export default NewEditPostPage;

