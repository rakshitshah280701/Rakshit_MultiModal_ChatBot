export async function sendToGPT(message, imageFile) {
  const formData = new FormData();
  formData.append("message", message);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to get response from GPT");

  const data = await response.json();
  return data;  // Fix: return entire response, not just data.reply
}
