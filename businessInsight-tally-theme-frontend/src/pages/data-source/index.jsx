import { Typography, Box } from '@mui/material'
import { useFormik } from 'formik'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CustomModal } from 'src/@core/components/modal'
import useNotification from 'src/@core/hooks/useNotification'
import CustomButton from 'src/container/common/Button'
import Form from 'src/container/common/Form'
import InputField from 'src/container/common/InputField'
import AuthLayout from 'src/layouts/AuthLayout'
import { useUpdateCompany } from 'src/shared/utility/services/hooks/register'
import * as Yup from 'yup'

const DataSource = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const pathName = usePathname()
  const navigate = useRouter()

  const {
    data: updateCompanyData,
    isLoading: updateCompanyLoading,
    isError: updateCompanyIsError,
    error: updateCompanyError,
    mutate: updateCompany
  } = useUpdateCompany()

  //show notification after submit the form
  useNotification(updateCompanyData, updateCompanyLoading, updateCompanyIsError, updateCompanyError, '/dashboard')

  const formik = useFormik({
    initialValues: {
      dataInput: ''
    },
    validationSchema: Yup.object({
      dataInput: Yup.string().required('Please enter your Data Source')
    }),
    onSubmit: async values => {
      values.dataInput = values.dataInput.replace(/\s+/g, ' ').trim()
      formik.resetForm()
      setModalOpen(false)
      updateCompany({ url: values.dataInput })
    }
  })

  useEffect(() => {
    if (pathName === '/data-source/') {
      setModalOpen(true)
    }
  }, [pathName])

  return (
    <AuthLayout pageName='dataSource'>
      {modalOpen && (
        <CustomModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Typography variant='h5' sx={{ fontWeight: 600, padding: '1.5rem', textAlign: 'center' }}>
            Add Your data source link
          </Typography>
          <Form onSubmit={formik.handleSubmit}>
            <InputField size='small' label='Add your source link' name='dataInput' formikData={formik} />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
              <CustomButton type='submit'>Submit</CustomButton>
            </Box>
          </Form>
        </CustomModal>
      )}
    </AuthLayout>
  )
}

export default DataSource
