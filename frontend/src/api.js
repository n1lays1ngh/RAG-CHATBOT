// src/api.js

// Main function used in ChatBox.jsx
export async function sendQueryToBackend(userQuery, history = []) {
  const response = await fetch('http://localhost:8000/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_query: userQuery,
      history: history,
      model: "phi3",     // optional
      stream: false      // optional
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return await response.json(); // returns { response: "..." }
}
