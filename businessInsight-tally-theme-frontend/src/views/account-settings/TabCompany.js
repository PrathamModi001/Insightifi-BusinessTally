// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { LoadingButton } from '@mui/lab'
import { Button, CardContent, Grid, TextField, Autocomplete } from '@mui/material'

import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { setCompanyData } from 'src/redux/reducers/authSlice'
import { stateWithCity } from 'src/shared/utility/helpers'
import { useGetCompany, useUpdateCompany } from '../../../src/shared/utility/services/hooks/register'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** redux import

const TabCompany = () => {
  const dispatch = useDispatch()

  // ** State
  const [companyDetails, setCompanyDetails] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      name: '',
      state: '',
      city: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*$/, 'Company name must contain only alphabetic characters')
        .min(2, 'Company name must be at least two characters long')
        .max(50, 'Company name must be at most 50 characters long')
        .required('Company Name Required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required')
    }),

    onSubmit: values => {
      values.name = values.name.replace(/\s+/g, ' ').trim()
      updateCompany(values)
    }
  })

  const handleResetDetails = () => {
    formik.setFieldValue('name', companyDetails?.name)
    formik.setFieldValue('state', companyDetails?.state)
    formik.setFieldValue('city', companyDetails?.city)
  }

  ///////////////////state with city/////////////////

  const [cityOptions, setCityOptions] = useState([])
  const statesAndCities = stateWithCity

  const handleStateChange = (event, newValue) => {
    setCityOptions(statesAndCities[newValue] || [])
    formik.setFieldValue('state', newValue === null ? '' : newValue)
    formik.setFieldValue('city', '')
  }

  const handleCityChange = (event, newValue) => {
    formik.setFieldValue('city', newValue === null ? '' : newValue)
  }

  //////////////////////////////////////////////////

  const {
    data: companyData,
    isLoading: companyLoading,
    isError: companyIsError,
    error: companyError,
    mutate: company
  } = useGetCompany()

  const {
    data: updateCompanyData,
    isLoading: updateCompanyLoading,
    isError: updateCompanyIsError,
    error: updateCompanyError,
    mutate: updateCompany
  } = useUpdateCompany()

  useEffect(() => {
    try {
      company()
    } catch (err) {
      console.log('err', err)
    }
  }, [])

  useEffect(() => {
    try {
      if (companyData && !companyLoading) {
        var companyDetails = companyData?.data?.list?.[0]

        var companyObject = companyDetails?.Company
        dispatch(setCompanyData(companyObject))

        formik.setFieldValue('name', companyDetails?.Company?.name)
        formik.setFieldValue('state', companyDetails?.Company?.state)
        formik.setFieldValue('city', companyDetails?.Company?.city)
        setCityOptions(statesAndCities?.[companyDetails?.Company?.state] || [])
        setCompanyDetails(companyDetails?.Company)
      }
      if (companyIsError) {
        enqueueSnackbar(companyError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [companyData, companyLoading, companyIsError])

  useEffect(() => {
    try {
      if (updateCompanyData && !updateCompanyLoading) {
        company()
        enqueueSnackbar(updateCompanyData?.message, { variant: 'success' })
      }
      if (updateCompanyIsError) {
        enqueueSnackbar(updateCompanyError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [updateCompanyData, updateCompanyLoading, updateCompanyIsError])

  return (
    <CardContent>
      <form autoComplete='off' onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              sx={{}}
              type='text'
              label='Company Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name && formik.errors.name}
              error={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Autocomplete
              name='state'
              value={statesAndCities?.length === 0 ? '' : formik.values.state}
              onChange={handleStateChange}
              id='state-autocomplete'
              options={Object.keys(statesAndCities)}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  label='Select a State'
                  helperText={formik.touched.state && formik.errors.state && formik.errors.state}
                  name='state'
                  value={formik.values.state}
                  error={formik.touched.state && formik.errors.state}
                  type='text'
                  variant='outlined'
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{}}>
            <Autocomplete
              name='city'
              value={cityOptions?.length === 0 ? '' : formik.values.city}
              onChange={handleCityChange}
              id='city-autocomplete'
              options={cityOptions}
              renderInput={params => (
                <TextField
                  {...params}
                  helperText={formik.touched.city && formik.errors.city && formik.errors.city}
                  name='city'
                  value={formik.values.city}
                  error={formik.touched.city && formik.errors.city}
                  type='text'
                  label={'Select a City'}
                  variant='outlined'
                  fullWidth
                  disabled={!cityOptions || cityOptions?.length === 0}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton type='submit' variant='contained' sx={{ marginRight: 3.5 }} loading={updateCompanyLoading}>
              Save Changes
            </LoadingButton>
            <Button
              type='reset'
              variant='outlined'
              color='secondary'
              onClick={() => {
                handleResetDetails()
              }}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabCompany
