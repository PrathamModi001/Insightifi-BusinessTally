import { Typography, Box } from '@mui/material'
import React from 'react'
import Form from './common/Form'
import InputField from './common/InputField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import styles from '../../styles/comonView.module.css'
import CustomButton from './common/Button'
import DatePickerComp from './common/DatePicker'
import { regexCode } from 'src/shared/utility/regexCode'
import circleIcon from '../../src/assets/images/intersectCircle.svg'
import Image from 'next/image'
import { useRequestUs } from 'src/shared/utility/services/hooks/register'
import useNotification from 'src/@core/hooks/useNotification'
import { dateFormat } from 'src/@core/layouts/utils'
import DatePickerComponent from './common/DatePicker'

const RequestUs = () => {
  const {
    data: requestUsData,
    isLoading: requestUsLoading,
    isError: requestUsIsError,
    error: requestUsError,
    mutate: requestUsMutate
  } = useRequestUs()
  useNotification(requestUsData, requestUsLoading, requestUsIsError, requestUsError)

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      company_name: '',
      phone: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      name: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(regexCode.alphbetOnly, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('Please enter the name'),
      company_name: Yup.string().required('Company name is required'),
      phone: Yup.string()
        .matches(regexCode.onlyNumber, 'Phone number must contain only digits')
        .required('Phone number is required'),
      date: Yup.string().required('Date is required')
    }),
    onSubmit: values => {
      const body = {
        ...values,
        date: dateFormat(values.date)
      }
      requestUsMutate(body)
    }
  })

  return (
    <>
      <div className={styles.contactUS}>
        <div className={styles.sectionRequestUs}>
          <div className={styles.containerBlockCenter}>
            <div className={styles.requestUsDivBlock}>
              <div className={styles.requestUsDiv}>
                <div>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      marginBottom: 4
                    }}
                  >
                    <Typography sx={{ padding: 4, fontWeight: 900 }} variant='h4'>
                      Request a demo
                    </Typography>
                    <Typography sx={{ color: '#8794BA' }} component='p'>
                      Any question or remarks? Just write us a message!
                    </Typography>
                  </Box>
                  <Box>
                    <Form className={styles.formStyle} onSubmit={formik.handleSubmit}>
                      <InputField size='small' name='name' label='Name' formikData={formik} />
                      <InputField size='small' type='email' name='email' label='Email' formikData={formik} />
                      <InputField size='small' name='phone' type='tel' label='Phone Number' formikData={formik} />
                      <InputField size='small' name='company_name' label='Company Name' formikData={formik} />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='p' sx={{ marginBottom: '12px' }}>
                          Select Demo Date
                        </Typography>
                        <DatePickerComponent name='date' formikData={formik} />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomButton sx={{ marginTop: '20px' }} type='submit'>
                          Request a demo
                        </CustomButton>
                      </Box>
                    </Form>
                  </Box>
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ position: 'absolute', top: '55%', right: '-100px' }}>
            <Image
              src={circleIcon}
              width={180}
              alt='request a demo'
              objectFit='cover'
              priority
              objectPosition='center'
            />
          </Box>
        </div>
      </div>
      <FooterNoAuth />
    </>
  )
}

export default RequestUs
