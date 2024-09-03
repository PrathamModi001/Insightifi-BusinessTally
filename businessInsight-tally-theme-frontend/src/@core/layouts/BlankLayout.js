// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'
import LandingNav from './landingComponent/noAuthNavbar'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }) => {
  const router = useRouter()

  const user = useSelector(selectUser)

  if (user && user.role !== userRole?.superAdmin) {
    router.push('/dashboard')
  } else if (user && user.role === userRole?.superAdmin) {
    router.push('/users')
  }

  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <LandingNav />
      {children}
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
