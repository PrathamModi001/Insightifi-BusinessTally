// ** React Imports
import { useFormik } from 'formik'
import { Fragment, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import styles from '../../../styles/comonView.module.css'
import InsightifiLogo from '../../assets/images/InsightifiLogo.svg'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Kundu from '../../assets/images/Kundu.svg'
import commonVector1 from '../../assets/images/commonVector1.svg'
import {} from 'src/@core/components/modal'

// ** Configs
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { FormHelperText } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useSignup, useVerifyEmail } from 'src/shared/utility/services/hooks/register'
import LoginRedirection from './ModalsContent/LoginRedirection'

import { CustomModal } from 'src/@core/components/modal'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const inputRefs = useRef([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [viewMode, setViewMode] = useState('signup') // ['signup','otp'
  const { enqueueSnackbar } = useSnackbar()
  const [otp, setOtp] = useState('')

  const [modalOpen, setModalOpen] = useState(false)

  // ** Hook
  const theme = useTheme()

  const router = useRouter()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const {
    data: signupData,
    isLoading: signupLoading,
    isError: signupIsError,
    error: signupError,
    mutate: signup
  } = useSignup()

  useEffect(() => {
    try {
      if (signupData && !signupLoading) {
        enqueueSnackbar(signupData?.message, { variant: 'success' })
        setViewMode('otp')
      }
      if (signupIsError) {
        enqueueSnackbar(signupError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupData, signupLoading, signupIsError])

  const {
    data: verifyEmailData,
    isLoading: verifyEmailLoading,
    isError: verifyEmailIsError,
    error: verifyEmailError,
    mutate: verifyEmail
  } = useVerifyEmail()

  useEffect(() => {
    if (verifyEmailData && !verifyEmailLoading) {
      enqueueSnackbar(verifyEmailData?.message, { variant: 'success' })
      handleConfirmationPopUp()
    }
    if (verifyEmailIsError) {
      enqueueSnackbar(verifyEmailError?.response?.data?.message, { variant: 'error' })
    }
  }, [verifyEmailData, verifyEmailLoading, verifyEmailIsError])

  const handlePopUpClose = () => {
    setModalOpen(false)
    router.push('/login')
  }

  const handleConfirmationPopUp = () => {
    setModalOpen(true)
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      mobileNo: '',
      email: '',
      role: 'organizationAdmin',
      password: '',
      confirmPassword: '',
      iAgree: false
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .trim()
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('First name is required'),
      lastname: Yup.string()
        .trim()
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Last name must contain only alphabetic characters')
        .min(2, 'Last name must be at least two characters long')
        .max(50, 'Last name must be at most 50 characters long')
        .required('Last name is required'),
      mobileNo: Yup.string()
        .matches(/^(?!(.)\1+$)\d+$/, 'Invalid phone number')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .matches(/^[^A-Z]*$/, 'Please enter a valid email address')
        .required('Email is required'),
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
        .required('Confirm Password is required'),
      iAgree: Yup.boolean()
        .oneOf([true], 'You must agree to terms and conditions')
        .required('You must agree to terms and conditions')
    }),
    onSubmit: values => {
      values.firstname = values.firstname.replace(/\s+/g, ' ').trim()
      values.lastname = values.lastname.replace(/\s+/g, ' ').trim()
      const { confirmPassword, ...signupData } = values

      if (signupData.mobileNo === '') {
        const { mobileNo, ...rest } = signupData
        signup(rest)
      } else {
        signup(signupData)
      }
    }
  })

  const handleOtpInputChange = index => e => {
    const value = e.target.value

    // Allow only numbers
    if (!/^[0-9]*$/.test(value)) return

    if (e.nativeEvent.inputType === 'deleteContentBackward' && index > 0 && !value) {
      // Focus the previous input field
      inputRefs.current[index - 1].focus()

      return
    }

    setOtp(prevOtp => {
      const newOtp = [...prevOtp]
      newOtp[index] = value

      return newOtp.join('')
    })

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleResendOtp = () => {
    const { confirmPassword, ...signupData } = formik.values

    if (signupData.mobileNo === '') {
      const { mobileNo, ...rest } = signupData
      signup(rest)
    } else {
      signup(signupData)
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
      verifyEmail({
        email: formik.values.email,
        otp: parseInt(otp)
      })
    }
  }

  const registerForm = () => {
    return (
      <div>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={InsightifiLogo} alt='commonVector2' />
        </Box>

        {viewMode === 'signup' && (
          <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              sx={{ marginBottom: 4 }}
              type='text'
              label='First Name'
              name='firstname'
              value={formik.values.firstname}
              onChange={formik.handleChange}
              helperText={formik.touched.firstname && formik.errors.firstname && formik.errors.firstname}
              error={formik.touched.firstname && formik.errors.firstname}
            />
            <TextField
              fullWidth
              sx={{ marginBottom: 4 }}
              type='text'
              label='Last Name'
              name='lastname'
              value={formik.values.lastname}
              onChange={formik.handleChange}
              helperText={formik.touched.lastname && formik.errors.lastname && formik.errors.lastname}
              error={formik.touched.lastname && formik.errors.lastname}
            />
            <TextField
              fullWidth
              sx={{ marginBottom: 4 }}
              type='text'
              label='Phone'
              name='mobileNo'
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              helperText={formik.touched.mobileNo && formik.errors.mobileNo && formik.errors.mobileNo}
              error={formik.touched.mobileNo && formik.errors.mobileNo}
            />
            <TextField
              fullWidth
              sx={{ marginBottom: 4 }}
              type='email'
              label='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email && formik.errors.email}
              error={formik.touched.email && formik.errors.email}
            />
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                id='auth-register-password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error id='accountId-error'>
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-confirm-password'>Confirm Password</InputLabel>
              <OutlinedInput
                label='Confirm Password'
                id='auth-confirm-password'
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      aria-label='toggle confirm password visibility'
                    >
                      {showConfirmPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <FormHelperText error id='confirm-password-error'>
                  {formik.errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>

            <FormControlLabel
              control={<Checkbox />}
              name='iAgree'
              checked={formik.values.iAgree}
              sx={{ marginBottom: 0 }}
              onChange={() => formik.setFieldValue('iAgree', !formik.values.iAgree)}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link passHref href='/terms-conditions'>
                    <LinkStyled className={styles.orangeColor}>privacy policy & terms</LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            {formik.touched.iAgree && formik.errors.iAgree && (
              <FormHelperText error id='accountId-error' sx={{ marginBottom: 4 }}>
                {formik.errors.iAgree}
              </FormHelperText>
            )}
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={signupLoading}
            >
              Sign up
            </LoadingButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Already have an account?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/login'>
                  <LinkStyled className={styles.orangeColor} sx={{ fontWeight: 600 }}>
                    Sign in instead
                  </LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        )}
        {viewMode === 'otp' && (
          <form autoComplete='off'>
            <Box>
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
                  marginBottom: 4,
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
            </Box>

            <LoadingButton
              fullWidth
              size='large'
              onClick={handleSubmitOtp}
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={verifyEmailLoading}
            >
              Verify Email
            </LoadingButton>
            <Typography
              sx={{
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Box
                onClick={() => handleResendOtp()}
                sx={{
                  color: 'royalblue',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  fontSize: '15px',
                  paddingBottom: '1px'
                }}
              >
                Resend OTP
              </Box>
              <Typography gap={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                Do you think that was a mistake?
                <Link onClick={() => setViewMode('signup')} passHref href='/register'>
                  <LinkStyled sx={{ color: 'royalblue' }}>Sign up</LinkStyled>
                </Link>
              </Typography>
            </Typography>
          </form>
        )}
        {modalOpen && (
          <CustomModal open={modalOpen} onClose={handlePopUpClose} sx={{ width: '600px !important' }}>
            <LoginRedirection handleOKButtonClick={handlePopUpClose} />
          </CustomModal>
        )}
      </div>
    )
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.section1DivSignup}>
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
            <div className={`${styles.centerBlockDivSignup} ${viewMode === 'otp' && styles.registerOtpBox}`}>
              <div className={`${styles.formBlockDiv}`}>{registerForm()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
