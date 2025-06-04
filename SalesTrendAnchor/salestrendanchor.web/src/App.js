import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
      <div class="flex flex-col items-center space-y-4 bg-white w-56 h-screen border-r-2 border-gray-50">
        <div class="flex flex-row items-center justify-start w-full px-4 gap-2 mt-4">
          <Avatar>KO</Avatar>
          <div>logo</div>
        </div>

        <Button variant="text">Dashboard</Button>
        <Button variant="outlined" color="error">
          Logout
        </Button>
      </div>

      <div class="flex flex-col w-full h-screen">
        <div class="flex flex-row justify-left items-center w-screen h-10 bg-white border-b-2 border-gray-50">
          <div class="px-2">Dashboard</div>
        </div>

        <div class="flex-1 p-6 bg-gray-50 flex flex-col gap-y-4">
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
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 350 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Buyer</TableCell>
                  <TableCell align="right">Sale Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.product}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.buyer}</TableCell>
                    <TableCell align="right">{row.saleDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
