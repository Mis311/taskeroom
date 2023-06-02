// getCompletion.js
const getCompletion = async (prompt) => {
  try {
    const response = await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("done");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Return the entire 'choices' array
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null;
  }
};

export default getCompletion;
