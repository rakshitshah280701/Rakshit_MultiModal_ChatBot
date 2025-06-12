// import React, { useState } from "react";

// const InputBar = ({ onSend }) => {
//   const [text, setText] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSend = () => {
//     onSend(text, image);
//     setText("");
//     setImage(null);
//   };

//   return (
//     <div className="bg-white border-t border-gray-200 p-3 flex flex-col gap-2">
//       {/* Preview if image selected */}
//       {image && (
//         <div className="relative w-24">
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Preview"
//             className="rounded-lg w-full h-auto border shadow"
//           />
//           <button
//             onClick={() => setImage(null)}
//             className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow hover:bg-red-600"
//             title="Remove"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <div className="flex items-center gap-2">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="hidden"
//           id="fileInput"
//         />
//         <label htmlFor="fileInput" className="cursor-pointer text-gray-500 text-xl px-2">📎</label>

//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InputBar;

import React, { useState } from "react";

const InputBar = ({ onSend }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    onSend(text, image);
    setText("");
    setImage(null);
    // Reset input value so same image can be uploaded again
    document.getElementById("fileInput").value = null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      e.target.value = null; // ✅ Key change: allow reselecting same file
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-3 flex flex-col gap-2">
      {image && (
        <div className="relative w-24">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="rounded-lg w-full h-auto border shadow"
          />
          <button
            onClick={() => {
              setImage(null);
              document.getElementById("fileInput").value = null; // reset input
            }}
            className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow hover:bg-red-600"
            title="Remove"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer text-gray-500 text-xl px-2">📎</label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InputBar;
