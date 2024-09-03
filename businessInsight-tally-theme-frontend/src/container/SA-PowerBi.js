// ** React Imports
import { useEffect, useState } from 'react'

// ** Use-Debounce Import
import { useDebouncedCallback } from 'use-debounce'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'

import {
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CardContent,
  TextField,
  Typography
} from '@mui/material'

// ** Third Party Styles Imports
import { LoadingButton } from '@mui/lab'

import { useSnackbar } from 'notistack'
import 'react-datepicker/dist/react-datepicker.css'
import { CustomModal } from 'src/@core/components/modal'
import {
  useAddPowerBi,
  useDeletePowerBi,
  useGetCompany,
  usePowerBi,
  useUpdatePowerBi
} from 'src/shared/utility/services/hooks/register'

// ** form validation import
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AddandEditPopUp from './ModalsContent/AddandEditPopUp'
import DeletePopUp from './ModalsContent/DeletePopUp'
import SoucePopUp from './ModalsContent/SoucePopup'

const openModalTypeEnum = {
  addModal: 'addModal',
  editModal: 'editModal',
  deleteModal: 'deleteModal',
  sourceModal: 'sourceModal'
}

const columns = [
  // {
  //   id: 'company-partners ',
  //   label: 'Partner',
  //   minWidth: 170
  // },
  {
    id: 'company',
    label: 'Company',
    minWidth: 170
  },
  {
    id: 'company-data-source ',
    label: 'Data Source',
    minWidth: 170
  },
  {
    id: 'viewdashboard',
    label: 'Dashboard',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'companyEdit',
    label: 'Edit',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'companyDelete',
    label: 'Delete',
    minWidth: 100,
    align: 'center'
  }
]

const SA_PowerBi = () => {
  ///////// import set is variable /////////

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  /////////////////////////////////////////

  ///////////// ** State ** ///////////////
  const [companyDashboardList, setCompanyDashboardList] = useState([])

  const [companyDetails, setCompanyDetails] = useState({
    dashboardId: 0,
    isActive: false
  })

  const [companyList, setCompanyList] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [popup, setPopup] = useState('')
  const [deleteId, setDeleteId] = useState(0)
  const [value, setValue] = useState(companyList[0])
  const [inputValue, setInputValue] = useState('')

  const [searchQuery, setSearchQuery] = useState({
    isApproved: true,
    pageNo: 0,
    query: '',
    limit: 10
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [openModalType, setOpenModalType] = useState(openModalTypeEnum?.addModal)

  //////////////////////////////////////////

  ////////////////// ** Dynamic Pagination **/////////////////////

  const handleChangePage = (event, newPage) => {
    setSearchQuery(prevState => ({
      ...prevState,
      pageNo: newPage
    }))

    // Fetch data for the new page
    powerBi({
      isApproved: true,
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
    powerBi({
      isApproved: true,
      query: searchQuery?.query,
      limit: +event.target.value,
      pageNo: 1 // Resetting page number when changing rows per page
    })
  }

  const handleSearchData = value => {
    const trimmedValue = value.trim()

    setSearchQuery(prevState => ({
      ...prevState,
      query: trimmedValue
    }))

    debouncedHandleSearch({
      isApproved: true,
      query: trimmedValue,
      limit: +searchQuery?.limit,
      pageNo: 1
    })
  }

  const debouncedHandleSearch = useDebouncedCallback(value => {
    powerBi(value)
  }, 800)

  //////////////////////////////////////////////////////////////

  /////////////////// Formik Validation ////////////////////////

  const formik = useFormik({
    initialValues: {
      companyId: '',
      dashboardId: ''
    },
    validationSchema: Yup.object({
      companyId: Yup.string().required('Required'),
      dashboardId: Yup.string()
        .required('Required')
        .test(
          'is-not-empty-or-whitespace',
          'Report Id cannot be empty or just whitespace',
          value => value.trim() !== ''
        )
    }),
    onSubmit: values => {
      const normalizedDashboardId = values.dashboardId.replace(/\s+/g, ' ').trim()

      const trimmedValues = {
        ...values,
        dashboardId: normalizedDashboardId
      }

      if (popup === 'Add') {
        addPowerBi(trimmedValues)
      } else if (popup === 'Edit') {
        const dashboardData = {
          company: trimmedValues?.companyId,
          dashboard: trimmedValues?.dashboardId,
          isActive: companyDetails?.isActive
        }

        updatePowerBi({
          id: companyDetails?.dashboardId,
          payload: dashboardData
        })
      }
    }
  })

  //////////////////////////////////////////////////////////////

  ////////////////////  handle ADD/Edit Popup  /////////////////

  const handleAddPopUp = () => {
    setModalOpen(true)
    setOpenModalType(openModalTypeEnum?.addModal)
    setPopup('Add a new')
  }

  const handleEditPopUp = data => {
    setModalOpen(true)
    setOpenModalType(openModalTypeEnum.editModal)
    setPopup('Edit')

    // const trimmedValue = value?.trim() ?? ''
    const trimmedValue = (typeof value === 'string' ? value.trim() : '') ?? ''

    setCompanyDetails(prevState => ({
      ...prevState,
      query: trimmedValue,
      dashboardId: data?.id,
      isActive: data?.isActive
    }))
    setValue({
      id: data?.Company?.id,
      name: data?.Company?.name
    })
    formik.setFieldValue('companyId', data?.Company?.id)
    formik.setFieldValue('dashboardId', data?.dashboard)
  }

  const handleDeletePopUp = data => {
    setModalOpen(true)
    setOpenModalType(openModalTypeEnum.deleteModal)
    setPopup('Delete')
    setDeleteId(data?.id)
  }

  const handleViewSource = data => {
    setModalOpen(true)
    setOpenModalType(openModalTypeEnum.sourceModal)
    setPopup('Souce of')
  }

  const handleDeleteClientPowerBi = () => {
    deletePowerBi(deleteId)
  }

  const handlePopUpClose = () => {
    setModalOpen(false)
    setValue(null)
    formik.resetForm()
  }

  ///////////////////////////////////////////////////////////////

  ////////////////  handle power-bi dashboard  //////////////////

  const handleViewDashboard = id => {
    router.push({
      pathname: '/power-bi',
      query: { deshboardId: id }
    })
  }

  ///////////////////////////////////////////////////////////////

  ////////////////  handle Company Search  //////////////////

  const handleSearchCompany = value => {
    debouncedHandleSearchCompany({
      name: value,
      limit: 20
    })
  }

  const debouncedHandleSearchCompany = useDebouncedCallback(value => {
    company(value)
  }, 800)

  ///////////////////////////////////////////////////////////////

  /////////////////// Api Calling ////////////////////

  const {
    data: powerBiData,
    isLoading: powerBiLoading,
    isError: powerBiIsError,
    error: powerBiError,
    mutate: powerBi
  } = usePowerBi()

  const {
    data: addPowerBiData,
    isLoading: addPowerBiLoading,
    isError: addPowerBiIsError,
    error: addPowerBiError,
    mutate: addPowerBi
  } = useAddPowerBi()

  const {
    data: updatePowerBiData,
    isLoading: updatePowerBiLoading,
    isError: updatePowerBiIsError,
    error: updatePowerBiError,
    mutate: updatePowerBi
  } = useUpdatePowerBi()

  const {
    data: deletePowerBiData,
    isLoading: deletePowerBiLoading,
    isError: deletePowerBiIsError,
    error: deletePowerBiError,
    mutate: deletePowerBi
  } = useDeletePowerBi()

  const {
    data: companyData,
    isLoading: companyLoading,
    isError: companyIsError,
    error: companyError,
    mutate: company
  } = useGetCompany()

  useEffect(() => {
    powerBi({
      isApproved: true,
      query: '',
      limit: searchQuery?.limit,
      pageNo: 1
    })
    company({
      name: '',
      limit: 20
    })
  }, [])

  useEffect(() => {
    try {
      if (powerBiData && !powerBiLoading) {
        setTotalCount(+powerBiData?.total)
        setCompanyDashboardList(powerBiData?.list)
      }
      if (powerBiIsError) {
        enqueueSnackbar(powerBiError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [powerBiData, powerBiLoading, powerBiIsError])

  useEffect(() => {
    try {
      if (addPowerBiData && !addPowerBiLoading) {
        powerBi({
          isApproved: true,
          query: '',
          limit: searchQuery?.limit,
          pageNo: 1
        })
        handlePopUpClose()
        enqueueSnackbar(addPowerBiData?.message, { variant: 'success' })
        setValue()
        formik.resetForm()
      }
      if (addPowerBiIsError) {
        enqueueSnackbar(addPowerBiError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [addPowerBiData, addPowerBiLoading, addPowerBiError])

  useEffect(() => {
    try {
      if (updatePowerBiData && !updatePowerBiLoading) {
        powerBi({
          isApproved: true,
          query: '',
          limit: searchQuery?.limit,
          pageNo: 1
        })
        handlePopUpClose()
        enqueueSnackbar(updatePowerBiData?.message, { variant: 'success' })
        setValue()
        formik.resetForm()
      }
      if (updatePowerBiIsError) {
        enqueueSnackbar(updatePowerBiError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [updatePowerBiData, updatePowerBiLoading, updatePowerBiIsError])

  useEffect(() => {
    try {
      if (deletePowerBiData && !deletePowerBiLoading) {
        powerBi({
          isApproved: true,
          query: '',
          limit: searchQuery?.limit,
          pageNo: 1
        })

        handlePopUpClose()
        setDeleteId(0)
        enqueueSnackbar(deletePowerBiData?.message, { variant: 'success' })
      }
      if (deletePowerBiIsError) {
        enqueueSnackbar(deletePowerBiError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [deletePowerBiData, deletePowerBiLoading, deletePowerBiIsError])

  useEffect(() => {
    try {
      if (companyData && !companyLoading) {
        setCompanyList(companyData?.data?.list)
      }
      if (companyIsError) {
        enqueueSnackbar(companyError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [companyData, companyLoading, companyIsError])

  ///////////////////////////////////////////////////////////////

  const ModalType = {
    addModal: (
      <AddandEditPopUp
        popup={popup}
        formik={formik}
        value={value}
        setValue={setValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearchCompany={handleSearchCompany}
        companyList={companyList}
        handlePopUpClose={handlePopUpClose}
        addPowerBiLoading={addPowerBiLoading}
        updatePowerBiLoading={false}
        btnText='Add company'
      />
    ),
    editModal: (
      <AddandEditPopUp
        popup={popup}
        formik={formik}
        value={value}
        setValue={setValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearchCompany={handleSearchCompany}
        companyList={companyList}
        handlePopUpClose={handlePopUpClose}
        addPowerBiLoading={false}
        updatePowerBiLoading={updatePowerBiLoading}
        btnText='Update company'
      />
    ),
    deleteModal: (
      <DeletePopUp
        onClose={handlePopUpClose}
        deleteData={handleDeleteClientPowerBi}
        popup={popup}
        deletePowerBiLoading={deletePowerBiLoading}
        handleDeleteClientPowerBi={handleDeleteClientPowerBi}
        handlePopUpClose={handlePopUpClose}
      />
    ),
    sourceModal: <SoucePopUp />
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ mb: 4 }} variant='h5'>
            Power-Bi Clients
          </Typography>
          <LoadingButton
            size='large'
            variant='outlined'
            sx={{ marginBottom: 7, color: 'inherit ', borderColor: 'inherit ' }}
            onClick={handleAddPopUp}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Add
          </LoadingButton>
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                sx={{ marginBottom: 4 }}
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
              {powerBiLoading && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} align='center'>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </>
              )}

              {!powerBiLoading &&
                companyDashboardList?.length > 0 &&
                companyDashboardList.map((data, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {/* <TableCell>{data?.Company?.name}</TableCell> */}
                      <TableCell>{data?.Company?.name}</TableCell>

                      <TableCell
                        onClick={() => handleViewSource(data)}
                        style={{ color: 'blue', cursor: 'pointer', fontWeight: '600' }}
                      >
                        {'Source'}
                      </TableCell>
                      <TableCell
                        align={'center'}
                        style={{ color: 'blue', cursor: 'pointer', fontWeight: '600' }}
                        onClick={() => {
                          handleViewDashboard(data?.dashboard)
                        }}
                      >
                        {'View'}
                      </TableCell>
                      <TableCell align={'center'}>
                        <LoadingButton
                          sx={{ marginRight: 2 }}
                          variant='outlined'
                          size='small'
                          onClick={() => handleEditPopUp(data)}
                        >
                          Edit
                        </LoadingButton>
                      </TableCell>
                      <TableCell align={'center'}>
                        <LoadingButton variant='outlined' size='small' onClick={() => handleDeletePopUp(data)}>
                          Delete
                        </LoadingButton>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {!powerBiLoading && companyDashboardList?.length === 0 && (
                <>
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={6} align='center'>
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
          rowsPerPageOptions={[2, 10, 25, 50, 100]}
          count={totalCount} // Update count with the length of dynamic data
          rowsPerPage={searchQuery?.limit}
          page={searchQuery?.pageNo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomModal open={modalOpen} onClose={handlePopUpClose} header='AddClient' sx={{ width: '600px !important' }}>
        <div style={{ mb: 6 }}>
          <Typography variant='h4' sx={{ fontWeight: 600, padding: '2rem', textAlign: 'center' }}>
            {popup} company
          </Typography>
        </div>
        {ModalType?.[openModalType]}
      </CustomModal>
    </>
  )
}

export default SA_PowerBi
