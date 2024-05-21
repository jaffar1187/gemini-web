import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext({});

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousrompt, setPreviousrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    if (!prompt) return;
    setInput(prompt);
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    const storePreviousPrompts = (prompt) => {
      previousrompt.push(prompt);
      return previousrompt;
    };
    // setPreviousrompt((previousrompt, prompt) => {
    //   if (!previousrompt) return [prompt];
    //   else return [...previousrompt, prompt];
    // });
    if (!previousrompt.includes(prompt)) {
      setPreviousrompt(storePreviousPrompts(prompt));
    }

    let response = await run(prompt);

    response = response
      .replace(/(?:\r\n|\r|\n)/g, "<br>")
      .replace(/\* \*\*/g, "<b>&bull;</b> ")
      .replace(/\*\* /g, "")
      .replace(/\:\*\*/g, ":")
      .replace(/    \* /g, "<b>&bull;</b> ")
      .replace(/\*/g, "");

    setLoading(false);
    setInput("");

    setResultData(response);
  };

  const contextValue = {
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
