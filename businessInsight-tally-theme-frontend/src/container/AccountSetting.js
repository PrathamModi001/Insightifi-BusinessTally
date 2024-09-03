// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import MuiTab from '@mui/material/Tab'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Demo Tabs Imports
import { useSelector } from 'react-redux'
import { selectUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabCompany from 'src/views/account-settings/TabCompany'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')
  const user = useSelector(selectUser)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />

          {/*
               <Tab value='info'
               label={
                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                   <InformationOutline />
                   <TabName>Info</TabName>
                 </Box>
               }
             >
             </Tab>
             */}

          {user?.role === userRole?.companyAdmin && (
            <Tab
              value='Company'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BusinessOutlinedIcon />
                  <TabName>Company</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>

        {/*
          <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
          </TabPanel>
        */}

        <TabPanel sx={{ p: 0 }} value='Company'>
          <TabCompany />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
