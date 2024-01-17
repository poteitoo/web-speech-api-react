import { useMemo, useState } from "react";

const NativeSpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const App = () => {
  const [transcript, setTranscript] = useState("");
  const recognition = useMemo(() => {
    const Recognition = new NativeSpeechRecognition();
    Recognition.lang = "ja-JP";
    Recognition.interimResults = false;
    Recognition.continuous = true;
    // start
    Recognition.onstart = (_) => {
      console.log("onstart");
    };
    Recognition.onaudiostart = (_) => {
      console.log("onaudiostart");
    };
    Recognition.onsoundstart = (_) => {
      console.log("onsoundstart");
    };
    Recognition.onaudiostart = (_) => {
      console.log("onaudiostart");
    };
    // end
    Recognition.onend = (_) => {
      console.log("onend");
    };
    Recognition.onaudioend = (_) => {
      console.log("onaudioend");
    };
    Recognition.onsoundend = (_) => {
      console.log("onsoundend");
    };
    Recognition.onaudioend = (_) => {
      console.log("onaudioend");
    };
    // result
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

  return (
    <div>
      <button onClick={() => recognition.start()}>書き起こし開始</button>
      <button onClick={() => recognition.stop()}>書き起こし停止</button>
      <h2>書き起こし</h2>
      <p>{transcript}</p>
    </div>
  );
};
