import Paper from "@mui/material/Paper";

function TrendList() {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Paper elevation={2} sx={{ minWidth: 280, minHeight: 180, p: 2 }}>
        <h2 className="font-bold text-lg mb-4">Upcoming Trend</h2>
        <div className="mb-2">
          <span className="font-semibold">Trend date:</span>{" "}
          <span>2025-06-10</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Product:</span>{" "}
          <span>Laptop Lenovo ThinkPad</span>
        </div>
        <div>
          <span className="font-semibold">Buyer:</span> <span>Anna Nowak</span>
        </div>
      </Paper>
    </Paper>
  );
}

export default TrendList;
