import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUser } from 'src/redux/reducers/authSlice'

const superAdmin = ['users', 'accountSettings', 'sa-powerbi', 'powerBi', 'blogsUpload']
const organizationAdmin = ['dashboard', 'accountSettings', 'clients', 'employee', 'powerBi']
const organizationEmployee = ['dashboard', 'accountSettings', 'clients', 'employee', 'powerBi']
const companyAdmin = ['dashboard', 'accountSettings', 'clients', 'employee', 'dataSource']
const companyEmployee = ['dashboard', 'accountSettings', 'employee']

const roleAccessConfig = {
  superAdmin,
  organizationAdmin,
  organizationEmployee,
  companyAdmin,
  companyEmployee
}

const AuthLayout = ({ children, pageName }) => {
  // ** Hooks
  const router = useRouter()
  const user = useSelector(selectUser)
  const haveAccess = roleAccessConfig[user?.role]?.includes(pageName)

  if (!user) {
    router.push('/')
  } else if (user && !haveAccess) {
    router.push('/401')
  }

  return user ? children : <></>
}

export default AuthLayout
