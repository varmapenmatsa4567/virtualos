// src/VideoPlayer.js
import React, { useRef, useState } from 'react';
import Window from '@/components/Window';

const VlcPlayer = (props) => {
  const videoRef = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsFileSelected(true);
    if (file) {
      const videoURL = URL.createObjectURL(file);
      videoRef.current.src = videoURL;
    }
  };

  return (
    <Window {...props}>
      <div className="">
        <video className={`${isFileSelected ? 'visible' : 'invisible'}`} ref={videoRef} controls={true}>
          Your browser does not support the video tag.
        </video>
        {!isFileSelected && <input type="file" accept="video/*" onChange={handleFileChange} />}
      </div>
    </Window>
  );
};

export default VlcPlayer;