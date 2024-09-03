import React from 'react'
import { TextField, Box, IconButton } from '@mui/material'
import { useSnackbar } from 'notistack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

function SourcePopUp() {
  const { enqueueSnackbar } = useSnackbar()

  const handleCopy = () => {
    navigator.clipboard
      .writeText('https://example.com')
      .then(() => {
        enqueueSnackbar('Link copied', { variant: 'success' })
      })
      .catch(err => {
        enqueueSnackbar('Link not copied', { variant: 'error' })
      })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '2rem', gap: '10px' }}>
      <TextField type='text' value='https://example.com' sx={{ height: '30px' }} InputProps={{ readOnly: true }} />
      <IconButton color='primary' sx={{ paddingTop: '28px' }} onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
    </Box>
  )
}

export default SourcePopUp
