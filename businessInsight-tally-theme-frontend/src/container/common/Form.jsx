import React from 'react'

const Form = ({ autoComplete = 'off', onSubmit, children, ...props }) => {
  return (
    <form {...props} autoComplete={autoComplete} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
