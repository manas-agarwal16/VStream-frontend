import React from 'react';
import { LikedVideos as LikedVideosComp , Navbar , Sidebar } from '../components';

const LikedVideos = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <LikedVideosComp></LikedVideosComp>
        </div>
    );
}

export default LikedVideos;
