// ** React Imports
import { useEffect, useState } from 'react';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { LoadingButton } from '@mui/lab';
import { CustomModal } from 'src/@core/components/modal';
import { useChangeEmail, useUpdateUser, useUserMe } from 'src/shared/utility/services/hooks/register';

// ** form validation import
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import DemoDialog from 'src/@core/components/DemoDialog/DemoDialog';
import { selectUser } from 'src/redux/reducers/authSlice';
import * as Yup from 'yup';

const TabAccount = () => {
  const user = useSelector(selectUser);

  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  const [openDemoModal, setOpenDemoModal] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseDemoPopUp = (value) => {
    setOpenDemoModal(value)
  }

  const handleEmailChange = () => {
    if (user?.demo) {
      setOpenDemoModal(true)
    } else {
      setOpen(true)
    }
  }

  const {
    data: userMeData,
    isLoading: userMeLoading,
    isError: userMeIsError,
    error: userMeError,
    mutate: userMe,
  } = useUserMe();

  useEffect(() => {
    try {
      if (userMeData && !userMeLoading) {
        formik.setFieldValue('firstname', userMeData?.data?.user?.firstname);
        formik.setFieldValue('lastname', userMeData?.data?.user?.lastname);
        formik.setFieldValue('mobileNo', userMeData?.data?.user?.mobileNo);
        setEmail(userMeData?.data?.user?.email)
      }
      if (userMeIsError) {
        enqueueSnackbar(userMeError?.response?.data?.message, { variant: 'error' });
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [userMeData, userMeLoading, userMeIsError]);


  useEffect(() => {
    userMe()
  }, [])


  const {
    data: updateUserData,
    isLoading: updateUserLoading,
    isError: updateUserIsError,
    error: updateUserError,
    mutate: updateUser,
  } = useUpdateUser();

  useEffect(() => {
    try {
      if (updateUserData && !updateUserLoading) {
        enqueueSnackbar(updateUserData?.message, { variant: 'success' });
        userMe()
      }
      if (updateUserIsError) {
        enqueueSnackbar(updateUserError?.response?.data?.message, { variant: 'error' });
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [updateUserData, updateUserLoading, updateUserIsError]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobileNo: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('First Name Required'),
      lastname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Last Name must contain only alphabetic characters')
        .min(2, 'Last Name must be at least two characters long')
        .max(50, 'Last Name must be at most 50 characters long')
        .required('Last Name Required'),

      mobileNo: Yup.string()
        .nullable()
        .matches(/^(?!(.)\1+$)\d+$/, 'Invalid phone number')
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    }),
    onSubmit: values => {
      // Sanitize the remove extra space field
      values.firstname = values.firstname.replace(/\s+/g, ' ').trim();
      values.lastname = values.lastname.replace(/\s+/g, ' ').trim();

      if (values.mobileNo === "") {
        values.mobileNo = null;
      }

      if (user?.demo) {
        setOpenDemoModal(true)
      } else {
        updateUser(values)
      }
    },
  });

  const {
    data: changeEmailData,
    isLoading: changeEmailLoading,
    isError: changeEmailIsError,
    error: changeEmailError,
    mutate: changeEmail,
  } = useChangeEmail();

  const formikChangeEmail = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .required('Email is required')
    }),
    onSubmit: values => {
      changeEmail({
        newEmail: values?.email
      })
    },
  });

  useEffect(() => {
    try {
      if (changeEmailData && !changeEmailLoading) {
        enqueueSnackbar(changeEmailData?.message, { variant: 'success' });
        handleClose()
      }
      if (changeEmailIsError) {
        enqueueSnackbar(changeEmailError?.response?.data?.message, { variant: 'error' });
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [changeEmailData, changeEmailLoading, changeEmailIsError]);
  
  return (
    <>
      <CardContent>
        <form autoComplete='off' onSubmit={formik.handleSubmit} >
          <Typography sx={{ mb: 4 }} variant='h5'>
            Update user
          </Typography>
          <Grid container sx={{ marginTop: 4.8, display: 'flex', marginBottom: 3 }}>
            <Grid container sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4.8 }}>
                <TextField
                  fullWidth
                  sx={{}}
                  type='text'
                  label='First Name'
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  helperText={(formik.touched.firstname && formik.errors.firstname) && formik.errors.firstname}
                  error={formik.touched.firstname && formik.errors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4.8 }}>
                <TextField
                  fullWidth
                  sx={{}}
                  type='text'
                  label='Last Name'
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  helperText={(formik.touched.lastname && formik.errors.lastname) && formik.errors.lastname}
                  error={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 4.8 }}>
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4 }}
                  type='text'
                  label='Mobile Number'
                  name="mobileNo"
                  value={formik.values.mobileNo}
                  onChange={formik.handleChange}
                  helperText={(formik.touched.mobileNo && formik.errors.mobileNo) && formik.errors.mobileNo}
                  error={formik.touched.mobileNo && formik.errors.mobileNo}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"space-between"} sm={12} md={12} sx={{ marginTop: 4.8 }}>
                <TextField
                  fullWidth
                  sx={{ marginBottom: 4, marginRight: 2 }}
                  type='text'
                  label='Email'
                  name="email"
                  value={email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <div style={{}}>
                  <LoadingButton size='large' variant='contained' style={{ height: "78%" }} sx={{}} onClick={(e) => {
                    handleEmailChange()
                  }}>
                    Change
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', gap: 10, }}>
            <LoadingButton size='large' disabled={user?.demo} type='submit' variant='contained' sx={{ marginBottom: 7 }} loading={updateUserLoading}>
              Update
            </LoadingButton>
          </div>
        </form>
      </CardContent>
      <CustomModal open={open} onClose={handleClose} header='Email'>
        <div style={{ mb: 6 }}>
          <Typography variant='h4' sx={{ fontWeight: 600, padding: '2rem 1rem', textAlign: 'center' }}>
            Change Email
          </Typography>
        </div>
        <form autoComplete='off' onSubmit={formikChangeEmail.handleSubmit}>
          <TextField
            fullWidth
            sx={{ marginBottom: 4 }}
            type='email'
            label='Email'
            name='email'

            value={formikChangeEmail.values.email}
            onChange={formikChangeEmail.handleChange}
            helperText={formikChangeEmail.touched.email && formikChangeEmail.errors.email && formikChangeEmail.errors.email}
            error={formikChangeEmail.touched.email && formikChangeEmail.errors.email}
          />
          <Typography sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }} variant='body2'>Note:- After updating your email, you will be automatically logged out and required to log in again using your new email address after completing the verification process.</Typography>
          <div style={{ display: 'flex', gap: 10, marginTop: '10px', justifyContent: 'center' }}>
            <LoadingButton
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={changeEmailLoading}
            >
              Submit
            </LoadingButton>
            <LoadingButton size='large' onClick={handleClose} variant='outlined' sx={{ marginBottom: 7 }}>
              Cancel
            </LoadingButton>
          </div>
        </form>
      </CustomModal>
      <DemoDialog open={openDemoModal} close={handleCloseDemoPopUp} />
    </>
  )
}

export default TabAccount
