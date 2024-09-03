import Dashboard from 'src/container/Dashboard'
import Power_Bi from 'src/container/Power-Bi'
import AuthLayout from 'src/layouts/AuthLayout'
import { userRole } from 'src/shared/utility/helpers'


import { useSelector } from 'react-redux'
import { selectUser } from 'src/redux/reducers/authSlice'

const Output = () => {
  const user = useSelector(selectUser)

  return (
    <AuthLayout pageName='dashboard'>
      {user?.role === userRole.organizationEmployee || user?.role === userRole.organizationAdmin ? <Dashboard /> : <Power_Bi />}
    </AuthLayout>
  )
}

export default Output
