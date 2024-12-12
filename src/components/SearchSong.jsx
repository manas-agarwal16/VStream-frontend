import React, { useEffect ,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSongs } from "../store/features/musicSlice";
import { useParams } from "react-router-dom";
import {SongCard} from "./index";
import CenterSpinner from "./CenterSpinner";

const SearchSong = () => {
  const { search } = useParams();

  const { searchedSongs, loading } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlay = (index) => {
    if (currentAudio !== null && currentAudio !== index) {
      // Pause the currently playing audio if a new one is clicked
      const prevAudio = document.getElementById(`audio-${currentAudio}`);
      if (prevAudio) prevAudio.pause();
    }
    const audioElement = document.getElementById(`audio-${index}`);
    if (audioElement) {
      audioElement.play(); // Play the clicked audio automatically
    }
    setCurrentAudio(index);
  };

  useEffect(() => {
    dispatch(searchSongs({ search }));
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 flex flex-col lg:ml-[220px] p-6 lg:border-l-[1px] border-gray-600">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">
        Music Mode
      </h1>
      {loading && <CenterSpinner />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedSongs?.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            index={index}
            handlePlay={handlePlay}
            isPlaying={currentAudio === index}
          />
        ))}
      </div>
      {searchedSongs?.length == 0 && (
        <p className="text-white text-center text-xl">
          Sorry😟, No results found for your search. Please try using different
          keywords or check your spelling.
        </p>
      )}
    </div>
  );
};

export default SearchSong;
