# 🤖 Virtual Assistant (Full Stack)

A voice-enabled AI virtual assistant that listens for a wake word, understands natural language commands, and performs intelligent actions like search, time/date queries, and general conversation.

This project is built as a **full-stack application** with a modern frontend, a secure backend, and AI-powered intent understanding using **Google Gemini**.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Web Speech API (Voice recognition & speech output)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Google Gemini API
- JWT Authentication

---

## ✨ Features

- 🎙️ Voice command recognition
- 🧠 Wake-word based assistant (e.g. **Tiki** or custom name)
- 🔍 Google search commands
- ▶️ YouTube search & play commands
- 📅 Get current date, time, day, and month
- 👤 User authentication (JWT based)
- 🖼️ Custom assistant name & avatar
- 🕓 Command history tracking
- ⚡ Rate-limited API for safety

---

## 📁 Project Structure

```text
virtual-assistant/
├── backend/
│   ├── controllers/     # Request handling logic
│   ├── routes/          # API routes
│   ├── models/          # MongoDB schemas
│   ├── config/          # DB, cloud & service configs
│   ├── index.js         # Server entry point
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/             # React source code
│   ├── public/
│   ├── package.json
│   └── .gitignore
│
├── README.md

