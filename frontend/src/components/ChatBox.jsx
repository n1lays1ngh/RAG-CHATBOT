

import { useState } from 'react';
import { sendQueryToBackend } from '../api';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendQueryToBackend(input, newMessages);
      const assistantMessage = { role: 'assistant', content: response.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([...newMessages, { role: 'assistant', content: " Error getting a response" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-3/4 pt-[60px] pr-[30px] pl-[60px] mx-auto">
      <div className="bg-white border rounded-lg shadow-md p-4 h-[70vh] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-sm text-gray-500">Thinking...</div>}
      </div>

      <div className="flex gap-2">
        <textarea
          className="w-full border rounded-lg p-2 resize-none"
          rows="2"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

