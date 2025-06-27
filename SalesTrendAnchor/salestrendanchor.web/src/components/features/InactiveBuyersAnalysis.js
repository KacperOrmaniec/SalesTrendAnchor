import React, { useState } from "react";
import { Button, Box, CircularProgress, Alert } from "@mui/material";
import PropTypes from "prop-types";
import { getInactiveBuyers } from "../../api/analyticsApi";

function InactiveBuyersAnalysis({ salesData }) {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInactiveBuyers = async (numberOfRecentMonths = 3) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInactiveBuyers(salesData, numberOfRecentMonths);
      setInactiveData(response);
    } catch (err) {
      setError(err.message || "Failed to fetch inactive buyers.");
      setInactiveData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisClick = () => {
    fetchInactiveBuyers();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={handleAnalysisClick}
        disabled={loading}
        sx={{ minWidth: 220 }}
      >
        {loading ? <CircularProgress size={24} /> : "Analyze Inactive Buyers"}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {inactiveData && inactiveData.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <pre>{JSON.stringify(inactiveData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

InactiveBuyersAnalysis.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default InactiveBuyersAnalysis;
