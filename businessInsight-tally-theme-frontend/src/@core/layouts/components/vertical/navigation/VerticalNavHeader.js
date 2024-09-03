// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import InsightifiLogo from 'src/assets/images/InsightifiLogo.svg';
import { Router } from 'mdi-material-ui';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/redux/reducers/authSlice';
import { userRole } from 'src/shared/utility/helpers';

// ** Configs

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()
  const router = useRouter()
  const user = useSelector(selectUser);


  const handleHomeRedirect = ()=>{
    if (user.role === userRole?.superAdmin) {
      router.push('/users');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ padding: '15px' }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <StyledLink>
          <HeaderTitle sx={{cursor:'pointer'}} onClick={()=>{handleHomeRedirect()}}>
            <Image src={InsightifiLogo} alt='InsightifiLogo' />
          </HeaderTitle>
        </StyledLink>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
