import { List, ListItem, Typography, Chip, Paper, Stack } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function getRiskColor(score) {
  if (score >= 80) return "error.main";
  if (score >= 50) return "warning.main";
  return "success.main";
}

function ChurnResultList({ results }) {
  if (!results || results.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          minHeight: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          No churn prediction results to display.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxHeight: 600,
        minWidth: 320,
        maxWidth: 420,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mx: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", wordBreak: "break-word" }}
      >
        Churn Prediction Results
      </Typography>
      <List disablePadding>
        {results.map((item, idx) => (
          <ListItem
            key={idx}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: "background.default",
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              cursor: "pointer",
              transition:
                "background-color 0.3s, box-shadow 0.3s, transform 0.2s",
              "&:hover": {
                bgcolor: "action.hover",
                boxShadow: 4,
                transform: "translateY(-2px) scale(1.01)",
              },
              width: "100%",
              maxWidth: 370,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ width: "100%", mb: 1 }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", flex: 1, wordBreak: "break-all" }}
              >
                {item.client}
              </Typography>
              <Chip
                label={`Risk: ${item.churnRiskScore}`}
                sx={{
                  bgcolor: getRiskColor(item.churnRiskScore),
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 14,
                  wordBreak: "break-word",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ mb: 1, wordBreak: "break-word" }}>
              {item.trendDescription}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                icon={
                  item.isLosingBuyer ? (
                    <WarningAmberIcon color="error" />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )
                }
                label={item.isLosingBuyer ? "Losing Buyer" : "Stable Buyer"}
                color={item.isLosingBuyer ? "error" : "success"}
                size="small"
                variant={item.isLosingBuyer ? "filled" : "outlined"}
                sx={{
                  wordBreak: "break-word",
                  maxWidth: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
              <Chip
                icon={
                  item.hasZeroTurnoverForConsecutiveMonths ? (
                    <CancelIcon color="error" />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )
                }
                label={
                  item.hasZeroTurnoverForConsecutiveMonths
                    ? "Zero Turnover (Consecutive)"
                    : "Active Turnover"
                }
                color={
                  item.hasZeroTurnoverForConsecutiveMonths ? "error" : "success"
                }
                size="small"
                variant={
                  item.hasZeroTurnoverForConsecutiveMonths
                    ? "filled"
                    : "outlined"
                }
                sx={{
                  wordBreak: "break-word",
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ChurnResultList;
