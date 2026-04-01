import { useSpeech } from "react-text-to-speech";
import { useEffect, useState } from "react";

const TextToSpeech = ({ title, result }) => {
  const data = title + " " + result;

  const { speechStatus, start, pause, stop } = useSpeech({
    text: data,
    stableText: true,
  });

  const [progress, setProgress] = useState(0);

  // Estimate duration based on words
  const duration = data.split(" ").length * 380;

  useEffect(() => {
    let interval;

    if (speechStatus === "started") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, duration / 100);
    }

    if (speechStatus === "stopped") {
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [speechStatus]);

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md mt-4 max-w-175">

      {/* Title */}
      <p className="text-sm text-gray-600 mb-2">
        🎧 Listen to Summary
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-2 rounded-full mb-4">
        <div
          className="bg-black h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">

        {speechStatus !== "started" ? (
          <button
            onClick={start}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            ▶ Play
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            ⏸ Pause
          </button>
        )}

        <button
          onClick={stop}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          ⏹ Stop
        </button>

      </div>
    </div>
  );
};

export default TextToSpeech;