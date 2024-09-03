// ** React Imports
import { useEffect, useState } from 'react'

// ** Use-Debounce Import
import { useDebouncedCallback } from 'use-debounce'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'

import { styled } from '@mui/material/styles'

// ** Third Party Styles Imports
import { LoadingButton } from '@mui/lab'
import {
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,

  // styled,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { useSnackbar } from 'notistack'
import 'react-datepicker/dist/react-datepicker.css'
import { CustomModal } from 'src/@core/components/modal'
import { useClient, useInvite, useUpdateCompany } from 'src/shared/utility/services/hooks/register'

// ** form validation import
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import DemoDialog from 'src/@core/components/DemoDialog/DemoDialog'
import { selectUser } from 'src/redux/reducers/authSlice'
import * as Yup from 'yup'

const columns = [
  {
    id: 'company',
    label: 'Company',
    minWidth: 170
  },
  { id: 'username', label: 'User Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'city',
    label: 'City',
    minWidth: 170
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 170
  },
  {
    id: 'viewdashboard',
    label: 'Dashboard',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center'
  }
]

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const Users = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [approvedOrNot, setApprovedOrNot] = useState(true)
  const [openDemoModal, setOpenDemoModal] = useState(false)

  const [totalCount, setTotalCount] = useState(0)

  const [searchQuery, setSearchQuery] = useState({
    isApproved: approvedOrNot,
    pageNo: 0,
    query: '',
    limit: 10
  })

  const [clientList, setClientList] = useState([])

  const router = useRouter()
  const user = useSelector(selectUser)

  const { enqueueSnackbar } = useSnackbar()

  // ** Dynamic Pagination **
  const handleChangePage = (event, newPage) => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: newPage
    }))

    // Fetch data for the new page
    client({
      isApproved: approvedOrNot,
      query: searchQuery?.query,
      limit: +searchQuery?.limit,
      pageNo: newPage + 1 // Adjusting page number (0-indexed to 1-indexed)
    })
  }

  const handleChangeRowsPerPage = event => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: 0,
      limit: +event.target.value
    }))

    // Fetch data with the new rows per page limit
    client({
      isApproved: approvedOrNot,
      query: searchQuery?.query,
      limit: +event.target.value,
      pageNo: 1 // Resetting page number when changing rows per page
    })
  }

  const openModal = () => {
    setOpen(true)
  }

  const handleCloseDemoPopUp = value => {
    setOpenDemoModal(value)
  }

  const {
    data: inviteData,
    isLoading: inviteLoading,
    isError: inviteIsError,
    error: inviteError,
    mutate: invite
  } = useInvite()

  const {
    data: clientData,
    isLoading: clientLoading,
    isError: clientIsError,
    error: clientError,
    mutate: client
  } = useClient()

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      userType: 'company'
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'First name must contain only alphabetic characters')
        .min(2, 'First name must be at least two characters long')
        .max(50, 'First name must be at most 50 characters long')
        .required('Required'),
      lastname: Yup.string()
        .trim() // Removes leading/trailing whitespace
        .matches(/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/, 'Last Name must contain only alphabetic characters')
        .min(2, 'Last Name must be at least two characters long')
        .max(50, 'Last Name must be at most 50 characters long')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S+@\S+$/, 'Email address cannot contain whitespace')
        .matches(/^[^A-Z]*$/, 'Please enter a valid email address')
        .required('Required')
    }),
    onSubmit: values => {
      values.firstname = values.firstname.replace(/\s+/g, ' ').trim()
      values.lastname = values.lastname.replace(/\s+/g, ' ').trim()

      if (user?.demo) {
        setOpen(false)
        formik.resetForm()
        setOpenDemoModal(true)
      } else {
        invite(values)
      }
    }
  })

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  const handleViewDashboard = id => {
    router.push({
      pathname: '/power-bi',
      query: { deshboardId: id }
    })
  }

  const handleSearchData = value => {
    const trimmedValue = value.trim()

    setSearchQuery(prevState => ({
      ...prevState,
      query: trimmedValue
    }))

    debouncedHandleSearch({
      isApproved: approvedOrNot,
      query: trimmedValue,
      limit: +searchQuery?.limit,
      pageNo: 1 // Resetting page number when changing rows per page
    })
  }

  const debouncedHandleSearch = useDebouncedCallback(value => {
    client(value)
  }, 800)

  useEffect(() => {
    try {
      if (inviteData && !inviteLoading) {
        enqueueSnackbar(inviteData?.message, { variant: 'success' })
        formik.resetForm()
        setOpen(false)
      }
      if (inviteIsError) {
        enqueueSnackbar(inviteError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [inviteData, inviteLoading, inviteIsError])

  ////////Get Client Api Response////////////

  useEffect(() => {
    client({
      isApproved: approvedOrNot,
      query: searchQuery?.query,
      limit: searchQuery?.limit,
      pageNo: 1
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedOrNot])

  useEffect(() => {
    try {
      if (clientData && !clientLoading) {
        setTotalCount(+clientData?.total)
        setClientList(clientData?.list || [])
      }
      if (clientIsError) {
        enqueueSnackbar(clientError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [clientData, clientLoading, clientIsError])

  const handleChangeApprovedorNot = () => {
    setApprovedOrNot(!approvedOrNot)
  }

  const {
    data: updateCompanyData,
    isLoading: updateCompanyLoading,
    isError: updateCompanyIsError,
    error: updateCompanyError,
    mutate: updateCompany
  } = useUpdateCompany()

  const handleApprovedDisapproved = (id, value) => {
    updateCompany({
      companyId: id,
      isApproved: value
    })
  }

  useEffect(() => {
    try {
      if (updateCompanyData && !updateCompanyLoading) {
        client({
          isApproved: approvedOrNot,
          query: searchQuery?.query,
          limit: searchQuery?.limit,
          pageNo: 1
        })
        enqueueSnackbar(updateCompanyData?.message, { variant: 'success' })
      }
      if (updateCompanyIsError) {
        enqueueSnackbar(updateCompanyError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [updateCompanyData, updateCompanyLoading, updateCompanyIsError])

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        backgroundColor: 'red !important',

        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundColor: 'green',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="2 2 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      // backgroundColor: 'green !important',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'red',
        borderRadius: '24px',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="2 2 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }))

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ mb: 4 }} variant='h5'>
            Clients
          </Typography>

          <LoadingButton
            size='large'
            variant='outlined'
            sx={{ marginBottom: 7, color: 'inherit ', borderColor: 'inherit ' }}
            onClick={openModal}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Invite Client
          </LoadingButton>
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={2} justifyContent={'space-between'} sx={{ paddingBottom: 4 }}>
            <Grid
              item
              sx={{ padding: '0px !important' }}
              xs={6}
              sm={7}
              md={4}
              direction={'row'}
              display={'flex'}
              alignItems='center'
            >
              <TextField
                fullWidth
                sx={{}}
                type='text'
                placeholder='Search Client'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={e => handleSearchData(e.target.value)}
              />
            </Grid>
            <Grid
              item
              sx={{ padding: '0px 0px 0px 10px !important' }}
              display={'flex'}
              gap={1}
              xs={6}
              md={2}
              sm={4}
              direction={'row'}
              alignItems='center'
            >
              <FormControl fullWidth>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={approvedOrNot}
                  onChange={() => {
                    handleChangeApprovedorNot()
                  }}
                >
                  <MenuItem value={true}>Approved</MenuItem>
                  <MenuItem value={false}>Disapproved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clientLoading && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} padding='20px' align='center'>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </>
              )}

              {!clientLoading &&
                clientList?.length > 0 &&
                clientList.map((data, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      <TableCell>{data.company_name}</TableCell>
                      <TableCell>
                        {data.user_firstname} {data.user_lastname}
                      </TableCell>
                      <TableCell>{data.user_email}</TableCell>
                      <TableCell>{data.company_city}</TableCell>
                      <TableCell>{data.company_state}</TableCell>
                      <TableCell
                        align={'center'}
                        style={{ color: 'blue', cursor: 'pointer', fontWeight: '600' }}
                        onClick={() => {
                          handleViewDashboard(data?.powerbidashboard[0]?.dashboard)
                        }}
                      >
                        {'View'}
                      </TableCell>
                      <TableCell
                        align={'center'}
                        style={{
                          color: 'blue',
                          cursor: 'pointer',
                          fontWeight: '600',
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Tooltip title={`${data.isapproved === true ? 'Approved' : 'Disapproved'}`} placement='right'>
                          <FormGroup>
                            <FormControlLabel
                              checked={data.isapproved}
                              control={<MaterialUISwitch sx={{}} defaultChecked />}
                              sx={{ margin: '0px !important' }}
                              label=''
                              onChange={() => handleApprovedDisapproved(data?.company_id, !data.isapproved)}
                            />
                          </FormGroup>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {!clientLoading && clientList?.length === 0 && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} padding='20px' align='center'>
                      No Data Available
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={totalCount} // Update count with the length of dynamic data
          rowsPerPage={searchQuery?.limit}
          page={searchQuery?.pageNo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomModal open={open} onClose={handleClose} header='Client'>
        <div style={{ mb: 6 }}>
          <Typography variant='h4' sx={{ fontWeight: 600, padding: '2rem', textAlign: 'center' }}>
            Invite Client
          </Typography>
        </div>
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
            type='email'
            label='Client Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email && formik.errors.email}
            error={formik.touched.email && formik.errors.email}
          />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <LoadingButton
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 7 }}
              loading={inviteLoading}
            >
              Invite
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

export default Users
