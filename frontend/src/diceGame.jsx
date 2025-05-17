import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { wordsToNumbers } from "./wordsToNum";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const rollFrames = [
  "frame_1", "frame_2", "frame_3", "frame_4", "frame_5", "frame_6", "frame_7"
];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const Dice = () => {
  const [diceImages, setDiceImages] = useState([
    "/dice/face_1.png", "/dice/face_1.png", "/dice/face_1.png"
  ]);
  const [finals, setFinals] = useState([1, 1, 1]);
  const [rolling, setRolling] = useState(false);
  const [resultText, setResultText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const rollDice = async () => {
    if (rolling) return;
    setRolling(true);
    resetTranscript();
    setResultText("");
    setReactionTime(null);

    const newFinals = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    setFinals(newFinals);

    for (let i = 0; i < 10; i++) {
      const imgSet = [
        `/dice/${rollFrames[i % rollFrames.length]}.png`,
        `/dice/${rollFrames[(i + 1) % rollFrames.length]}.png`,
        `/dice/${rollFrames[(i + 2) % rollFrames.length]}.png`
      ];
      setDiceImages(imgSet);
      await sleep(80);
    }

    setDiceImages([
      `/dice/ease_${newFinals[0]}.png`,
      `/dice/ease_${newFinals[1]}.png`,
      `/dice/ease_${newFinals[2]}.png`
    ]);
    await sleep(200);

    setDiceImages([
      `/dice/face_${newFinals[0]}.png`,
      `/dice/face_${newFinals[1]}.png`,
      `/dice/face_${newFinals[2]}.png`
    ]);

    setRolling(false);

    // Start timer + mic
    setStartTime(Date.now());
    SpeechRecognition.startListening({ continuous: true });
  };

  useEffect(() => {
    const sendToBackend = async () => {
      const spoken = transcript.trim().toLowerCase();
      const spokenNum = wordsToNumbers(spoken);
      const timeTaken = Date.now() - startTime;

      SpeechRecognition.stopListening();
      setReactionTime(timeTaken);

      if (isNaN(spokenNum)) {
        setResultText(`❓ Couldn't recognize number: "${transcript}"`);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            spoken: spokenNum,
            dice: finals,
            time_taken_ms: timeTaken
          })
        });

        const data = await response.json();
        setResultText(data.message);

        if (data.correct && (!bestTime || timeTaken < bestTime)) {
          setBestTime(timeTaken);
        }
      } catch (error) {
        setResultText("❌ Error communicating with backend.");
        console.error(error);
      }
    };

    if (!rolling && transcript) {
      sendToBackend();
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser doesn't support speech recognition.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex gap-6">
        {diceImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`dice-${idx + 1}`}
            className="w-32 h-32 transition-all duration-300"
          />
        ))}
      </div>

      <button
        onClick={rollDice}
        disabled={rolling}
        className={`mt-6 px-5 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
          rolling ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>

      <p className="mt-4 text-gray-600 text-sm">🎤 Microphone: {listening ? "On" : "Off"}</p>
      <p className="mt-1 text-sm">🗣 You said: <span className="font-mono">{transcript}</span></p>
      <p className="text-lg font-bold mt-2">{resultText}</p>
      {reactionTime && (
        <p className="mt-1 text-sm">⏱️ Time taken: {(reactionTime / 1000).toFixed(2)}s</p>
      )}
      {bestTime && (
        <p className="text-sm text-green-700">🏆 Best time: {(bestTime / 1000).toFixed(2)}s</p>
      )}
    </div>
  );
};

export default Dice;
