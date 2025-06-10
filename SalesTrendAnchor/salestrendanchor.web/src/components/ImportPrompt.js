import React, { useRef, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useNotification } from "./NotificationManager";

const REQUIRED_COLUMNS = ["product", "quantity", "buyer", "saleDate"];

function getColumns(data) {
  if (!Array.isArray(data) || data.length === 0) return [];
  return Object.keys(data[0]);
}

function validateColumns(data) {
  if (!Array.isArray(data) || data.length === 0) return REQUIRED_COLUMNS;
  const columns = Object.keys(data[0]).map((col) => col.trim().toLowerCase());
  return REQUIRED_COLUMNS.filter((col) => !columns.includes(col));
}

function ImportPrompt({ onFileImported, onReset }) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const [fileType, setFileType] = useState("csv");
  const [rawData, setRawData] = useState(null);
  const [mapping, setMapping] = useState(null);
  const [columns, setColumns] = useState([]);
  const [mappingError, setMappingError] = useState(null);
  const { showNotification } = useNotification();

  const processDataAndCallApi = async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/analyze-json-sales-trends`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const trendData = await response.json();
      if (onFileImported) {
        onFileImported(data, trendData); // Pass both sales data and trend data
      }
      showNotification(
        "Sales data and trends imported successfully!",
        "success"
      );
    } catch (apiError) {
      console.error("Error analyzing trends:", apiError);
      showNotification(`Error analyzing trends: ${apiError.message}`, "error");
    }
  };
  const API_BASE_URL = "https://localhost:7183";

  const handleFileChange = (e) => {
    setError(null);
    setMapping(null);
    setRawData(null);
    setColumns([]);
    setMappingError(null);
    const file = e.target.files[0];
    if (!file) return;
    const handleParsedData = async (data) => {
      const cols = getColumns(data);
      setColumns(cols);
      const lowerCols = cols.map((c) => c.trim().toLowerCase());
      const missing = REQUIRED_COLUMNS.filter(
        (col) => !lowerCols.includes(col)
      );
      if (missing.length === 0) {
        await processDataAndCallApi(data);
      } else {
        setRawData(data);
        const autoMapping = {};
        REQUIRED_COLUMNS.forEach((req) => {
          const found = cols.find((c) => c.trim().toLowerCase() === req);
          autoMapping[req] = found || "";
        });
        setMapping(autoMapping);
      }
    };
    if (fileType === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            setError("Failed to parse CSV file.");
            showNotification("Failed to parse CSV file.", "error");
          } else {
            handleParsedData(results.data);
          }
        },
        error: () => {
          setError("Failed to parse CSV file.");
          showNotification("Failed to parse CSV file.", "error");
        },
      });
    } else if (fileType === "excel") {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          await handleParsedData(json);
        } catch {
          setError("Failed to parse Excel file.");
          showNotification("Failed to parse Excel file.", "error");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleMappingChange = (field, value) => {
    setMappingError(null);
    setMapping((prev) => ({ ...prev, [field]: value }));
  };

  const handleMappingSubmit = async () => {
    const selected = Object.values(mapping);
    if (
      selected.includes("") ||
      new Set(selected).size < REQUIRED_COLUMNS.length
    ) {
      setMappingError("Please map all required fields to unique columns.");
      showNotification(
        "Please map all required fields to unique columns.",
        "error"
      );
      return;
    }
    const mappedData = rawData.map((row) => {
      const mappedRow = {};
      REQUIRED_COLUMNS.forEach((field) => {
        mappedRow[field] = row[mapping[field]];
      });
      return mappedRow;
    });
    await processDataAndCallApi(mappedData);
  };

  if (mapping && rawData) {
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
          Map your columns
        </Typography>
        <Typography variant="body1" align="center">
          Please match each required field to a column from your file.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          {REQUIRED_COLUMNS.map((field) => (
            <FormControl fullWidth key={field}>
              <InputLabel>{field}</InputLabel>
              <Select
                value={mapping[field]}
                label={field}
                onChange={(e) => handleMappingChange(field, e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {columns.map((col) => (
                  <MenuItem value={col} key={col}>
                    {col}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>
        {mappingError && <Alert severity="error">{mappingError}</Alert>}
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleMappingSubmit}
        >
          Import data
        </Button>
      </Paper>
    );
  }

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
        No sales data available
      </Typography>
      <Typography variant="body1" align="center">
        Please import a <b>CSV</b> or <b>Excel</b> file to get started!
        <br />
        Choose the file type and upload your sales data below.
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
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
}

export default ImportPrompt;
