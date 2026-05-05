import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED = [
  "🚀 What projects have you built?",
  "🛠️ What's your tech stack?",
  "🤖 Tell me about your AI work",
  "☁️ What's your DevOps experience?",
  "📬 How can I contact you?",
  "💼 Are you open to work?",
];

// eslint-disable-next-line no-unused-vars
const RESUME_CONTEXT = `
You are Srikanth Koppala's AI portfolio assistant. Answer questions about Srikanth in first person as if you are representing him. Be friendly, concise, and professional.

FORMATTING RULES (follow strictly):
- Use bullet points for lists, NEVER use markdown tables
- Use **bold** for key highlights or section titles
- Never use HTML tags like <br>
- Keep responses concise with clear spacing between sections

ABOUT:
- Full Stack Engineer & AI Builder based in Hyderabad, India
- 2+ years of production experience
- Phone: +91 9542117580
- Email: ksrikanth2808@gmail.com
- LinkedIn: linkedin.com/in/srikanth-koppala
- GitHub: github.com/Srikanth0k

WORK EXPERIENCE:
- Software Engineer — Full Stack & SaaS Startup (Jun 2024 – Present)
  - Sole frontend engineer on a multi-tenant SaaS platform (React, TypeScript) serving 100+ users across 10–12 micro-apps
  - Implemented JWT-based multi-auth with Context API — token refresh, session persistence, role-aware routing
  - Built 4-level RBAC system (Super Admin, Admin, Manager, Employee)
  - Developed File Hub with inline contextual chat per file, and Team Messenger for real-time communication
  - Integrated AI Chatbot and Copilot Panel across 6+ modules
  - Containerized with Docker, deployed via AWS App Runner
  - Set up Prometheus & Grafana dashboards for monitoring
  - Built onboarding, Billing, App Management, Storage monitoring across the platform
  - Built a full-stack AI assistant using LangChain and Ollama with RAG over website data, served via Express.js API integrated into React chat UI

- Cloud Computing Intern — InfraBIM Techno Solutions (Oct 2022 – Jan 2023)
  - Deployed and managed AWS EC2, RDS, DynamoDB, S3, VPC, Lambda, SageMaker; executed an ML project

TECHNICAL SKILLS:
- Frontend: React.js, TypeScript, JavaScript, Context API, HTML5, CSS3, JWT, RBAC, Axios
- Android: Java, XML Layouts, Android SDK, REST API Integration
- Backend/APIs: RESTful APIs, FastAPI, Node.js, Python, MySQL, Express.js
- AI/LLM: LangChain, Ollama, RAG, Vector Embeddings
- Cloud & DevOps: AWS (EC2, S3, RDS, Lambda, VPC, App Runner), Docker, Prometheus, Grafana, Jenkins, CI/CD
- Tools: Figma, Git, GitHub, VS Code, Postman

EDUCATION:
- B.Tech in Computer Science & Engineering, Malla Reddy University, Hyderabad — Graduated May 2024, CGPA: 7.7/10

CERTIFICATIONS:
- AWS Cloud Technical Essentials
- Cloud Computing Foundations — Duke University (Coursera)
- AWS Academy Cloud Foundations
- NPTEL Data Analytics with Python
- SQL & Relational Databases — IBM

PROJECTS:
- CI/CD Pipeline Automation: Configured Jenkins on EC2, integrated GitHub, deployed via Jenkinsfile
- AI Assistant with RAG: Full-stack local AI assistant with LangChain + Ollama, Express.js backend, React chat UI

ACTIVITIES:
- Cricket: Runner-Up, Sub-Junior National Cricket Championship; 1st Prize, Departmental Cricket Tournament
- Table Tennis: Regular player and enthusiast
`;

export default function Landing() {
  const chatRef = useRef(null);
  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Srikanth's AI assistant. Ask me anything about his skills, projects, or experience — or pick a question below!",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = useRef(null);

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://backend-szsq.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .slice(1) // skip the initial greeting
            .map((m) => ({
              role: m.role,
              content: m.text,
            })),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Could not connect to server. Make sure backend is running!",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── HERO SECTION ── */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          padding: "40px 20px",
          gap: "0px",
        }}
      >
        {/* Glowing dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#6366f1",
            boxShadow: "0 0 20px #6366f1",
            marginBottom: "20px",
            animation: "pulse 2s infinite",
          }}
        />

        {/* Name */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-2px",
            background: "linear-gradient(90deg, #fff 0%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          Srikanth Koppala
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          Full Stack Engineer · AI Builder
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginBottom: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "2+", label: "Years Experience" },
            { value: "100+", label: "Users Served" },
            { value: "12+", label: "Modules Built" },
            { value: "10+", label: "Tech Stack" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{ fontSize: "2rem", fontWeight: 700, color: "#a5b4fc" }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Skill pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            maxWidth: "640px",
            marginBottom: "56px",
          }}
        >
          {[
            "React.js",
            "TypeScript",
            "Node.js",
            "LangChain",
            "Ollama",
            "RAG",
            "AWS",
            "Docker",
            "Python",
            "Express.js",
          ].map((skill) => (
            <span
              key={skill}
              style={{
                padding: "6px 16px",
                borderRadius: "50px",
                border: "1px solid #2d2d2d",
                background: "#111",
                fontSize: "0.8rem",
                color: "#9ca3af",
                letterSpacing: "0.5px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToChat}
          style={{
            padding: "14px 40px",
            fontSize: "1rem",
            fontWeight: 600,
            border: "1px solid #6366f1",
            borderRadius: "50px",
            background: "transparent",
            color: "#a5b4fc",
            cursor: "pointer",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#6366f1";
            e.target.style.color = "#fff";
            e.target.style.boxShadow = "0 0 30px #6366f1aa";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#a5b4fc";
            e.target.style.boxShadow = "none";
          }}
        >
          Meet Srikanth →
        </button>

        {/* Scroll hint */}
        <p style={{ marginTop: "20px", color: "#374151", fontSize: "0.8rem" }}>
          ↓ scroll to chat
        </p>
      </div>

      {/* ── CHAT SECTION ── */}
      <div
        ref={chatRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 20px",
          background: "#0d0d0d",
        }}
      >
        <p
          style={{
            color: "#6366f1",
            fontSize: "0.8rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          AI Portfolio Assistant
        </p>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "8px",
            background: "linear-gradient(90deg, #fff, #a5b4fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ask me anything
        </h2>
        <p
          style={{ color: "#4b5563", marginBottom: "40px", fontSize: "0.9rem" }}
        >
          Powered by AI · Knows everything about Srikanth
        </p>

        {/* Chat box */}
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#111",
            borderRadius: "20px",
            border: "1px solid #1f1f1f",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Messages */}
          <div
            style={{
              height: "420px",
              overflowY: "auto",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px 18px",
                    borderRadius: "16px",
                    background: m.role === "user" ? "#6366f1" : "#1a1a1a",
                    color: m.role === "user" ? "#fff" : "#d1d5db",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    borderBottomRightRadius: m.role === "user" ? "4px" : "16px",
                    borderBottomLeftRadius:
                      m.role === "assistant" ? "4px" : "16px",
                  }}
                >
                  {m.role === "user" ? (
                    m.text
                  ) : (
                    <div className="chat-md">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "12px 18px",
                    borderRadius: "16px",
                    borderBottomLeftRadius: "4px",
                    background: "#1a1a1a",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                  }}
                >
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div
            style={{
              padding: "0 24px 16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "50px",
                  border: "1px solid #2d2d2d",
                  background: "#0d0d0d",
                  color: "#9ca3af",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#6366f1";
                  e.target.style.color = "#a5b4fc";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#2d2d2d";
                  e.target.style.color = "#9ca3af";
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              padding: "16px 24px",
              borderTop: "1px solid #1f1f1f",
              gap: "12px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything about Srikanth..."
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: "50px",
                border: "1px solid #2d2d2d",
                background: "#0a0a0a",
                color: "#fff",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              style={{
                padding: "12px 24px",
                borderRadius: "50px",
                background: "#6366f1",
                border: "none",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.9rem",
                opacity: loading ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #2d2d2d; border-radius: 4px; }
        .chat-md p { margin: 4px 0; }
        .chat-md ul { padding-left: 1.2rem; margin: 4px 0; }
        .chat-md li { margin: 3px 0; }
        .chat-md strong { color: #a5b4fc; }
      `}</style>
    </div>
  );
}
