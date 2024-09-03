import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Card } from 'mdi-material-ui'
import { useTheme } from '@mui/material/styles'

export const CustomModal = ({ open, onClose, children, header }) => {
  const theme = useTheme()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'block',
    padding: '20px',
    [theme.breakpoints.down(570)]: {
      width: '90%'
    }
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            paddingBottom: '10px'
          }}
        >
          <IconButton
            size='small'
            aria-label='settings'
            className='card-more-options'
            sx={{ color: 'text.secondary' }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          sx={{
            padding: '0 2rem',
            [theme.breakpoints.down(475)]: {
              padding: '0px !important'
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  )
}
