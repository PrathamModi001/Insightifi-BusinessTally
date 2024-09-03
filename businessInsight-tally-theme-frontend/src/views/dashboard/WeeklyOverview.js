// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Icons Imports

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = ({ WeeklyOverviewData }) => {
  // ** Hook
  const theme = useTheme()



  let month = [];
  let totalAmount = [];

  // Loop through each object in the array
  WeeklyOverviewData?.forEach(item => {
    let date = new Date(item?.month);
    let monthName = date.toLocaleString('default', { month: 'long' });
    month.push(monthName);
    totalAmount.push(parseFloat(item?.totalAmount));
  });

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'Flat',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      // theme.palette.background.default,
      // theme.palette.background.default,
      // theme.palette.background.default,
      theme.palette.primary.main,
      
      // theme.palette.background.default,
      // theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'darken' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: month,
      tickPlacement: 'on',
      labels: { show: true, },
      axisTicks: { show: false },
      axisBorder: { show: false }
    }
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ padding: '10px', fontSize: '16px', lineHeight: '24px' }}>Overview of Revenue</Typography>
      </Box>
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: totalAmount }]} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
