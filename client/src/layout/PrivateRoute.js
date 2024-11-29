import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Spinner from './Spinner';
import { userDetail } from '../store/reducer/authReducer';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [ok, setOk] = useState(true);

    // Memoize the userInfo processing to avoid unnecessary computations
    const processedUserInfo = useMemo(() => {
        return userInfo ? userInfo : null;
    }, [userInfo]);

    useEffect(() => {
        if (!processedUserInfo) {
            dispatch(userDetail());
        }
    }, [dispatch, processedUserInfo]);

    useEffect(() => {
        setOk(!!processedUserInfo);
    }, [processedUserInfo]);

    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
