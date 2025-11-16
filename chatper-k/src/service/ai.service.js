const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function ImageSend(base64ImageData, mimeType) {
  const result = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64ImageData,
        },
      },
      {
        text: `
          You must return ONLY valid JSON.
          
          Extract:

          - "title": A concise SEO-friendly title (no brand names).
          - "description": A detailed professional description (looks, features, use case).

          Return strictly this JSON format:

          {
            "title": "",
            "description": ""
          }

          No text before or after the JSON.
        `
      }
    ],
  });

  let aiText = result.text;

  // --- Extract only JSON from the response ---
  const jsonMatch = aiText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("AI RAW OUTPUT:", aiText);
    throw new Error("Gemini did not return valid JSON");
  }

  const jsonString = jsonMatch[0];

  const parsed = JSON.parse(jsonString);

  return parsed;
}

module.exports = ImageSend;
