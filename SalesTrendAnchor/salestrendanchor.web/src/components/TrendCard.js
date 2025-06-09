import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function TrendCard({ trend }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        flexShrink: 0,
        minWidth: 280,
        minHeight: 120,
        p: 2,
        mb: 2,
        transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          fontWeight: 'bold',
          transition: 'color 0.3s ease-in-out',
        }}
      >
        Upcoming Trend
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box>
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 'medium',
              transition: 'color 0.3s ease-in-out',
            }}
          >
            Expected Next Buy:
          </Typography>{" "}
          <Typography 
            component="span"
            sx={{ transition: 'color 0.3s ease-in-out' }}
          >
            {trend.NextBuyDate}
          </Typography>
        </Box>
        <Box>
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 'medium',
              transition: 'color 0.3s ease-in-out',
            }}
          >
            Product:
          </Typography>{" "}
          <Typography 
            component="span"
            sx={{ transition: 'color 0.3s ease-in-out' }}
          >
            {trend.Product}
          </Typography>
        </Box>
        <Box>
          <Typography 
            component="span" 
            sx={{ 
              fontWeight: 'medium',
              transition: 'color 0.3s ease-in-out',
            }}
          >
            Buyer:
          </Typography>{" "}
          <Typography 
            component="span"
            sx={{ transition: 'color 0.3s ease-in-out' }}
          >
            {trend.Buyer}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default TrendCard;
