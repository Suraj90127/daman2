import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { userDetail } from '../store/reducer/authReducer';
import axios from 'axios';
import Spinner from './Spinner';

const Priva = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    axios.defaults.withCredentials = true;

    // Use useCallback to debounce the userDetail dispatch function
    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(userDetail());
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        debouncedDispatch();

        // Clean up the debounced function to prevent memory leaks
        return () => {
            debouncedDispatch.cancel(); // Properly cancel the debounced function
        };
    }, [debouncedDispatch]);

    useEffect(() => {
        setTimeout(() => {
            // navigate('/login');
          
        if (userInfo) {
            navigate({
                state:location.pathname
            })
            console.log("User is logged in, redirecting to homepage.");
        } else if (!userInfo && location.pathname !== '/login') {
            console.log("User not found, redirecting to login.");
              setTimeout(() => {
                if(!userInfo){
                    navigate("/login")
                }
              }, 1000);
              return <Spinner />; 
        }else{
            navigate({
                state:location.pathname
            })
            return <Spinner />; 
        }
    }, 1000); 
    }, [userInfo, location.pathname, navigate]);

    if (userInfo === undefined) {
        return <Spinner />; // Show a spinner or some loading indicator while checking user status
    }

    return <Outlet />;
};

export default Priva
