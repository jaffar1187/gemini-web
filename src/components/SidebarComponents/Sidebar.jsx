import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Content";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousrompt, setRecentPrompt, setLoading, setShowResult } =
    useContext(Context);

  const handleExtended = () => {
    setExtended(!extended);
  };

  const loadRecentData = async (prompt) => {
    await onSent(prompt);
  };

  const homepage = () => {
    setLoading(false);
    setShowResult(false);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={handleExtended}
        />
        <div className="new-chat" onClick={homepage}>
          <img src={assets.plus_icon} alt="" />
          {extended && <p>New Chat</p>}
        </div>
        <div className="recent">
          {extended && <p className="recent-title">Recent</p>}
          {previousrompt.map((item, index) => {
            return (
              <div
                className="recent-entry"
                key={index}
                onClick={async () => await loadRecentData(item)}
              >
                {extended && <img src={assets.message_icon} alt="" />}
                {extended && (
                  <p>{item.length > 16 ? item.slice(0, 16) + " ..." : item}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
