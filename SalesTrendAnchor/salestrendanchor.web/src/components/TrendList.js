import Paper from "@mui/material/Paper";
import TrendCard from "./TrendCard";
import { useTheme } from '@mui/material/styles';

const trends = [
  {
    Id: "1",
    Product: "Laptop Lenovo ThinkPad",
    Buyer: "Anna Nowak",
    LastSaleDate: "2025-06-01",
    NextBuyDate: "2025-06-09",
  },
  {
    Id: "2",
    Product: 'Monitor Dell 24"',
    Buyer: "Jan Kowalski",
    LastSaleDate: "2025-06-02",
    NextBuyDate: "2025-06-03",
  },
  {
    Id: "3",
    Product: "Mysz Logitech MX Master",
    Buyer: "Piotr Zieliński",
    LastSaleDate: "2025-06-03",
    NextBuyDate: "2025-06-13",
  },
  {
    Id: "4",
    Product: "Klawiatura Keychron K2",
    Buyer: "Maria Wiśniewska",
    LastSaleDate: "2025-06-03",
    NextBuyDate: "2025-06-14",
  },
  {
    Id: "5",
    Product: "Słuchawki Sony WH-1000XM4",
    Buyer: "Tomasz Lewandowski",
    LastSaleDate: "2025-06-04",
    NextBuyDate: "2025-06-15",
  },
  {
    Id: "6",
    Product: "Kamera Logitech C920",
    Buyer: "Katarzyna Nowicka",
    LastSaleDate: "2025-06-05",
    NextBuyDate: "2025-06-16",
  },
  {
    Id: "7",
    Product: "Tablet Apple iPad",
    Buyer: "Marek Dąbrowski",
    LastSaleDate: "2025-06-06",
    NextBuyDate: "2025-06-17",
  },
  {
    Id: "8",
    Product: "Drukarka HP LaserJet",
    Buyer: "Agnieszka Kwiatkowska",
    LastSaleDate: "2025-06-07",
    NextBuyDate: "2025-06-18",
  },
];

function getTrendStatus(trend) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextBuyDate = new Date(trend.NextBuyDate);
  nextBuyDate.setHours(0, 0, 0, 0);
  if (nextBuyDate < today) return 0; // overdue (red)
  if (nextBuyDate.getTime() === today.getTime()) return 1; // today (yellow)
  return 2; // upcoming (green)
}

function TrendList() {
  const theme = useTheme();

  // Sort: overdue (0), today (1), upcoming (2), then by date ascending
  const sortedTrends = [...trends].sort((a, b) => {
    const statusA = getTrendStatus(a);
    const statusB = getTrendStatus(b);
    if (statusA !== statusB) return statusA - statusB;
    // If same status, sort by date ascending
    const dateA = new Date(a.NextBuyDate);
    const dateB = new Date(b.NextBuyDate);
    return dateA - dateB;
  });

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: 820,
        overflowY: "auto",
        minWidth: 320,
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.paper,
          transition: 'background-color 0.3s ease-in-out',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '4px',
          transition: 'background-color 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
    >
      {sortedTrends.map((trend) => (
        <TrendCard key={trend.Id} trend={trend} />
      ))}
    </Paper>
  );
}

export default TrendList;
