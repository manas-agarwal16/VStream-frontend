import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSongs,
  makeSongsEmpty,
  incrementPage,
} from "../store/features/musicSlice";
import SongCard from "./SongCard";
import { Spinner } from "./index";

const MusicMode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, page, hasMore, songs } = useSelector((state) => state.music);

  // State to track the currently playing audio
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    dispatch(getSongs({ page: 1 }));
    return () => {
      dispatch(makeSongsEmpty());
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      dispatch(getSongs({ page: page + 1 }));
      dispatch(incrementPage());
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  // Function to handle play logic (pause other audios)
  const handlePlay = (index) => {
    if (currentAudio !== null && currentAudio !== index) {
      // Pause the currently playing audio if a new one is clicked
      const prevAudio = document.getElementById(`audio-${currentAudio}`);
      if (prevAudio) prevAudio.pause();
    }
    const audioElement = document.getElementById(`audio-${index}`);
    if (audioElement) {
      console.log("here play");

      audioElement.play(); // Play the clicked audio automatically
    }
    setCurrentAudio(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 flex flex-col lg:ml-[220px] p-6 lg:border-l-[1px] border-gray-600">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">
        Music Mode
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs?.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            index={index}
            handlePlay={handlePlay} // Pass the handlePlay function
            isPlaying={currentAudio === index} // Check if the song is currently playing
          />
        ))}
      </div>
      {loading && (
        <div className="flex mt-6 justify-center items-center col-span-full">
          <Spinner width={8} />
        </div>
      )}

      {!hasMore && (
        <p className="text-center col-span-full border-[1px] border-gray-600 w-full mt-6">
          {/* No more videos to load */}
        </p>
      )}
    </div>
  );
};

export default MusicMode;
