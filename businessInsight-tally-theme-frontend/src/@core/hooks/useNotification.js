import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const useNotification = (recieveData, loading, error, unExpectedError, redirect) => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useRouter()
  useEffect(() => {
    try {
      if (recieveData && !loading) {
        enqueueSnackbar(recieveData?.message, { variant: 'success' })
        if (redirect) {
          navigate.push(redirect)
        }
      }
      if (error) {
        enqueueSnackbar(unExpectedError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [recieveData, loading, error, unExpectedError, redirect])
}

export default useNotification
