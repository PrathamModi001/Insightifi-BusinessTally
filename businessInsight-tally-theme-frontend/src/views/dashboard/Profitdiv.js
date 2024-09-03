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

const Profitdiv = ({ ProfitDivData }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <Typography variant='h6'>Net Profit till date</Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'baseline', gap: '15px' }}>
          <Typography sx={{ color: 'primary.main', fontSize: '16px', fontWeight: '600' }}>
            INR
          </Typography>
          <Typography sx={{ color: 'primary.main', fontSize: '50px', fontWeight: '600' }}>
            {ProfitDivData?.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'baseline', gap: '35px' }}>
          <Typography sx={{ color: 'primary.main', fontSize: '16px', fontWeight: '600' }}>
            and counting...
          </Typography>
        </Box>
      </CardContent>
    </Card >
  )
}

export default Profitdiv
