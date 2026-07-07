import React, { useState } from "react";
import { generateStory } from "../services/storyService";
import "./StoryGenerator.css";

const StoryGenerator = () => {
  const [monumentName, setMonumentName] = useState("");
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleGenerateStory = async (e) => {
    e.preventDefault();
    setError(null);
    setStory(null);

    if (!monumentName.trim()) {
      setError("Please enter a monument name");
      return;
    }

    setLoading(true);

    try {
      const result = await generateStory(monumentName);

      if (result.success) {
        setStory(result);
      } else {
        setError(result.message || "Failed to generate story");
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while generating the story. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story-generator-container">
      <div className="story-generator-card">
        <h1>🏛️ SanskritiSetu - AI Story Generator</h1>
        <p className="subtitle">Discover the stories behind India's heritage monuments</p>

        {/* Input Form */}
        <form onSubmit={handleGenerateStory} className="story-form">
          <div className="input-group">
            <input
              type="text"
              value={monumentName}
              onChange={(e) => setMonumentName(e.target.value)}
              placeholder="Enter monument name (e.g., Taj Mahal, Qutub Minar)"
              className="monument-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="generate-btn"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Story"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Story Display */}
        {story && (
          <div className="story-result">
            <h2>{story.monumentName}</h2>
            <div className="story-text">
              {story.story}
            </div>
            <div className="story-meta">
              <span className="word-count">📝 Words: {story.wordCount}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Crafting your story...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;
