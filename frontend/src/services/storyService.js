// API Base URL - Change this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Fetch AI-generated story from backend
 * @param {string} monumentName - Name of the monument
 * @returns {Promise<Object>} - API response with story
 */
export const generateStory = async (monumentName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stories/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monumentName: monumentName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate story");
    }

    return data;
  } catch (error) {
    console.error("Error fetching story:", error);
    throw error;
  }
};
