import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({ expectedSum }) => {
  const [result, setResult] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    // Try to extract a number from the transcript
    const spoken = transcript.trim().toLowerCase();
    const parsed = parseInt(spoken);
    if (!isNaN(parsed)) {
      setResult(parsed === expectedSum ? '✅ Correct!' : '❌ Try again!');
    }
  }, [transcript, expectedSum]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn’t support speech recognition.</span>;
  }

  return (
    <div className="text-center">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className="space-x-3 mt-2 mb-2">
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <p className="mt-2">You said: {transcript}</p>
      <p className="font-bold text-lg mt-2">{result}</p>
    </div>
  );
};

export default Dictaphone;
