// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { LoadingButton } from '@mui/lab'
import { FormHelperText } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { setAuthToken } from 'src/redux/reducers/authSlice'
import { useInviteeSetPassword } from 'src/shared/utility/services/hooks/register'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

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

const InvitePage = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const pathUrl = router.asPath
  const dispatch = useDispatch()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .matches(/^[^\s]+$/, 'Password must not contain whitespace') // Add this rule to disallow whitespace
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/, 'Password must contain at least one number')
        .matches(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
        .min(8, 'Password must be at least 8 characters long'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),

    onSubmit: values => {
      const { confirm_password, ...formValues } = values
      setInviteePassword(formValues)
    }
  })

  const {
    data: setInviteePasswordData,
    isLoading: setInviteePasswordLoading,
    isError: setInviteePasswordIsError,
    error: setInviteePasswordError,
    mutate: setInviteePassword
  } = useInviteeSetPassword()

  useEffect(() => {
    if (pathUrl) {
      const splitUrl = pathUrl.split('?')
      if (splitUrl.length > 1) {
        dispatch(setAuthToken(splitUrl?.[1].slice(0, -1)))
      } else {
        // redirect to login  page with notistack not token found
        enqueueSnackbar('No Token Found..!', { variant: 'error' })
        router.push('/login')
      }
    }
  }, [])

  useEffect(() => {
    try {
      if (setInviteePasswordData && !setInviteePasswordLoading) {
        enqueueSnackbar(setInviteePasswordData.message, { variant: 'success' })
        router.push('/login')
      }
      if (setInviteePasswordIsError) {
        enqueueSnackbar(setInviteePasswordError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [setInviteePasswordData, setInviteePasswordLoading, setInviteePasswordIsError])

  return (
    <Box className='content-center' sx={{ position: 'relative', paddingTop: '80px !important' }}>
      <Card sx={{ padding: '10px' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please register to your account and start the profit</Typography>
          </Box>
          <form autoComplete='off' onSubmit={formik.handleSubmit}>
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
                    <IconButton edge='end' onClick={handleClickShowPassword} aria-label='toggle password visibility'>
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
              <InputLabel htmlFor='auth-register-confirm_password'>Confirm Password</InputLabel>
              <OutlinedInput
                label='Confirm Password'
                id='auth-register-confirm_password'
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirm_password'
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && formik.errors.confirm_password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      aria-label='toggle password visibility'
                    >
                      {showConfirmPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <FormHelperText error id='accountId-error'>
                  {formik.errors.confirm_password}
                </FormHelperText>
              )}
            </FormControl>
            <LoadingButton
              fullWidth
              size='large'
              disabled={setInviteePasswordData ? true : false}
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={setInviteePasswordLoading}
            >
              Register
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
InvitePage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default InvitePage
