import { API_BASE_URL } from "../config";

export const getChurnPrediction = async (salesData) => {
  // salesData is already in the correct DTO format: [{ Client, Months }]
  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/churn-prediction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
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

export const getInactiveBuyers = async (
  salesData,
  numberOfRecentMonths = 3
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/inactive-buyers?numberOfRecentMonths=${numberOfRecentMonths}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
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
    console.error("Error fetching inactive buyers:", error);
    throw error;
  }
};

export const getTurnoverPrediction = async (salesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/turnover-prediction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
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
    console.error("Error fetching turnover prediction:", error);
    throw error;
  }
};

export const getOverallTurnoverPrediction = async (salesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/overall-turnover-prediction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
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
    console.error("Error fetching overall turnover prediction:", error);
    throw error;
  }
};

export const getTrendAnalysis = async (salesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/salesanalysis/trend-analysis`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesData),
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
    console.error("Error fetching trend analysis:", error);
    throw error;
  }
};
