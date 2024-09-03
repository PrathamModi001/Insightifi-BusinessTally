// ** Icon imports
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import Table from 'mdi-material-ui/Table'
import { store } from 'src/redux/store'
import AddIcon from '@mui/icons-material/Add'

const defaultRoutes = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/'
  },
  {
    title: 'Account Settings',
    icon: AccountCogOutline,
    path: '/account-settings'
  },
  {
    title: 'Clients',
    icon: AccountGroup,
    path: '/clients'
  },
  {
    sectionTitle: 'Pages'
  },
  {
    title: 'Login',
    icon: Login,
    path: '/',
    openInNewTab: true
  },
  {
    title: 'Register',
    icon: AccountPlusOutline,
    path: '/register',
    openInNewTab: true
  },
  {
    title: 'Error',
    icon: AlertCircleOutline,
    path: '/error',
    openInNewTab: true
  },
  {
    sectionTitle: 'User Interface'
  },
  {
    title: 'Typography',
    icon: FormatLetterCase,
    path: '/pages/typography'
  },
  {
    title: 'Icons',
    path: '/pages/icons',
    icon: GoogleCirclesExtended
  },
  {
    title: 'Cards',
    icon: CreditCardOutline,
    path: '/pages/cards'
  },
  {
    title: 'Tables',
    icon: Table,
    path: '/pages/tables'
  },
  {
    icon: CubeOutline,
    title: 'Form Layouts',
    path: '/pages/form-layouts'
  }
]

const organizationAdmin = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/dashboard'
  },

  {
    title: 'Clients',
    icon: AccountGroup,
    path: '/clients'
  },
  {
    title: 'Employee',
    icon: BadgeOutlinedIcon,
    path: '/employee'
  }
]

const organizationEmployee = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/dashboard'
  },

  {
    title: 'Clients',
    icon: AccountGroup,
    path: '/clients'
  },
  {
    title: 'Employee',
    icon: BadgeOutlinedIcon,
    path: '/employee'
  }
]

const companyAdmin = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/dashboard'
  },

  {
    title: 'Employee',
    icon: BadgeOutlinedIcon,
    path: '/employee'
  },
  {
    title: 'Add Data Souce',
    icon: AddIcon,
    path: '/data-source'
  }
]

const companyEmployee = [
  {
    title: 'Dashboard',
    icon: HomeOutline,
    path: '/dashboard'
  },

  {
    title: 'Employee',
    icon: BadgeOutlinedIcon,
    path: '/employee'
  }
]

const superAdmin = [
  {
    title: 'Partners',
    icon: HomeOutline,
    path: '/users'
  },
  {
    title: 'Analytics & Reports',
    icon: Diversity3Icon,
    path: '/sa-powerbi'
  },
  {
    title: 'Blogs',
    icon: BadgeOutlinedIcon,
    path: '/blogsUpload'
  }
]

const rolesRelatedSidebarMenu = {
  organizationAdmin,
  organizationEmployee,
  companyAdmin,
  companyEmployee,
  superAdmin
}

const navigation = () => {
  const user = store.getState().user

  return rolesRelatedSidebarMenu[user?.userData?.role]
}

export default navigation
