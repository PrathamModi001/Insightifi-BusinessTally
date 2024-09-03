// ** MUI Imports
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import ReactApexCharts from 'src/@core/components/react-apexcharts'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const SubscriptionChart = ({ SubscriptionData }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  // Initialize empty arrays
  let city = [];
  let totalAmount = [];

  // Loop through each object in the array
  SubscriptionData.forEach(item => {
    city.push(item.city);
    totalAmount?.push(parseFloat(item.totalAmount));
  });

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: true },
    dataLabels: { enabled: true },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    labels: city
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <Typography variant='h6'>Subscriptions by Cities</Typography>
        </Box>
        <Box>
          <ReactApexCharts type='pie' height={205} options={options} series={totalAmount} />
        </Box>
      </CardContent>
    </Card >
  )
}

export default SubscriptionChart
