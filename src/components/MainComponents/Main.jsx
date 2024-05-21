import React, { useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Content";
import Typewriter from "typewriter-effect";

const Main = () => {
  const {
    previousrompt,
    setPreviousrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
    setShowResult,
  } = useContext(Context);

  const prompt = useRef("");

  const suggestionText = [
    "Suggest beautiful places to see on an upcoming road trip.",
    "Briefly summarize this concept: urban planning.",
    "Brainstorm team bonding activities for our work retreat.",
    "Improve the readability of the following code.",
  ];

  const suggestionImages = [
    assets.compass_icon,
    assets.bulb_icon,
    assets.message_icon,
    assets.code_icon,
  ];

  const sendRequest = async () => {
    if (!prompt || !prompt.current || !prompt.current.value) return;
    const promptValue = prompt.current.value;
    await onSent(promptValue);
  };

  const homepage = () => {
    setLoading(false);
    setShowResult(false);
  };

  return (
    <div className="main">
      <div className="nav">
        <p onClick={homepage}>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult && (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {suggestionText.map((card, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    onClick={() => onSent(card)}
                  >
                    <p>{card}</p>
                    <img src={suggestionImages[index]} alt="" />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {showResult && (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading && (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              )}
              {!loading && (
                <Typewriter
                  options={{
                    delay: 10,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(resultData)
                      .callFunction(() => {})
                      .start();
                  }}
                />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onKeyDown={(e) => {
                if (e.keyCode !== 13) return;
                else {
                  (async () => {
                    await sendRequest();
                    e.target.value = "";
                  })();
                }
              }}
              ref={prompt}
              type="text"
              placeholder="Message Gemini"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" onClick={sendRequest} />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
