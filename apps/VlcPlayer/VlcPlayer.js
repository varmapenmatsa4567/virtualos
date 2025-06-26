// src/VideoPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import Window from '@/components/Window';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaPause } from 'react-icons/fa';

const VlcPlayer = ({ toggleMaximize, extraProps, ...props}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [fileName, setFileName] = useState("");
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const {videoUrl} = extraProps;

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsFileSelected(true);
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setFileName(file.name);
      setVideoURL(videoURL);}
  };

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const playPause = () => {
    if (videoRef.current.paused) {
      setIsVideoPaused(false);
      videoRef.current.play();
    } else {
      setIsVideoPaused(true);
      videoRef.current.pause();
    }
  }

  useEffect(() => {
    if(videoUrl != null){
      setIsFileSelected(true);
      setVideoURL(videoUrl);
      setFileName("Hello");
    }
  }, [videoUrl])

  return (
    <Window 
      toggleMaximize={handleFullScreen} {...props}
      toolbar={
        <div className='flex items-center justify-between w-full'>
          <span className='text-white'>{fileName}</span>
        </div>
      }
    >
      <div className='w-full h-full flex items-center justify-center'>
        {isFileSelected && (
          <video ref={videoRef} controlsList='nodownload' autoPlay src={videoURL} controls={true}>
            Your browser does not support the video tag.
          </video>
        )}
        {!isFileSelected && (
          <div className='text-white flex flex-col items-center justify-center'>
            <Video size={80}/>
            <Button onClick={handleFileClick}>Select Video Files</Button>
            <input ref={fileInputRef} className='hidden' type="file" accept="video/*,.mkv" onChange={handleFileChange} />
          </div>
        )}
      </div>
    </Window>
  );
};

export default VlcPlayer;