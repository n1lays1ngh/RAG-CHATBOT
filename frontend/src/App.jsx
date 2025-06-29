import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import FileUpload from "./components/FileUpload";
import ChatBox from './components/ChatBox'
function App() {
  return (
    <div id="root" className="min-h-screen w-screen bg-[#0a1929] flex flex-col overflow-hidden">
      {/* Viewport Meta Tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Header */}
      <div className="w-full bg-[#102840] py-4 px-6 shadow-md">
        <h1 className="text-4xl font-bold text-white text-center">RAG Chatbot</h1>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 w-full max-w-[1280px] mx-auto px-6 py-6 gap-6">
        {/* File Upload (1/4 width) */}
        <div className="w-1/4 min-w-[300px]">
          <FileUpload />
        </div>

        {/* ChatBox (3/4 width) */}
        <div className="w-3/4">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}






export default App;
