const express = require("express");
const axios = require("axios");

const router = express.Router();

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const SARVAM_BASE_URL = "https://api.sarvam.ai";

const LANGUAGE_CODES = {
  english: "en-IN",
  hindi: "hi-IN",
  tamil: "ta-IN",
  "en-in": "en-IN",
  "hi-in": "hi-IN",
  "ta-in": "ta-IN",
};

function getLanguageCode(input) {
  if (!input) return "en-IN";
  const key = String(input).trim().toLowerCase();
  return LANGUAGE_CODES[key] || "en-IN";
}

async function generateStoryInEnglish(monumentName) {
  const payload = {
    model: "sarvam-m",
    temperature: 0.7,
    max_tokens: 220,
    messages: [
      {
        role: "system",
        content:
          "You are an Indian heritage storyteller. Write short, vivid, factual storytelling style content for young users.",
      },
      {
        role: "user",
        content: `Tell me a short story-style explanation (120-160 words) about "${monumentName}" in simple English. Include why it is culturally important.`,
      },
    ],
  };

  const response = await axios.post(
    `${SARVAM_BASE_URL}/v1/chat/completions`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY,
      },
      timeout: 20000,
    }
  );

  return response.data?.choices?.[0]?.message?.content?.trim() || "";
}

async function translateText(text, sourceCode, targetCode) {
  const payload = {
    input: text,
    source_language_code: sourceCode,
    target_language_code: targetCode,
    model: "sarvam-translate:v1",
    mode: "formal",
  };

  const response = await axios.post(`${SARVAM_BASE_URL}/translate`, payload, {
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": SARVAM_API_KEY,
    },
    timeout: 20000,
  });

  return response.data?.translated_text?.trim() || "";
}

router.post("/story", async (req, res) => {
  try {
    const { monument, language } = req.body;

    if (!SARVAM_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Missing SARVAM_API_KEY in environment variables.",
      });
    }

    if (!monument || !String(monument).trim()) {
      return res.status(400).json({
        success: false,
        message: "monument is required.",
      });
    }

    const targetLanguageCode = getLanguageCode(language);

    const englishStory = await generateStoryInEnglish(monument);
    if (!englishStory) {
      return res.status(502).json({
        success: false,
        message: "Failed to generate story from Sarvam Chat API.",
      });
    }

    let finalStory = englishStory;
    if (targetLanguageCode !== "en-IN") {
      finalStory = await translateText(englishStory, "en-IN", targetLanguageCode);
      if (!finalStory) {
        return res.status(502).json({
          success: false,
          message: "Story generated, but translation failed.",
        });
      }
    }

    return res.json({
      success: true,
      monument,
      languageCode: targetLanguageCode,
      story: finalStory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating story.",
      error: error.response?.data || error.message,
    });
  }
});

console.log('inside sarvamStoryRoutes ->', typeof router, router && router.constructor && router.constructor.name);
module.exports = router;
