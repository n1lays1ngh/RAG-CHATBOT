import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import FileUpload from "./components/FileUpload";
import ChatBox from './components/ChatBox'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800">RAG Chatbot</h1>
      <FileUpload />
      <ChatBox />
    </div>
  );
}



export default App;
