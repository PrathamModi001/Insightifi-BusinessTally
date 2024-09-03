// ** MUI Imports
// ** Next Imports
import { useRouter } from 'next/router'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthToken, selectUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'
import { usePowerBi } from 'src/shared/utility/services/hooks/register'
import styles from '../../styles/powerbiResponsive.module.css'

import { Typography, Box } from '@mui/material'

const Power_Bi = () => {
  const router = useRouter()
  const user = useSelector(selectUser)

  // const authToken =
  const [dashboardID, setDarshboardId] = useState('')
  const [authToken, setAuthToken] = useState(useSelector(selectAuthToken))
  const clientID = process.env.NEXT_PUBLIC_POWERBI_CLIENT_ID
  const dash_Id = router?.query?.deshboardId

  ////////////////////////////////////

  const {
    data: powerBiData,
    isLoading: powerBiLoading,
    isError: powerBiIsError,
    error: powerBiError,
    mutate: powerBi
  } = usePowerBi()

  useEffect(() => {
    if (authToken) {
      if (
        (user?.role === userRole?.companyEmployee || user?.role === userRole?.companyAdmin) &&
        !router?.query?.deshboardId
      ) {
        powerBi({
          isApproved: true,
          query: '',
          limit: 1,
          pageNo: 1
        })
      } else {
        setDarshboardId(router?.query ? router?.query?.deshboardId : '')
      }
    }
  }, [authToken, user, dash_Id])

  useEffect(() => {
    try {
      if (powerBiData && !powerBiLoading) {
        // setpowerBi_Data(powerBiData?.companies)
        setDarshboardId(powerBiData?.list?.[0]?.dashboard)
      }
      if (powerBiIsError) {
        enqueueSnackbar(powerBiError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [powerBiData, powerBiLoading, powerBiIsError])

  ///////////////////////////////////

  useEffect(() => {
    if (user?.role === userRole.companyEmployee || user?.role === userRole.companyAdmin) {
      router.push('/dashboard')
    }
  }, [])

  useEffect(() => {
    const disableRightClick = e => {
      e.preventDefault()
    }

    // Add event listener to disable right-click
    window.addEventListener('contextmenu', disableRightClick)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('contextmenu', disableRightClick)
    }
  }, [])

  return (
    <Box sx={{ display: 'grid', gap: '18px' }}>
      <ApexChartWrapper>
        <div>
          <div>
            {dashboardID && (
              <div>
                <iframe
                  title='VFW Main'
                  className={styles.powerBiFrame}
                  src={`https://app.powerbi.com/reportEmbed?reportId=${dashboardID}&autoAuth=true&ctid=${clientID}`}
                  frameborder='0'
                  allowFullScreen='true'
                ></iframe>
              </div>
            )}
          </div>
        </div>

        {!dashboardID && (
          <Box>
            <Typography
              align='center'
              className={styles.powerBiNotFoundFrame}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'gray',
                alignItems: 'center',
                border: '1px solid lightgray',
                marginTop: 3,
                minHeight: '200px'
              }}
              variant='body'
            >
              {' '}
              No ReportId Found
            </Typography>
          </Box>
        )}
      </ApexChartWrapper>
    </Box>
  )
}

export default Power_Bi
