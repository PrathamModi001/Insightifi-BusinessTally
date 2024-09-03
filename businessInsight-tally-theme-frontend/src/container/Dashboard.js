// ** MUI Imports
import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useDashboardAnalysis } from 'src/shared/utility/services/hooks/register'

// ** Demo Components Imports
import ClientOnboard from 'src/views/dashboard/ClientOnboard'
import IncomeDiv from 'src/views/dashboard/IncomeDiv'
import Profitdiv from 'src/views/dashboard/Profitdiv'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import SubscriptionChart from 'src/views/dashboard/SubscriptionChart'
import TotalRevenueTable from 'src/views/dashboard/TotalRevenueTable'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

const Dashboard = () => {
  const theme = useTheme()
  const [dashboardData, setDashboardData] = useState(null)

  const {
    data: analysisData,
    isLoading: analysisLoading,
    isError: analysisIsError,
    error: analysisError,
    mutate: analysis
  } = useDashboardAnalysis()

  useEffect(() => {
    analysis()
  }, [])

  useEffect(() => {
    try {
      if (analysisData && !analysisLoading) {
        setDashboardData(analysisData)
      }
      if (analysisIsError) {
        enqueueSnackbar(analysisError?.response?.data?.message, { variant: 'error' })
      }
    } catch (err) {
      console.log('err', err)
    }
  }, [analysisData, analysisLoading, analysisIsError])

  return (
    <ApexChartWrapper>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* <Grid item xs={12} md={12}>
                    <WelcomeCompany />
                </Grid> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2%',
            width: '100%',
            [theme.breakpoints.down(900)]: {
              flexDirection: 'column'
            },
            [theme.breakpoints.down(600)]: {
              gap: '20px'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '30%',
              [theme.breakpoints.down(900)]: {
                width: '100%'
              }
            }}
          >
            <Box>
              <ClientOnboard ClientOnboardData={dashboardData?.getUsersStatusCounts?.onboardUser} />
            </Box>
            <Box>
              <WeeklyOverview WeeklyOverviewData={dashboardData?.overviewRevenue ?? []} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '68%',
              [theme.breakpoints.down(900)]: {
                width: '100%',
                marginTop: 0,
                gap: '20px'
              }
            }}
          >
            <Box>
              <StatisticsCard
                StatisticsData={
                  dashboardData?.getUsersStatusCounts ?? {
                    activeUsers: 0,
                    inactiveUsers: 0
                  }
                }
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                width: '100%',
                [theme.breakpoints.down(600)]: {
                  width: '100%',
                  marginTop: 0,
                  flexDirection: 'column',
                  gap: '20px'
                }
              }}
            >
              <Box sx={{ width: '100%' }}>
                <IncomeDiv IncomeDivData={dashboardData?.incomethisMonth ?? 0} />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Profitdiv ProfitDivData={0} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6} lg={6}>
          <TotalRevenueTable TotalRevenueData={dashboardData?.getCompanyAmounts ?? []} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SubscriptionChart SubscriptionData={dashboardData?.getCompanyAmountsByCity ?? []} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
