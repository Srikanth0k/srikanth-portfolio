import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        color: "#fff",
      }}
    >
      {/* Messages Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#6b7280",
            }}
          >
            <p>Start a conversation...</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "8px",
                background: msg.role === "user" ? "#6366f1" : "#374151",
              }}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid #374151",
          display: "flex",
          gap: "12px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#1a1a2e",
            color: "#fff",
            fontSize: "1rem",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#6366f1",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
