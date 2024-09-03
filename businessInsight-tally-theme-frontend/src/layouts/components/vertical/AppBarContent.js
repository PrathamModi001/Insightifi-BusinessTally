// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSelector } from 'react-redux'
import { selectCompany } from 'src/redux/reducers/authSlice'
import { store } from 'src/redux/store'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const companyData = useSelector(selectCompany)
  const user = store.getState().user?.userData?.role

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {hidden && (
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton
              color='inherit'
              onClick={toggleNavVisibility}
              sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
            >
              <Menu />
            </IconButton>
          ) : null}
        </Box>
      )}

      {companyData && <h3>{companyData?.name}</h3>}
      {user === 'superAdmin' && <h3>Logged in as a {user}</h3>}
      {user == 'organizationAdmin' && <h3>Logged in as a {user}</h3>}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        {/* <NotificationDropdown /> */}
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
