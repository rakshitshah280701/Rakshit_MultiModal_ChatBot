// import React from "react";
// import OCROverlay from "./OCROverlay";

// const ChatBubble = ({ sender, text, image, ocr }) => {
//   const isUser = sender === "user";

//   return (
//     <div
//       className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
//     >
//       <div
//         className={`relative max-w-[70%] rounded-lg px-4 py-2 shadow-sm ${
//           isUser
//             ? "bg-blue-600 text-white"
//             : "bg-gray-200 text-gray-900"
//         }`}
//       >
//         {image && (
//           <div className="relative mb-2 rounded overflow-hidden border border-gray-300">
//             <img
//               src={typeof image === "string" ? image : URL.createObjectURL(image)}
//               alt="uploaded"
//               className="max-w-full max-h-[200px] object-contain"
//             />
//             {/* OCR Bounding Boxes */}
//             {ocr && Array.isArray(ocr) && ocr.length > 0 && (
//               <OCROverlay boxes={ocr} />
//             )}
//           </div>
//         )}
//         {text && <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>}
//       </div>
//     </div>
//   );
// };

// export default ChatBubble;

import React from "react";
import OCROverlay from "./OCROverlay";

const ChatBubble = ({ sender, text, image, ocr }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[70%] rounded-lg p-3 shadow ${
          isUser ? "bg-gray-100 text-black" : "bg-blue-600 text-white"
        }`}
        style={{ position: "relative" }}
      >
        {image && (
          <div className="relative w-full max-w-sm">
            <img
              src={image}
              alt="uploaded"
              className="w-full rounded-md"
            />
            {ocr && <OCROverlay boxes={ocr} />}
          </div>
        )}
        {text && <p className="mt-2 whitespace-pre-line">{text}</p>}
      </div>
    </div>
  );
};

export default ChatBubble;
