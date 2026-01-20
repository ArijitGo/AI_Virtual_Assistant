import uploadOnCloudinary from "../config/cloudinary.js";
import { geminiResponse } from "../gemini.js";
import { parseIntent } from "../utils/intentParser.js";
import User from "../models/user.model.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(400).json({ message: "user not found" });
    return res.status(200).json(user);
  } catch {
    return res.status(400).json({ message: "get current user error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage = imageUrl;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch {
    return res.status(400).json({ message: "updateAssistant error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;

    const user = await User.findById(req.userId);
    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName;

    // 🔥 STEP 1: LOCAL INTENT (NO GEMINI)
    let gemResult = parseIntent(command, assistantName);

    // 🔥 STEP 2: GEMINI FALLBACK
    if (!gemResult) {
      const result = await geminiResponse(command, assistantName, userName);
      const jsonMatch = result.match(/{[\s\S]*}/);

      if (!jsonMatch) {
        return res.json({
          type: "general",
          response: "Sorry, I didn't understand that."
        });
      }

      gemResult = JSON.parse(jsonMatch[0]);
    }

    const type = gemResult.type;

    // 🔥 STEP 3: FINAL RESPONSE
    switch (type) {
      case "get-date":
        return res.json({
          type,
          response: `Today's date is ${moment().format("YYYY-MM-DD")}`
        });

      case "get-time":
        return res.json({
          type,
          response: `Current time is ${moment().format("hh:mm A")}`
        });

      case "get-day":
        return res.json({
          type,
          response: `Today is ${moment().format("dddd")}`
        });

      case "get-month":
        return res.json({
          type,
          response: `This month is ${moment().format("MMMM")}`
        });

      default:
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response
        });
    }

  } catch (error) {
    return res.status(500).json({ response: "ask assistant error" });
  }
};
