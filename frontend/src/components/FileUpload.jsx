import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading...");

    try {
      const res = await axios.post("http://localhost:8000/ingest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setStatus("  File uploaded and processed.");
      } else {
        setStatus(" Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus(" Error uploading file.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload a Document</h2>
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0
        file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
      >
        Upload
      </button>
      {status && <p className="mt-3 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}

export default FileUpload;