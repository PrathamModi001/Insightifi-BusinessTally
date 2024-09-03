import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)({
  backgroundColor: '#282F78',
  color: '#FFFFFF', // Text color
  '&:hover': {
    backgroundColor: '#1A246B'
  },
  textTransform: 'none',
  borderRadius: '4px',
  padding: '8px 24px'
})

const CustomButton = ({ children, type = 'button', ...props }) => {
  return (
    <StyledButton type={type} variant='contained' {...props}>
      {children}
    </StyledButton>
  )
}

export default CustomButton
