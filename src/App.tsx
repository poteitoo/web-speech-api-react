import { useEffect, useMemo, useState } from "react";

const NativeSpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const App = () => {
  const [transcript, setTranscript] = useState("");
  const recognition = useMemo(() => {
    const Recognition = new NativeSpeechRecognition();
    Recognition.lang = "ja-JP";
    Recognition.interimResults = true;
    Recognition.continuous = true;
    Recognition.onspeechend = (e) => {
      console.log("onspeechend", e.target);
    };
    Recognition.onsoundstart = (e) => {
      console.log(e);
    };
    Recognition.onstart = (e) => {
      console.log(e);
    };
    Recognition.onaudiostart = (e) => {
      console.log(e);
    };
    Recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcript);
      console.log(e.results);
    };
    return Recognition;
  }, [window]);

  useEffect(() => {
    console.log(recognition);
  }, [recognition]);

  return (
    <div>
      <button onClick={() => recognition.start()}>書き起こし開始</button>
      <button onClick={() => recognition.stop()}>書き起こし停止</button>
      <h2>書き起こし</h2>
      <p>{transcript}</p>
    </div>
  );
};
