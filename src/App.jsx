/*
React portfolio for Mohammed Zakir Nooraj
Theme: Metallic Blue Dark Mode
Compatible with Tailwind CSS v4
*/

import React, { useState, useEffect, useRef } from "react";

const LOGO_URL = "/c0680bed-0e78-464b-b56a-e4dbe23d8691.pnD:\IT4\Resume\SN\SN-Website\zakir-portfolio\public\MZN.png";

const RESUME = {
  name: "Mohammed Zakir Nooraj",
  title: "ServiceNow Developer",
  location: "Hyderabad, Telangana",
  email: "mdnooraj14@gmail.com",
  phone: "7780166523",
  linkedin: "https://linkedin.com/in/mohammed-zakir-nooraj",
  summary:
    "ServiceNow Developer skilled in JavaScript, Glide API, Business Rules, Flow Designer, and REST/SOAP integrations. Experienced in ITSM modules and cross-team collaboration for scalable automation.",
  experience: [
    {
      company: "IN TECHNET LIMITED",
      role: "ServiceNow Developer",
      from: "05/2024",
      location: "Hyderabad, Telangana",
      bullets: [
        "Developed and configured ServiceNow workflows to enhance operational efficiency.",
        "Maintained Business Rules, Client Scripts, and UI Policies following best practices.",
        "Executed ITSM modules: Incident, Problem, Change, and Service Catalog.",
        "Integrated external systems using REST/SOAP APIs.",
        "Worked with QA and DevOps for seamless deployments.",
      ],
    },
  ],
  education: [
    {
      school: "GMR Institute of Technology",
      degree: "B.Tech in Information Technology",
      year: "2020–2024",
    },
  ],
  skills: {
    core: [
      "ServiceNow Administration",
      "ServiceNow Development",
      "ITSM",
      "Workflow Automation",
      "Integration",
    ],
    technical: ["JavaScript", "React", "Python", "REST", "SOAP", "Data Analysis"],
  },
};

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="py-12 bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800 text-gray-300"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6 text-metallic-blue text-center">
          {title}
        </h2>
        <div className="prose max-w-none text-gray-300">{children}</div>
      </div>
    </section>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-block bg-metallic-blue/10 text-metallic-blue text-sm px-3 py-1 rounded-md mr-2 mb-2 border border-metallic-blue/30">
      {children}
    </span>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}! Your message has been received.`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-xl border border-metallic-blue/40 shadow-lg max-w-xl mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-3 px-3 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:ring-2 focus:ring-metallic-blue outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-3 px-3 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:ring-2 focus:ring-metallic-blue outline-none"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        required
        rows="4"
        className="w-full mb-4 px-3 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-md focus:ring-2 focus:ring-metallic-blue outline-none"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-metallic-blue text-white py-2 rounded-md hover:bg-metallic-blue/90 transition"
      >
        Send Message
      </button>
    </form>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m Zakir’s assistant. Ask me about his skills, education, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = input.trim().toLowerCase();
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
    setLoading(true);

    let reply = "I can tell you about Zakir’s skills, experience, or education.";

    if (msg.includes("skill")) reply = RESUME.skills.core.concat(RESUME.skills.technical).join(", ");
    else if (msg.includes("experience"))
      reply = RESUME.experience.map((e) => `${e.role} at ${e.company} (${e.from})`).join("; ");
    else if (msg.includes("education"))
      reply = RESUME.education.map((e) => `${e.degree} from ${e.school} (${e.year})`).join("; ");

    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
      {open && (
        <div className="w-80 md:w-96 bg-gray-900 shadow-2xl rounded-xl border border-metallic-blue/40">
          <div className="px-4 py-3 bg-metallic-blue text-white flex justify-between items-center">
            <div className="font-semibold">Zakir’s Assistant</div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="p-4 h-72 overflow-auto bg-gray-800">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 ${m.from === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block px-3 py-2 rounded-md max-w-[85%] ${
                    m.from === "user"
                      ? "bg-metallic-blue text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-700 flex gap-2 bg-gray-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Zakir..."
              className="flex-1 px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md focus:ring-2 focus:ring-metallic-blue outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-metallic-blue text-white px-3 py-2 rounded-md disabled:opacity-50 hover:bg-metallic-blue/90 transition"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-metallic-blue text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
      >
        💬
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-200 font-sans">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 shadow-lg border-b border-metallic-blue/50">
        <div className="max-w-6xl mx-auto flex items-center justify-center px-6">
          <img
            src={LOGO_URL}
            alt="Logo"
            className="w-12 h-12 mr-4 rounded-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <nav className="flex gap-6 text-sm text-gray-300 justify-center">
            <a href="#about" className="hover:text-metallic-blue">
              About
            </a>
            <a href="#experience" className="hover:text-metallic-blue">
              Experience
            </a>
            <a href="#skills" className="hover:text-metallic-blue">
              Skills
            </a>
            <a href="#education" className="hover:text-metallic-blue">
              Education
            </a>
            <a href="#contact" className="hover:text-metallic-blue">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-metallic-blue mb-4">
            {RESUME.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{RESUME.title}</p>
          <p className="max-w-3xl mx-auto text-gray-400">{RESUME.summary}</p>
        </section>

        <Section id="about" title="About">
          <p>{RESUME.summary}</p>
        </Section>

        <Section id="experience" title="Experience">
          {RESUME.experience.map((ex, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-semibold text-lg text-metallic-blue">
                {ex.role} — {ex.company}
              </h3>
              <p className="text-sm text-gray-400">
                {ex.from} • {ex.location}
              </p>
              <ul className="list-disc ml-6 mt-3 text-gray-300">
                {ex.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section id="skills" title="Skills">
          <h4 className="font-medium mb-2 text-metallic-blue">Core Skills</h4>
          <div className="mb-4">
            {RESUME.skills.core.map((s, i) => (
              <Tag key={i}>{s}</Tag>
            ))}
          </div>
          <h4 className="font-medium mb-2 text-metallic-blue">
            Technical Skills
          </h4>
          <div>
            {RESUME.skills.technical.map((s, i) => (
              <Tag key={i}>{s}</Tag>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          {RESUME.education.map((ed, i) => (
            <div key={i} className="mb-3">
              <div className="font-semibold text-metallic-blue">
                {ed.degree}
              </div>
              <div className="text-sm text-gray-400">
                {ed.school} • {ed.year}
              </div>
            </div>
          ))}
        </Section>

        <Section id="contact" title="Contact Me">
          <ContactForm />
        </Section>

        <footer className="py-8 bg-gray-900 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {RESUME.name}. Built with ⚙️ Metallic
            Blue Dark Theme.
          </p>
        </footer>
      </main>

      <Chatbot />
    </div>
  );
}
