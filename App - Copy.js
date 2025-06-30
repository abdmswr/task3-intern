import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const username = "VIDHYALAKSHMI R";
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("receive-changes", (data) => {
      setText(data);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("send-changes", e.target.value);
  };

  return (
    <div className="container">
      <div className="header">
        <MdEditDocument size={50} color="#6c63ff" />
        <h1>Real-Time Editor</h1>
      </div>

      <div className="username">
        <FaUser /> You are: {username}
      </div>

      <textarea value={text} onChange={handleChange} />
    </div>
  );
}

export default App;
