import React from 'react';
import {Profile as ProfileComp , Navbar , Sidebar} from "../components";
const Profile = () => {
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <ProfileComp/>
        </>
    );
}

export default Profile;
