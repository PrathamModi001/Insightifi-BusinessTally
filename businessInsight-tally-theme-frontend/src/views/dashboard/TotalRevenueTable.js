// ** MUI Imports
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

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

const TotalRevenueTable = ({ TotalRevenueData }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const Data = [
    {
      key: 1,
      name: 'Partner One',
      money: '29,000'
    },
    {
      key: 2,
      name: 'Partner Two',
      money: '25,000'
    }, {
      key: 3,
      name: 'Partner Three',
      money: '25,000'
    }
  ]

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <Typography variant='h6'>Top Client by Total Revenue</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
          <Box sx={{
            color: '#15315E',
            background: '#15315E',
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            padding: '4px'
          }}>
            <Typography sx={{ color: '#FFF', fontSize: '16px', fontWeight: '600' }}>
              Client
            </Typography>
            <Typography sx={{ color: '#FFF', fontSize: '16px', fontWeight: '600' }}>
              Revenue
            </Typography>
          </Box>

          {
            TotalRevenueData?.map((item, index) => {
              if (index < 3) {
                return (
                  <>
                    <Box key={item?.companyId} sx={{
                      background: '#E4F1FF',
                      display: 'flex',
                      justifyContent: 'space-around',
                      width: '100%',
                      padding: '4px'
                    }}>
                      <Typography sx={{ color: '#15315E', fontSize: '16px', fontWeight: '400' }}>
                        #{index + 1} {item?.Company?.name}
                      </Typography>
                      <Typography sx={{ color: '#15315E', fontSize: '16px', fontWeight: '400' }}>
                        ₹ {item?.totalAmount}
                      </Typography>
                    </Box>
                  </>
                )
              }
            })
          }
        </Box>
      </CardContent>
    </Card >
  )
}

export default TotalRevenueTable
