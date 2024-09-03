import {} from 'react'
import { Typography, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const LoginRedirection = ({ handleOKButtonClick }) => {
  const handlePopUpClose = () => {
    handleOKButtonClick()
  }

  return (
    <div>
      <div>
        <Typography sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }} variant='body'>
          Thank you for registering with Insightifi. You will soon receive approval from Super Admin and will be able to
          log in to your dashboard.
        </Typography>

        <Grid style={{ display: 'flex', gap: 25, justifyContent: 'space-around', paddingTop: '20px' }}>
          <LoadingButton fullWidth size='large' onClick={handlePopUpClose} variant='contained' sx={{ marginBottom: 7 }}>
            Close
          </LoadingButton>
        </Grid>
      </div>
    </div>
  )
}

export default LoginRedirection
