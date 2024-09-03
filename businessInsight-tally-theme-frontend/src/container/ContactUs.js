import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, TextField, Typography, FormHelperText } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useContactUs } from 'src/shared/utility/services/hooks/register'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import styles from '../../styles/comonView.module.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import GetInTouch from '../../src/assets/images/getInTouch.svg'
import Image from 'next/image'
import circle1 from '../../src/assets/images/contactCircle.svg'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedIn from '@mui/icons-material/LinkedIn'

import { useTheme } from '@emotion/react'

const ContactUs = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('email') || '',
      firstName: '',
      lastName: '',
      message: '',
      phoneNumber: '',
      company: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .required('Email is Required'),
      firstName: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('Required'),
      lastName: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Last Name must contain only alphabetic characters')
        .min(2, 'Last Name must be at least two characters long')
        .max(50, 'Last Name must be at most 50 characters long')
        .required('Required'),
      message: Yup.string()
        .trim()
        .min(10, 'Message must be at least 10 characters long')
        .max(500, 'Message must be at most 500 characters long')
        .required('Message is Required'),
      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .optional(),
      company: Yup.string().required('Company Name Required')
    }),
    onSubmit: values => {
      // Optional: Clean up values
      values.firstName = values.firstName.replace(/\s+/g, ' ').trim()
      values.lastName = values.lastName.replace(/\s+/g, ' ').trim()
      values.message = values.message.replace(/\s+/g, ' ').trim()
      values.company = values.company.replace(/\s+/g, ' ').trim()

      ContactUSMutate(values)
    }
  })

  const {
    data: ContactUSData,
    isLoading: ContactUSLoading,
    isError: ContactUSIsError,
    error: ContactUSError,
    mutate: ContactUSMutate
  } = useContactUs()

  useEffect(() => {
    if (ContactUSData && !ContactUSLoading) {
      enqueueSnackbar(ContactUSData?.message, { variant: 'success' })
      router.push('/dashboard')
    }
    if (ContactUSIsError) {
      enqueueSnackbar(ContactUSError?.response?.data?.message, { variant: 'error' })
    }
  }, [ContactUSData, ContactUSLoading, ContactUSIsError])

  const contactUSForm = () => {
    return (
      <>
        <Box
          sx={{
            display: { md: 'grid', sm: 'grid', xs: 'flex' },
            gap: { xs: 5, md: 2 },
            gridTemplateColumns: { sm: '1fr 1.2fr', md: '1.5fr 1fr' },
            maxWidth: 900,
            margin: '0 auto',
            padding: 3,
            borderRadius: 2,
            flexDirection: 'column-reverse'
          }}
        >
          <Box
            sx={{
              padding: { md: '0px 50px' },
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ mt: 6, margin: { sm: '20px' }, position: 'relative' }}>
              <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  label='First Name'
                  size='small'
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  helperText={formik.touched.firstName && formik.errors.firstName && formik.errors.firstName}
                  error={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  size='small'
                  label='Last Name'
                  name='lastName'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  helperText={formik.touched.lastName && formik.errors.lastName && formik.errors.lastName}
                  error={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  size='small'
                  label='Email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && !!formik.errors.email}
                />
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  size='small'
                  label='Phone Number'
                  name='phoneNumber'
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                />
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  size='small'
                  label='Company Name'
                  name='company'
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  helperText={formik.touched.company && formik.errors.company}
                  error={formik.touched.company && !!formik.errors.company}
                />
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  size='small'
                  label='Message'
                  name='message'
                  value={formik.values.message.trimStart()}
                  onChange={formik.handleChange}
                  helperText={formik.touched.message && formik.errors.message}
                  multiline
                  minRows={4}
                  maxRows={8}
                  error={formik.touched.message && !!formik.errors.message}
                />

                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{
                    marginBottom: 7,
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    marginBottom: '50px',
                    width: '150px'
                  }}
                  loading={ContactUSLoading}
                  className={styles.btn}
                >
                  Submit
                </LoadingButton>
                <Box sx={{ position: 'relative', display: { md: 'block', sm: 'block', xs: 'none' } }}>
                  <Image
                    src={GetInTouch}
                    alt='Get In Touch'
                    objectFit='cover'
                    priority
                    objectPosition='center'
                    style={{
                      position: 'absolute',
                      bottom: '-60px',
                      left: '150px',
                      zIndex: 0
                    }}
                  />
                </Box>
              </form>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              flexDirection: 'column',
              borderRadius: 2,
              padding: { md: '10px 10px 10px 40px', sm: '10px 10px 10px 10px', xs: '10px 10px 10px 10px' },
              position: 'relative',
              display: 'flex'
            }}
          >
            <div style={{ color: 'white', flexGrow: 1, zIndex: 1, position: 'relative' }}>
              <div>
                <Typography
                  variant='h6'
                  color={'white'}
                  fontSize={{
                    xs: '18px',
                    sm: '18px',
                    md: '24px'
                  }}
                  style={{
                    padding: '0px',
                    marginBottom: '0px'
                  }}
                >
                  Contact Information
                </Typography>
                <p style={{ color: '#C9C9C9', margin: '0px 0px 50px 0px', fontSize: '14px' }}>
                  Say something to start a live chat!
                </p>
              </div>
              <div className={styles.containerAlignCenter}>
                <CallIcon />
                <div style={{ paddingLeft: '15px' }}>+91 70431 22287</div>
              </div>
              <div className={styles.containerAlignCenter} style={{ paddingTop: '10px' }}>
                <EmailIcon />
                <div style={{ paddingLeft: '15px' }}>info@insightifi.in</div>
              </div>
              <div style={{ display: 'flex', marginTop: '20px', fontSize: '14px' }}>
                <LocationOnIcon />
                <div style={{ paddingLeft: '15px' }}>
                  401, Shivalik 5, Mahalaxmi Cross Roads, Paldi Ahmedabad , Gujarat, India – 380007.
                </div>
              </div>
            </div>
            <Box
              sx={{
                color: 'white',
                gap: { sm: '10px', xs: '10px', md: '20px' },
                display: 'flex',
                paddingTop: { xs: '25px' }
              }}
            >
              <div className={styles.footerRightList} style={{ color: 'white' }}>
                <FacebookIcon className={styles.footerRightIconSize} />
              </div>
              <div className={styles.footerRightList} style={{ color: 'white' }}>
                <TwitterIcon className={styles.footerRightIconSize} />
              </div>
              <div className={styles.footerRightList} style={{ color: 'white' }}>
                <LinkedIn className={styles.footerRightIconSize} />
              </div>
              <Image
                src={circle1}
                alt='clientsIcon'
                style={{
                  position: 'absolute',
                  bottom: '0%',
                  right: '0%',
                  zIndex: 0
                }}
              />
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <div className={styles.contactUS}>
        <div className={styles.section2DivLogin}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.ContactUsDivBlock}>
              <div className={styles.containerAlignCenter} style={{ flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 1.5, fontFamily: 'Poppins' }}>
                  Get In Touch
                </Typography>
                <Typography variant='body2' sx={{ marginBottom: 4, fontFamily: 'Poppins', textAlign: 'center' }}>
                  Any question or remarks? Just write us a message!
                </Typography>
              </div>
              <div className={styles.ContactUsDiv}>{contactUSForm()}</div>
            </div>
          </div>
        </div>
      </div>
      <FooterNoAuth />
    </>
  )
}

ContactUs.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ContactUs
