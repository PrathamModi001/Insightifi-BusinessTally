// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'

import commonVector1 from '../../assets/images/commonVector1.svg'
import Kundu from '../../assets/images/Kundu.svg'
import InsightifiLogo from '../../assets/images/InsightifiLogo.svg'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import styles from '../../../styles/comonView.module.css'

// ** Icons Imports
import CloseIcon from '@mui/icons-material/Close'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import { useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { selectUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'

// ** Demo Imports
import { LoadingButton } from '@mui/lab'
import { FormHelperText, Modal } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { setAuthToken } from 'src/redux/reducers/authSlice'
import { useGetCompany, useLogin, useUserMe } from 'src/shared/utility/services/hooks/register'

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
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false)
  const [checkRememberMe, setCheckRememberMe] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [forceLogout, setForceLogout] = useState(false)
  const [sessionExists, setSessionExists] = useState(false)

  // ** Hook
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  ////////////// Remember functionality ///////////////

  const rememberMe = () => {
    setCheckRememberMe(!checkRememberMe)
  }

  const handleCloseModal = () => {
    setSessionExists(false)
    setForceLogout(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('checked')
    setForceLogout(true)
    formik.handleSubmit()
  }

  const setRemember = () => {
    if (checkRememberMe) {
      localStorage.setItem('email', formik?.values?.email)
      localStorage.setItem('password', formik?.values?.password)
      localStorage.setItem('checked', true)
    } else {
      localStorage.removeItem('email')
      localStorage.removeItem('password')
      localStorage.removeItem('checked')
    }
  }

  // useEffect(() => {
  // const rememberMeChecked = localStorage.getItem('checked');
  // if (rememberMeChecked === 'true') {
  //   setCheckRememberMe(true);
  // }
  // }, [])

  ///////////////////////////////////////////

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .required('Required'),
      password: Yup.string()
        .required('Required')
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/, 'Password must contain at least one number')
        .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long')
    }),
    onSubmit: values => {
      if (forceLogout) {
        values.forceLogout = true
        console.log(values)
        login(values)
      } else {
        login(values)
      }
    }
  })

  const {
    data: companyData,
    isLoading: companyLoading,
    isError: companyIsError,
    error: companyError,
    mutate: company
  } = useGetCompany()

  const {
    data: userMeData,
    isLoading: userMeLoading,
    isError: userMeIsError,
    error: userMeError,
    mutate: userMe
  } = useUserMe()

  useEffect(() => {
    try {
      if (userMeData && !userMeLoading) {
        const unAuthUser = [userRole?.superAdmin, userRole?.organizationAdmin, userRole?.organizationEmployee]

        if (user.role === userRole?.superAdmin) {
          router.push('/users')
        } else {
          router.push('/dashboard')
        }

        if (!unAuthUser?.includes(user?.role)) {
          company()
        }

        if (user?.demo) {
          enqueueSnackbar(
            <div>
              <div>You are using Demo Account Right Now.</div>
            </div>,
            {
              variant: 'info',
              autoHideDuration: null,
              action: key => (
                <div>
                  <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => closeSnackbar(key)} />
                </div>
              ),
              style: {
                backgroundColor: 'info',
                color: '#FFFFFF'
              }
            }
          )
        }
      }
    } catch (err) {
      console.log('err', err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMeData, userMeLoading, userMeIsError])

  const {
    data: loginData,
    isLoading: loginLoading,
    isError: loginIsError,
    error: loginError,
    mutate: login
  } = useLogin()

  useEffect(() => {
    try {
      if (loginData && !loginLoading) {
        userMe()
        dispatch(setAuthToken(loginData?.data?.token))

        enqueueSnackbar(loginData?.message, { variant: 'success' })
      }
      if (loginIsError) {
        if (loginError?.response?.data?.data) {
          setSessionExists(true)
        } else if (loginError?.response?.data?.message) {
          enqueueSnackbar(loginError?.response?.data?.message, { variant: 'error' })
        }
      }
    } catch (err) {
      console.log('err', err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, loginLoading, loginIsError])

  const LoginForm = () => {
    return (
      <div>
        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={InsightifiLogo} alt='commonVector2' />
        </Box>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant='h5'
            sx={{ fontWeight: 600, marginBottom: 1.5, display: 'flex', justifyContent: 'center' }}
          >
            Welcome to {themeConfig.templateName}!
          </Typography>
          <Typography variant='body2'>Please sign-in to your account and start the profit</Typography>
        </Box>
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ marginBottom: 4 }}
            type='text'
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
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              ':hover': {
                cursor: 'pointer',
                fontWeight: 'bold'
              }
            }}
          >
            <Link passHref href='/forgot-password'>
              <LinkStyled className={styles.orangeColor}>Forgot Password?</LinkStyled>
            </Link>
          </Box>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ marginBottom: 7 }}
            loading={loginLoading}

            // className={styles.submitBtn}
          >
            Login
          </LoadingButton>

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
      </div>
    )
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.section1DivLogin}>
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
            <div className={styles.centerBlockDiv}>
              <div className={styles.formBlockDiv}>{LoginForm()}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={sessionExists} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant='h6' component='h2'>
            Session Exists
          </Typography>
          <Typography sx={{ mt: 2 }}>A session already exists.Do you want to logout all sessions?</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton onClick={handleLogout} variant='contained'>
              Yes
            </LoadingButton>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton onClick={handleCloseModal} variant='contained'>
              Close
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
