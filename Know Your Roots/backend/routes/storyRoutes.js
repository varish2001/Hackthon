const express = require("express");
const { generateStory } = require("../controllers/storyController");

const router = express.Router();

/**
 * POST /api/stories/generate
 * Generate a culturally contextual story about an Indian monument.
 * Request body: { state: string, monument: string, language: string }
 * Success response: { story: string }
 * Validation error response: { error: string }
 */
router.post("/generate", generateStory);

module.exports = router;
