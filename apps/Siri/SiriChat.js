import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const SiriChat = () => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  console.log(transcript);


  return (
    <div className='fixed top-10 right-5 bg-gray-500 w-[340px] rounded-full h-10'>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => SpeechRecognition.startListening({continuous: true})}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
    </div>
  )
}

export default SiriChat