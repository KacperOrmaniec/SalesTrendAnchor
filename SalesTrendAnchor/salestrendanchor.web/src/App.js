import "./App.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SalesDataTable from "./components/SalesDataTable";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

function createData(product, quantity, buyer, saleDate) {
  return { product, quantity, buyer, saleDate };
}
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

const rows = [
  createData("Laptop Lenovo ThinkPad", 3, "Anna Nowak", "2025-06-01"),
  createData('Monitor Dell 24"', 5, "Jan Kowalski", "2025-06-02"),
  createData("Mysz Logitech MX Master", 2, "Piotr Zieliński", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData("Klawiatura Keychron K2", 1, "Maria Wiśniewska", "2025-06-03"),
  createData(
    "Słuchawki Sony WH-1000XM4",
    4,
    "Tomasz Lewandowski",
    "2025-06-04"
  ),
];
function App() {
  return (
    <div class="flex flex-row bg-gray-100">
      <Sidebar />

      <div class="flex flex-col w-full h-screen">
        <TopBar />
        <div class="flex-1 p-6 bg-gray-50 flex flex-row gap-y-4 gap-x-8">
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
            }}
          >
            <Button
              className="self-start"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
            <SalesDataTable rows={rows} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              minWidth: 300,
              maxWidth: 700,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Paper elevation={2} sx={{ minWidth: 280, minHeight: 180, p: 2 }}>
              <h2 class="font-bold text-lg mb-4">Upcoming Trend</h2>
              <div class="mb-2">
                <span class="font-semibold">Trend date:</span>{" "}
                <span>2025-06-10</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Product:</span>{" "}
                <span>Laptop Lenovo ThinkPad</span>
              </div>
              <div>
                <span class="font-semibold">Buyer:</span>{" "}
                <span>Anna Nowak</span>
              </div>
            </Paper>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default App;
