import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import TableViewIcon from "@mui/icons-material/TableView";
import ImportPrompt from "./ImportPrompt";
import { useNotification } from "../common/NotificationManager";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../config";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  "&.MuiTableCell-body": {
    fontSize: "0.875rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease-in-out",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="small"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="small"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="small"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="small"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function SalesDataTable({
  rows,
  onReset,
  onFileImported,
  onTrendsAnalyzed,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { showNotification } = useNotification();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const processDataAndCallApi = async (newData) => {
    const combinedData = [...rows, ...newData];
    try {
      const response = await fetch(
        `${API_BASE_URL}/analyze-json-sales-trends`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const trendData = await response.json();
      if (onFileImported) {
        onFileImported(combinedData, trendData);
      }
      showNotification(
        "Sales data and trends imported successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error importing file or analyzing trends:", error);
      showNotification(`Error: ${error.message}`, "error");
    }
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            showNotification("Failed to parse CSV file.", "error");
          } else {
            processDataAndCallApi(results.data);
          }
        },
        error: () => showNotification("Failed to parse CSV file.", "error"),
      });
    }
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          processDataAndCallApi(json);
        } catch (error) {
          showNotification("Failed to parse Excel file.", "error");
          console.error("Error parsing Excel file:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  if (rows.length === 0) {
    return <ImportPrompt onFileImported={onFileImported} onReset={onReset} />;
  }

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sales Data
            </Typography>
            <Chip 
              label={`${rows.length} records`} 
              color="primary" 
              variant="outlined"
              size="small"
            />
          </Box>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              component="label"
              variant="outlined"
              startIcon={<DescriptionIcon />}
              size="small"
            >
              Add CSV
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
              />
            </Button>
            <Button
              component="label"
              variant="outlined"
              startIcon={<TableViewIcon />}
              size="small"
            >
              Add Excel
              <VisuallyHiddenInput
                type="file"
                accept=".xls,.xlsx"
                onChange={handleExcelUpload}
              />
            </Button>
            {typeof onReset === "function" && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<RestartAltIcon />}
                onClick={onReset}
                size="small"
              >
                Reset
              </Button>
            )}
          </Stack>
        </Box>
        
        <TableContainer>
          <Table size="small" aria-label="sales data table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Buyer</StyledTableCell>
                <StyledTableCell align="right">Sale Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell component="th" scope="row">
                    {row.product}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.buyer}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.saleDate}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={4} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, 50]}
                  colSpan={4}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    ".MuiTablePagination-select, .MuiTablePagination-selectIcon, .MuiTablePagination-selectLabel":
                      {
                        transition: "color 0.3s ease-in-out",
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}