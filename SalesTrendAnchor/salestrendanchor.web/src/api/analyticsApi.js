import { API_BASE_URL } from "../config";

export const getChurnPrediction = async (salesData) => {
  const formattedData = salesData.map((item) => ({
    ClientName: item.Klient,
    Turnover: parseFloat(item.Obrót),
    Margin: parseFloat(item.Marża),
    Date: item.Data, // Assuming Date is in a format compatible with backend (e.g., YYYY-MM-DD)
  }));

  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/churn-prediction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching churn prediction:", error);
    throw error;
  }
};
