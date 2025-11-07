// controllers/cityController.js

export const getCities = async (req, res) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json"
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("🔥 Error fetching cities:", error.message);
    res.status(500).json({ error: "Failed to load city list" });
  }
};
