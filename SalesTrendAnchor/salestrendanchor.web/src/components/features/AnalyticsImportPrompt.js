import React, { useRef, useState } from "react";
import { Button, Paper, Typography, Box, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useNotification } from "../common/NotificationManager";

function AnalyticsImportPrompt({ onFileImported, onReset, onManualInsert }) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const [fileType, setFileType] = useState("csv");
  const { showNotification } = useNotification();

  const handleFileChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    if (!file) return;

    const handleParsedData = (data) => {
      console.log("Parsed data:", data);
      if (data && data.length > 0) {
        console.log("Columns extracted:", Object.keys(data[0]));
      }
      if (onFileImported) {
        onFileImported(data);
      }
      showNotification("Data imported successfully!", "success");
    };

    if (fileType === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error("CSV parsing errors:", results.errors);
            setError("Failed to parse CSV file.");
            showNotification("Failed to parse CSV file.", "error");
          } else {
            handleParsedData(results.data);
          }
        },
        error: (err) => {
          console.error("CSV parsing failed:", err);
          setError("Failed to parse CSV file.");
          showNotification("Failed to parse CSV file.", "error");
        },
      });
    } else if (fileType === "excel") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          handleParsedData(json);
        } catch (err) {
          console.error("Excel parsing failed:", err);
          setError("Failed to parse Excel file.");
          showNotification("Failed to parse Excel file.", "error");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        minHeight: 300,
      }}
    >
      <Typography variant="h6" gutterBottom>
        No analytics data available
      </Typography>
      <Typography variant="body1" align="center">
        Please import a <b>CSV</b> or <b>Excel</b> file to get started!
        <br />
        Choose the file type and upload your analytics data below.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          variant={fileType === "csv" ? "contained" : "outlined"}
          onClick={() => setFileType("csv")}
        >
          CSV
        </Button>
        <Button
          variant={fileType === "excel" ? "contained" : "outlined"}
          onClick={() => setFileType("excel")}
        >
          Excel
        </Button>
        {typeof onReset === "function" && (
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={onReset}
            sx={{ ml: 2 }}
          >
            Reset data
          </Button>
        )}
      </Box>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload {fileType.toUpperCase()} File
        <input
          type="file"
          accept={fileType === "csv" ? ".csv" : ".xls,.xlsx"}
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Button>
      {onManualInsert && (
        <Button
          variant="outlined"
          color="success"
          sx={{ mt: 2, fontWeight: "bold", width: 200 }}
          onClick={onManualInsert}
        >
          Manual Insert
        </Button>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
}

export default AnalyticsImportPrompt;
