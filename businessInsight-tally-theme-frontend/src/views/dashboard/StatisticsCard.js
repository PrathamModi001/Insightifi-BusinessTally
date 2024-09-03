// ** MUI Imports
import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { Account, CircleSlice2, Eye } from 'mdi-material-ui'



const StatisticsCard = ({ StatisticsData }) => {
  const theme = useTheme()

  const salesData = [
    {
      stats: `${StatisticsData?.activeUsers}`,
      title: 'Active',
      color: '#56CA00',
      icon: <Account sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `${StatisticsData?.inactiveUsers}`,
      title: 'Inactive',
      color: '#FFB400',
      icon: <CircleSlice2 sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: '0',
      color: '#16B1FF',
      title: 'Expired',
      icon: <Eye sx={{ fontSize: '1.75rem' }} />
    }
  ]

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Box key={index} sx={{ display: 'flex' }}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: item.color
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Box>
    ))
  }

  return (
    <Card sx={{
      [theme.breakpoints.down(600)]: {
        mt: 0
      },
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
        <Typography sx={{ fontSize: '16px', lineHeight: '24px' }}>Client Status</Typography>
        <Typography sx={{ fontSize: '12px', lineHeight: '24px' }}>Clients inactive for more than 15 days are considered inactive</Typography>
      </Box>
      <CardContent sx={{ padding: '20px !important' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {renderStats(StatisticsData)}
        </Grid>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '0px 20px 20px 20px' }}>
        <Typography sx={{ fontSize: '12px', lineHeight: '24px' }}>*5 days grace period is given to user after current subscription expires</Typography>
      </Box>
    </Card>
  )
}

export default StatisticsCard
