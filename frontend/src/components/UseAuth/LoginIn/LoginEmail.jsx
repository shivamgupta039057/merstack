import React, { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap";
import { useFormik } from 'formik';
import { postAPI } from '../../../apiservices/ApiServies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../../hooks/useAuth';
import useMyProvider from '../../../hooks/useMyProvider';
import { useMutation } from '@tanstack/react-query';
import { API_USER_LOGIN } from '../../../utils/APIConstant';


const initialValues = {
    email: "",
    username: "",
    password: "",
};

function LoginEmail({ logon }) {
    const { setToken } = useAuth();
    const { setUserCredentials } = useMyProvider();

    const {mutate: submitLoginCredential, isLoading: isSubmitting } = useMutation({
        mutationFn : (nutation) =>
             postAPI(API_USER_LOGIN, nutation),
        onSuccess : (res) => {
            console.log("usercredentialsusercredentials" , res);
            
            setToken(res?.data?.accessToken);
            toast(res.data.message);
            // resetForm();           
            setUserCredentials(res?.data?.user);
        },
        onError : (error) => {
            console.log(error , "error")
        }
    })



    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: (values, action) => {
            console.log("Form Values:", values);
            // signInHandle(values, action);
            submitLoginCredential({email: values.email,
                username: values.username,
                password: values.password})
        },

    });

    return (
        <>
            <div className="login section-main">
                <form action="" onSubmit={handleSubmit}>
                    <div className="login-seection-paraa">
                        <div className="login-username">
                            <input
                                class="custom-input"
                                name="email"
                                placeholder="Enter Email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className="login-emai">
                            <input
                                class="custom-input"
                                name="username"
                                placeholder="Enter Username"
                                type="text"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                        </div>
                        <div className="login-password">
                            <input
                                class="custom-input"
                                name="password"
                                placeholder="Enter Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                        </div>
                        <div className="login-submin-btn">
                            <button className='login-btn' type='submit'>Login</button>
                        </div>

                    </div>
                </form>
            </div>
        </>

    )
}

export default LoginEmail