import React from "react";

const SongCard = ({ song, index, handlePlay, isPlaying }) => {
  const { songName, image, songFile } = song;

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white transition-transform transform hover:scale-105">
      {/* Background Image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
      </div>

      {/* Song Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{songName}</h2>
        <div className="flex items-center justify-between">
          {/* Audio Player */}
          <audio
            id={`audio-${index}`}
            controls
            className="w-full bg-gray-800 text-white rounded-lg p-2 outline-none shadow-md"
            onPlay={() => handlePlay(index)} // Trigger play handler
            style={{ display: isPlaying ? "block" : "none" }} // Only show the player when it's playing
            src={songFile}
          >
            Your browser does not support the audio element.
          </audio>

          {/* Play Button */}
          {!isPlaying && (
            <button
              onClick={() => handlePlay(index)} // Start playback on button click
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Play
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
