// export const parseIntent = (command, assistantName = "") => {
//   let text = command.toLowerCase();

//   // ✅ Remove assistant wake word (tiki, robo, etc.)
//   if (assistantName) {
//     const wakeWordRegex = new RegExp(`\\b${assistantName.toLowerCase()}\\b`, "gi");
//     text = text.replace(wakeWordRegex, "").trim();
//   }

//   // ✅ Google search
//   if (text.includes("google")) {
//     const query = text
//       .replace(/google/gi, "")
//       .replace(/search/gi, "")
//       .replace(/on/gi, "")
//       .trim();

//     return {
//       type: "google-search",
//       userInput: query,
//       response: "Here’s what I found on Google"
//     };
//   }

//   // ✅ YouTube play
//   if (text.includes("youtube") && text.includes("play")) {
//     const query = text.replace(/youtube|play/gi, "").trim();
//     return {
//       type: "youtube-play",
//       userInput: query,
//       response: "Playing it on YouTube"
//     };
//   }

//   // ✅ YouTube search
//   if (text.includes("youtube")) {
//     const query = text.replace(/youtube|search/gi, "").trim();
//     return {
//       type: "youtube-search",
//       userInput: query,
//       response: "Searching on YouTube"
//     };
//   }

//   // ✅ System commands
//   if (text.includes("time")) return { type: "get-time" };
//   if (text.includes("date")) return { type: "get-date" };
//   if (text.includes("day")) return { type: "get-day" };
//   if (text.includes("month")) return { type: "get-month" };

//   if (text.includes("calculator")) return { type: "calculator-open" };
//   if (text.includes("instagram")) return { type: "instagram-open" };
//   if (text.includes("facebook")) return { type: "facebook-open" };
//   if (text.includes("weather")) return { type: "weather-show" };

//   return null; // Gemini fallback
// };


export const parseIntent = (
  command,
  assistantName,
  lastContext = null
) => {
  if (!assistantName) return null;

  const originalText = command.toLowerCase();
  const name = assistantName.toLowerCase();

  // 🚨 RULE: Assistant listens ONLY if its name is spoken
  if (!originalText.includes(name)) {
    return null; // ❌ Ignore completely
  }

  // ✅ Remove assistant name AFTER confirming it exists
  let text = originalText.replace(name, "").trim();

  // 🔹 Context follow-up
  if (lastContext && text.includes("score")) {
    return {
      type: "google-search",
      userInput: `${lastContext.topic} score`,
      response: "Here’s the latest score",
      confidence: 0.95
    };
  }

  // 🔹 Google search
  if (text.includes("google")) {
    const query = text.replace(/google|search|on/gi, "").trim();
    return {
      type: "google-search",
      userInput: query,
      response: "Here’s what I found on Google",
      confidence: 0.9
    };
  }

  // 🔹 YouTube play
  if (text.includes("youtube") && text.includes("play")) {
    const query = text.replace(/youtube|play/gi, "").trim();
    return {
      type: "youtube-play",
      userInput: query,
      response: "Playing it on YouTube",
      confidence: 0.9
    };
  }

  // 🔹 YouTube search
  if (text.includes("youtube")) {
    const query = text.replace(/youtube|search/gi, "").trim();
    return {
      type: "youtube-search",
      userInput: query,
      response: "Searching on YouTube",
      confidence: 0.9
    };
  }

  // 🔹 System commands
  if (text.includes("time")) return { type: "get-time", confidence: 1 };
  if (text.includes("date")) return { type: "get-date", confidence: 1 };
  if (text.includes("day")) return { type: "get-day", confidence: 1 };
  if (text.includes("month")) return { type: "get-month", confidence: 1 };

  if (text.includes("calculator")) return { type: "calculator-open", confidence: 1 };
  if (text.includes("instagram")) return { type: "instagram-open", confidence: 1 };
  if (text.includes("facebook")) return { type: "facebook-open", confidence: 1 };
  if (text.includes("weather")) return { type: "weather-show", confidence: 0.8 };

  return null; // Gemini fallback
};
