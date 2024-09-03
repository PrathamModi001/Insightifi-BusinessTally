import { TextField } from '@mui/material'
import React from 'react'

const InputField = ({ type = 'text', formikData, name, label, ...props }) => {
  return (
    <TextField
      fullWidth
      type={type}
      sx={{ marginBottom: 4 }}
      label={label}
      name={name}
      value={formikData?.values?.[name]}
      onChange={formikData.handleChange}
      helperText={formikData?.touched[name] && formikData?.errors?.[name] && formikData?.errors?.[name]}
      error={formikData?.touched?.[name] && formikData?.errors?.[name]}
      {...props}
    />
  )
}

export default InputField
