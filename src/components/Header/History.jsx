import React from 'react';
import { useSelector } from 'react-redux';

const History = () => {
    const {loginStatus} = useSelector(state => state.auth);
    return (
        loginStatus ?
        <>
            <div></div>
        </>
        :
        <>

        </>
    );
}

export default History;
