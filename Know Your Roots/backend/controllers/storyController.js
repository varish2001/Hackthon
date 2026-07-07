const OpenAI = require("openai");

const SARVAM_BASE_URL = process.env.SARVAM_BASE_URL || "https://api.sarvam.ai/v1";

const sarvamClient = new OpenAI({
  apiKey: process.env.SARVAM_API_KEY,
  baseURL: SARVAM_BASE_URL,
});

const SYSTEM_MESSAGE =
  "You are an Indian cultural heritage expert who understands regional diversity across different states of India and explains monuments in a storytelling format suitable for students.";

const getFallbackStory = ({ state, monument, language }) =>
  `In ${state}, ${monument} stands like a living classroom where history and culture meet. Students who visit hear stories of local rulers, artisans, and communities who shaped this monument over generations. Festivals, regional music, food traditions, and daily rituals around the site reveal how heritage remains part of modern life. The monument is not only stone and design, but also memory, identity, and pride for people of ${state}. This story is shared as a reliable backup for your ${language} preference, while keeping the language simple and engaging for students.`;

const normalizeStoryLength = (story) => {
  const words = story.trim().split(/\s+/);

  if (words.length > 120) {
    console.warn(
      `[story] Output exceeded 120 words (${words.length}). Truncating for MVP consistency.`
    );
    return words.slice(0, 120).join(" ");
  }

  if (words.length < 90) {
    console.warn(
      `[story] Output shorter than expected (${words.length} words). Returning as-is for MVP stability.`
    );
  }

  return story.trim();
};

const isUpstreamRecoverableError = (error) => {
  const recoverableCodes = new Set([
    "ETIMEDOUT",
    "ECONNRESET",
    "ENOTFOUND",
    "ECONNREFUSED",
    "EAI_AGAIN",
  ]);

  return (
    error?.status === 408 ||
    error?.status === 429 ||
    (error?.status >= 500 && error?.status <= 599) ||
    recoverableCodes.has(error?.code)
  );
};

const generateStory = async (req, res) => {
  const state = req.body?.state?.trim();
  const monument = req.body?.monument?.trim();
  const language = req.body?.language?.trim();

  if (!state || !monument || !language) {
    return res.status(400).json({
      error: "state, monument, and language are required",
    });
  }

  const timestamp = new Date().toISOString();
  console.log(
    `[story] Request received at ${timestamp} | state="${state}" monument="${monument}" language="${language}"`
  );

  if (!process.env.SARVAM_API_KEY) {
    console.error("[story] Missing SARVAM_API_KEY configuration.");
    return res.status(500).json({
      error: "Story generation service is not configured.",
    });
  }

  try {
    const startedAt = Date.now();
    console.log("[story] Calling Sarvam chat completion...");

    const response = await sarvamClient.chat.completions.create({
      model: "sarvam-m",
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: `Explain the cultural and historical importance of ${monument} located in ${state} in a storytelling format for students. Include regional traditions, cultural practices, and historical significance. Generate this story in ${language}. Keep it simple and engaging.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 220,
    });

    console.log(`[story] Sarvam response received in ${Date.now() - startedAt}ms.`);

    const generatedText = response?.choices?.[0]?.message?.content?.trim();

    if (!generatedText) {
      console.warn("[story] Empty response from Sarvam. Switching to fallback.");
      const fallbackStory = normalizeStoryLength(
        getFallbackStory({ state, monument, language })
      );
      return res.status(200).json({ story: fallbackStory });
    }

    const normalizedStory = normalizeStoryLength(generatedText);
    return res.status(200).json({ story: normalizedStory });
  } catch (error) {
    console.error("[story] Sarvam error", {
      status: error?.status,
      code: error?.code,
      message: error?.message,
    });

    if (error?.status === 401 || error?.status === 403) {
      return res.status(500).json({
        error: "Story generation service authentication failed.",
      });
    }

    if (isUpstreamRecoverableError(error)) {
      console.warn("[story] Recoverable upstream failure. Returning fallback story.");
      const fallbackStory = normalizeStoryLength(
        getFallbackStory({ state, monument, language })
      );
      return res.status(200).json({ story: fallbackStory });
    }

    console.warn(
      "[story] Unknown error path. Returning fallback story for MVP stability."
    );
    const fallbackStory = normalizeStoryLength(
      getFallbackStory({ state, monument, language })
    );
    return res.status(200).json({ story: fallbackStory });
  }
};

module.exports = { generateStory };
