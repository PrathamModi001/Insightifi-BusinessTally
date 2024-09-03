// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** MUI Components
import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import {
  useUserForgotPassword,
  useUserUpdateForgotPassword,
  useUserVerifyOtp
} from 'src/shared/utility/services/hooks/register'
import styles from '../../../styles/comonView.module.css'
import InsightifiLogo from '../../assets/images/InsightifiLogo.svg'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Kundu from '../../assets/images/Kundu.svg'
import commonVector1 from '../../assets/images/commonVector1.svg'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Demo Imports
import { useSnackbar } from 'notistack'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ForgotPasswordPage = () => {
  const inputRefs = useRef([])
  const { enqueueSnackbar } = useSnackbar()

  // ** State
  const [viewMode, setViewMode] = useState('email')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const {
    data: setUserForgotPasswordData,
    isLoading: setUserForgotPasswordLoading,
    isError: setUserForgotPasswordIsError,
    error: setUserForgotPasswordError,
    mutate: setUserForgotPassword
  } = useUserForgotPassword()

  const {
    data: setUserVerifyOtpData,
    isLoading: setUserVerifyOtpLoading,
    isError: setUserVerifyOtpIsError,
    error: setUserVerifyOtpError,
    mutate: setUserVerifyOtp
  } = useUserVerifyOtp()

  const {
    data: setUserUpdateForgotPasswordData,
    isLoading: setUserUpdateForgotPasswordLoading,
    isError: setUserUpdateForgotPasswordIsError,
    error: setUserUpdateForgotPasswordError,
    mutate: setUserUpdateForgotPassword
  } = useUserUpdateForgotPassword()

  ///////// Formik Validation ////////
  const formik = useFormik({
    initialValues: {
      email: '' // Add email field
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .required('Email is required')
    }),
    onSubmit: values => {
      setUserForgotPassword(values)
    }
  })

  const formikPassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .matches(/^[^\s]+$/, 'Password must not contain whitespace') // Add this rule to disallow whitespace
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/, 'Password must contain at least one number')
        .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: values => {
      // Remove confirmPassword field from values
      const { confirmPassword, ...formValues } = values
      setUserUpdateForgotPassword({
        email: formik.values.email,
        otp: parseInt(otp),
        newPassword: formValues.password
      })
    }
  })

  //////// Handle OTP ////////
  const handleOtpInputChange = index => e => {
    const value = e.target.value

    // Allow only numbers
    if (!/^[0-9]*$/.test(value)) return

    // Handle backspace key press
    if (e.nativeEvent.inputType === 'deleteContentBackward' && index > 0 && !value) {
      // Focus the previous input field
      inputRefs.current[index - 1].focus()

      return
    }

    setOtp(prevOtp => {
      const newOtp = [...prevOtp]
      newOtp[index] = value

      return newOtp.join('') // Join the array elements into a single string
    })

    if (value && index < inputRefs.current.length - 1) {
      // Focus the next input field
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = e => {
    e.preventDefault()
    const clipboardData = e.clipboardData.getData('text/plain').trim()
    const otpArray = clipboardData.split('').slice(0, 6)
    const otpString = otpArray.join('')
    setOtp(otpString)
  }

  const handleSubmitOtp = () => {
    if (otp.length === 6) {
      setUserVerifyOtp({
        email: formik.values.email,
        otp: parseInt(otp)
      })
    }
  }

  // Handle New Password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // Handle Confirm New Password
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleResendOtp = () => {
    setUserForgotPassword({ email: formik.values.email })
  }

  useEffect(() => {
    try {
      if (setUserForgotPasswordData && !setUserForgotPasswordLoading) {
        enqueueSnackbar(setUserForgotPasswordData?.message, { variant: 'success' })
        setViewMode('otp')
      }
      if (setUserForgotPasswordIsError) {
        enqueueSnackbar(setUserForgotPasswordError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [setUserForgotPasswordData, setUserForgotPasswordLoading, setUserForgotPasswordIsError])

  useEffect(() => {
    try {
      if (setUserVerifyOtpData && !setUserVerifyOtpLoading) {
        enqueueSnackbar(setUserVerifyOtpData?.message, { variant: 'success' })
        setViewMode('changePassword')
      }
      if (setUserVerifyOtpIsError) {
        enqueueSnackbar(setUserVerifyOtpError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [setUserVerifyOtpData, setUserVerifyOtpLoading, setUserVerifyOtpIsError])

  useEffect(() => {
    try {
      if (setUserUpdateForgotPasswordData && !setUserUpdateForgotPasswordLoading) {
        enqueueSnackbar(setUserUpdateForgotPasswordData?.message, { variant: 'success' })
        router.push('/login')
      }
      if (setUserUpdateForgotPasswordIsError) {
        enqueueSnackbar(setUserUpdateForgotPasswordError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [setUserUpdateForgotPasswordData, setUserUpdateForgotPasswordLoading, setUserUpdateForgotPasswordIsError])

  const forgotPasswordForm = () => {
    return (
      <div>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={InsightifiLogo} alt='commonVector2' />
        </Box>
        {viewMode === 'email' && (
          <>
            {/* Email Section */}
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Forgot your password?
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                label='Email'
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && formik.errors.email}
                sx={{ marginBottom: 4 }}
              />

              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type='submit'

                // className={styles.submitBtn}
              >
                Submit
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  New on our platform?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/register'>
                    <LinkStyled className={styles.orangeColor} sx={{ fontWeight: 600 }}>
                      Create an account
                    </LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          </>
        )}

        {viewMode === 'otp' && (
          <>
            {/* OTP Section */}
            <Typography
              sx={{
                marginBottom: 4
              }}
            >
              Pleases check your mail for OTP
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2
              }}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <TextField
                  key={index}
                  inputRef={el => (inputRefs.current[index] = el)}
                  type='text'
                  variant='outlined'
                  value={otp[index] || ''}
                  onChange={handleOtpInputChange(index)}
                  onPaste={handlePaste}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center'
                    }
                  }}
                  sx={{ flex: 1 }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7, marginTop: 7 }}
              onClick={() => handleSubmitOtp()}
            >
              Submit
            </Button>
            <Typography
              sx={{
                marginRight: 2,
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box
                onClick={() => handleResendOtp()}
                sx={{
                  color: 'royalblue',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '15px',
                  paddingBottom: '1px',
                  '&:hover': {
                    paddingBottom: '0px',
                    borderBottom: '1px solid royalblue'
                  }
                }}
              >
                Resend OTP
              </Box>
            </Typography>
          </>
        )}

        {viewMode === 'changePassword' && (
          <>
            {/* Change Password Section */}
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Change your password
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={formikPassword.handleSubmit}>
              <Grid item xs={12} sx={{ marginTop: 6, marginBottom: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    name='password'
                    value={formikPassword.values.password}
                    id='account-settings-new-password'
                    onChange={formikPassword.handleChange}
                    type={showPassword ? 'text' : 'password'}
                    error={formikPassword.touched.password && formikPassword.errors.password}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          aria-label='toggle password visibility'
                        >
                          {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formikPassword.touched.password && formikPassword.errors.password && (
                    <FormHelperText error id='accountId-error'>
                      {formikPassword.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginBottom: 7 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm Password</InputLabel>
                  <OutlinedInput
                    label='Confirm Password'
                    name='confirmPassword'
                    value={formikPassword.values.confirmPassword}
                    id='account-settings-confirm-new-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={formikPassword.handleChange}
                    error={formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword && (
                    <FormHelperText error id='accountId-error'>
                      {formikPassword.errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type='submit'

                // className={styles.submitBtn}
              >
                Submit
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  New on our platform?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/register'>
                    <LinkStyled className={styles.orangeColor}>Create an account</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.section1Div}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.containerCommonBlockSpace}>
              <div className={styles.containerCommonBlock}>
                <div className={styles.commonBlock1}>
                  <Image src={commonVector1} alt='commonVector1' />
                </div>
                <div className={styles.commonBlock2}>
                  <Image src={Kundu} alt='Kundu' />
                </div>
              </div>
            </div>
            <div className={`${styles.centerBlockDiv} ${styles.forgotPasswordBlock}`}>
              <div className={styles.formBlockDiv}>{forgotPasswordForm()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
ForgotPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordPage
