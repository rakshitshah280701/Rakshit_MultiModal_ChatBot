import React from "react";

const OCROverlay = ({ boxes = [] }) => {
  if (!Array.isArray(boxes) || boxes.length === 0) return null;

  return (
    <div
      className="absolute inset-0"
      style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0 }}
    >
      {boxes.map((box, i) => {
        const points = box.bbox;
        const xs = points.map((pt) => pt[0]);
        const ys = points.map((pt) => pt[1]);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);

        return (
          <div
            key={i}
            className="absolute border-2 border-red-500"
            style={{
              top: minY,
              left: minX,
              width: maxX - minX,
              height: maxY - minY,
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              color: "#f00",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {box.text}
          </div>
        );
      })}
    </div>
  );
};

export default OCROverlay;
