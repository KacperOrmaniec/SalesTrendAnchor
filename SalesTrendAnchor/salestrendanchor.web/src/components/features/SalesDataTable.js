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
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CloseIcon from "@mui/icons-material/Close";
import ImportPrompt from "./ImportPrompt";
import { useNotification } from "../common/NotificationManager";
import Papa from "papaparse";
import * as XLSX from "xlsx";

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
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.3s ease-in-out",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
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
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
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
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
const API_BASE_URL = "https://localhost:7183";
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
      console.log("Received trendData from API:", trendData);
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

  return (
    <Box
      sx={{
        flex: { lg: "1 1 60%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {rows.length === 0 ? (
        <ImportPrompt
          onFileImported={onFileImported}
          onTrendsAnalyzed={onTrendsAnalyzed}
        />
      ) : (
        <Paper
          elevation={3}
          sx={{
            alignSelf: "flex-start",
            minHeight: 100,
            maxWidth: 700,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            transition:
              "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="success"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload CSV
              <VisuallyHiddenInput
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
              />
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="success"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Excel
              <VisuallyHiddenInput
                type="file"
                accept=".xls,.xlsx"
                onChange={handleExcelUpload}
              />
            </Button>
            {typeof onReset === "function" && (
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={onReset}
              >
                Reset data
              </Button>
            )}
          </Box>
          <TableContainer>
            <Table
              sx={{ minWidth: 550 }}
              size="small"
              aria-label="a dense table"
            >
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
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50]}
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
        </Paper>
      )}
    </Box>
  );
}
