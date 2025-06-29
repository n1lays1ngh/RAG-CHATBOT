// // File: src/components/FileUpload.jsx
// import React, { useState } from "react";
// import { FaFileUpload } from "react-icons/fa";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");
//   const [dragging, setDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     if (selected) {
//       setFile(selected);
//       setStatus("");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//       setStatus("");
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setUploading(true);
//     setStatus("Uploading...");
//     // Simulate upload delay
//     setTimeout(() => {
//       setUploading(false);
//       setStatus("Upload successful!");
//     }, 2000);
//   };

//   return (
//     <div className="p-4 bg-[#102840] rounded-xl shadow-xl w-full max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-semibold mb-4 text-center text-white">Upload a Document</h2>

//       {/* Drag and Drop Section */}
//       <div className="mb-6 pr-[30px] pt-[30px]">
//         <div
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragging(true);
//           }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
//             dragging ? "border-[#90caf9] bg-[#1e3a5f]" : "border-[#4f5b62] bg-[#0a1929]"
//           }`}
//         >
//           <label className="flex flex-col items-center justify-center space-y-2 cursor-pointer group">
//             <div className="bg-[#1565c0] p-4 rounded-full transition transform group-hover:scale-110 group-hover:bg-[#1976d2]">
//               <FaFileUpload className="text-white text-3xl group-hover:text-[#e3f2fd]" />
//             </div>
//             <span className="text-white font-medium group-hover:text-[#bbdefb] transition">
//               Click or drag file to upload (.pdf, .txt)
//             </span>
//             <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" />
//           </label>
//         </div>

//         {file && (
//           <p className="text-sm text-[#cfd8dc] text-center mt-4">
//             Selected: <span className="font-medium text-white">{file.name}</span>
//           </p>
//         )}
//       </div>

//       {/* Upload Button Section */}
//       <div className="pt-[30px] pr-[30px]">
//         <button
//           onClick={handleUpload}
//           className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-medium py-2 px-4 rounded-lg transition"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>

//         {status && <p className="mt-3 text-center text-sm text-white">{status}</p>}
//       </div>
//     </div>
//   );



// import { useState } from "react";
// import axios from "axios";

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setStatus("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     setStatus("Uploading...");

//     try {
//       const res = await axios.post("http://localhost:8000/ingest", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.status === 200) {
//         setStatus("  File uploaded and processed.");
//       } else {
//         setStatus(" Upload failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus(" Error uploading file.");
//     }
//   };

//   return (
//     <div className="p-4 bg-[#102840] rounded-xl shadow-xl w-full max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-semibold mb-4 text-center text-white">Upload a Document</h2>

//       {/* Drag and Drop Section */}
//       <div className="mb-6 pr-[30px] pt-[30px]">
//         <div
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragging(true);
//           }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
//             dragging ? "border-[#90caf9] bg-[#1e3a5f]" : "border-[#4f5b62] bg-[#0a1929]"
//           }`}
//         >
//           <label className="flex flex-col items-center justify-center space-y-2 cursor-pointer group">
//             <div className="bg-[#1565c0] p-4 rounded-full transition transform group-hover:scale-110 group-hover:bg-[#1976d2]">
//               <FaFileUpload className="text-white text-3xl group-hover:text-[#e3f2fd]" />
//             </div>
//             <span className="text-white font-medium group-hover:text-[#bbdefb] transition">
//               Click or drag file to upload (.pdf, .txt)
//             </span>
//             <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" />
//           </label>
//         </div>

//         {file && (
//           <p className="text-sm text-[#cfd8dc] text-center mt-4">
//             Selected: <span className="font-medium text-white">{file.name}</span>
//           </p>
//         )}
//       </div>

//       {/* Upload Button Section */}
//       <div className="pt-[30px] pr-[30px]">
//         <button
//           onClick={handleUpload}
//           className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-medium py-2 px-4 rounded-lg transition"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>

//         {status && <p className="mt-3 text-center text-sm text-white">{status}</p>}
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

import { useState } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setStatus("📤 Uploading...");

    try {
      const res = await axios.post("http://localhost:8000/ingest", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setStatus("✅ File uploaded and processed.");
        setFile(null); // Optionally clear file
      } else {
        setStatus("❌ Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-[#102840] rounded-xl shadow-xl w-full max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-white">Upload a Document</h2>

      {/* Drag and Drop Section */}
      <div className="mb-6 pr-[30px] pt-[30px]">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
            dragging ? "border-[#90caf9] bg-[#1e3a5f]" : "border-[#4f5b62] bg-[#0a1929]"
          }`}
        >
          <label className="flex flex-col items-center justify-center space-y-2 cursor-pointer group">
            <div className="bg-[#1565c0] p-4 rounded-full transition transform group-hover:scale-110 group-hover:bg-[#1976d2]">
              <FaFileUpload className="text-white text-3xl group-hover:text-[#e3f2fd]" />
            </div>
            <span className="text-white font-medium group-hover:text-[#bbdefb] transition">
              Click or drag file to upload (.pdf, .txt)
            </span>
            <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {file && (
          <p className="text-sm text-[#cfd8dc] text-center mt-4">
            Selected: <span className="font-medium text-white">{file.name}</span>
          </p>
        )}
      </div>

      {/* Upload Button Section */}
      <div className="pt-[30px] pr-[30px]">
        <button
          onClick={handleUpload}
          className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-medium py-2 px-4 rounded-lg transition"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {status && <p className="mt-3 text-center text-sm text-white">{status}</p>}
      </div>
    </div>
  );
}

export default FileUpload;
