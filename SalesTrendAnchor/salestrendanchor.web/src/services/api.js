const API_BASE_URL = "https://localhost:7001"; // Adjust this to match your API's URL

export const fetchSaleTrends = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analyze-in-memory-sale-trends`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch sale trends");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sale trends:", error);
    throw error;
  }
};
