import {} from 'react'
import { Typography, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'

function DeletePopUp({ popup, deletePowerBiLoading, handleDeleteClientPowerBi, handlePopUpClose }) {
  return (
    <div>
      <div>
        <hr style={{ marginBottom: '20px' }}></hr>
        <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant='body'>
          Are You Sure You Want to Delete This PowerBi Client?
        </Typography>
        <hr style={{ marginBottom: '2rem', marginTop: '20px' }}></hr>

        <Grid style={{ display: 'flex', gap: 25, justifyContent: 'space-around', paddingTop: '20px' }}>
          <LoadingButton
            size='large'
            fullWidth
            type='submit'
            variant='contained'
            sx={{ marginBottom: 7 }}
            loading={deletePowerBiLoading}
            onClick={() => handleDeleteClientPowerBi()}
          >
            {popup}
          </LoadingButton>
          <LoadingButton fullWidth size='large' onClick={handlePopUpClose} variant='outlined' sx={{ marginBottom: 7 }}>
            Cancel
          </LoadingButton>
        </Grid>
      </div>
    </div>
  )
}

export default DeletePopUp
