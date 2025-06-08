import Paper from "@mui/material/Paper";

function TrendCard({ trend }) {
  return (
    <Paper
      elevation={2}
      sx={{
        flexShrink: 0,
        minWidth: 280,
        minHeight: 120,
        p: 2,
        mb: 2,
      }}
    >
      <h2 className="font-bold text-lg mb-2">Upcoming Trend</h2>
      <div className="mb-1">
        <span className="font-semibold">Expected Next Buy:</span>{" "}
        <span>{trend.NextBuyDate}</span>
      </div>
      <div className="mb-1">
        <span className="font-semibold">Product:</span>{" "}
        <span>{trend.Product}</span>
      </div>
      <div>
        <span className="font-semibold">Buyer:</span> <span>{trend.Buyer}</span>
      </div>
    </Paper>
  );
}

export default TrendCard;
