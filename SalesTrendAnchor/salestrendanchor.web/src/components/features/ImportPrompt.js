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
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import TableViewIcon from "@mui/icons-material/TableView";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useNotification } from "../common/NotificationManager";
import { API_BASE_URL } from "../../config";

const REQUIRED_COLUMNS = ["product", "quantity", "buyer", "saleDate"];

function getColumns(data) {
  if (!Array.isArray(data) || data.length === 0) return [];
  return Object.keys(data[0]);
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
        onFileImported(data, trendData);
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
      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
            Map Your Columns
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
            Match each required field to a column from your file
          </Typography>
          
          <Stack spacing={3}>
            {REQUIRED_COLUMNS.map((field) => (
              <FormControl fullWidth key={field}>
                <InputLabel sx={{ textTransform: "capitalize" }}>
                  {field.replace(/([A-Z])/g, " $1")}
                </InputLabel>
                <Select
                  value={mapping[field]}
                  label={field.replace(/([A-Z])/g, " $1")}
                  onChange={(e) => handleMappingChange(field, e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select column</em>
                  </MenuItem>
                  {columns.map((col) => (
                    <MenuItem value={col} key={col}>
                      {col}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Stack>
          
          {mappingError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {mappingError}
            </Alert>
          )}
          
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 4 }}
            onClick={handleMappingSubmit}
          >
            Import Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
      }}
    >
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 4 }}>
          <CloudUploadIcon 
            sx={{ 
              fontSize: 64, 
              color: "primary.main", 
              mb: 2,
              opacity: 0.8,
            }} 
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Import Sales Data
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Upload your CSV or Excel file to analyze sales trends and get insights
          </Typography>
          
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4 }}>
            {REQUIRED_COLUMNS.map((col) => (
              <Chip 
                key={col}
                label={col.replace(/([A-Z])/g, " $1")}
                size="small"
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Button
            variant={fileType === "csv" ? "contained" : "outlined"}
            startIcon={<DescriptionIcon />}
            onClick={() => setFileType("csv")}
            sx={{ minWidth: 120 }}
          >
            CSV File
          </Button>
          <Button
            variant={fileType === "excel" ? "contained" : "outlined"}
            startIcon={<TableViewIcon />}
            onClick={() => setFileType("excel")}
            sx={{ minWidth: 120 }}
          >
            Excel File
          </Button>
        </Stack>

        <Button
          variant="contained"
          component="label"
          size="large"
          startIcon={<CloudUploadIcon />}
          sx={{ 
            mb: 3,
            minWidth: 200,
            py: 1.5,
          }}
        >
          Upload {fileType.toUpperCase()} File
          <input
            type="file"
            accept={fileType === "csv" ? ".csv" : ".xls,.xlsx"}
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Button>

        {typeof onReset === "function" && (
          <Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RestartAltIcon />}
              onClick={onReset}
              sx={{ mt: 2 }}
            >
              Reset Data
            </Button>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3, textAlign: "left" }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default ImportPrompt;