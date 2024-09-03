// ** MUI Imports
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import clientsIcon from 'src/assets/images/clientsIcon.svg'

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

const ClientOnboard = ({ ClientOnboardData }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ padding: '10px' }}>
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <Typography variant='h6'>Client Onboard</Typography>
          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
            Active & Inactive
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'baseline', gap: '35px' }}>
          <Typography sx={{ color: 'primary.main', fontSize: '50px', fontWeight: '600' }}>
            {ClientOnboardData}
          </Typography>
          <Image src={clientsIcon} alt='clientsIcon' />
        </Box>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
      </CardContent>
    </Card >
  )
}

export default ClientOnboard
