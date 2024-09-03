/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useMutation } from 'react-query'

import { useDispatch, useSelector } from 'react-redux'
import { removeAuthToken, selectUser, setCompanyData, setUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'
import useAxios from 'src/shared/utility/services/hooks/useAxios'
import { authorization } from './route'

const {
  register,
  verify,
  login,
  inviteSetPassword,
  blogUpload,
  user,
  invite,
  logout,
  contactUs,
  userUpdatePassword,
  forgotPassword,
  verifyOtp,
  updateForgotPassword,
  client,
  employee,
  company,
  powerbi,
  changeemail,
  verifychangeEmail,
  sausers,
  analysis
} = authorization

export const useSignup = () => {
  const { url } = register.post

  return useMutation(data => axios.post(url, data).then(response => response.data))
}

export const useVerifyEmail = () => {
  const { url } = verify.post

  return useMutation(data => axios.post(url, data).then(response => response.data))
}

export const useLogin = () => {
  const { url } = login.post

  return useMutation(data => axios.post(url, data).then(response => response.data))
}

export const useLogout = () => {
  const { url } = logout.post

  return useMutation(data =>
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${data?.authToken}`
        }
      })
      .then(response => response.data)
  )
}

export const useContactUs = () => {
  const { url } = contactUs.post

  return useMutation(data => axios.post(url, data).then(response => response.data))
}

export const BlogUpload = () => {
  const callApi = useAxios()

  const { url, method } = blogUpload.post

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    }).then(response => {
      return response
    })
  })
}

export const useInviteeSetPassword = () => {
  const callApi = useAxios()
  const dispatch = useDispatch()

  const { url, method } = inviteSetPassword.post

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      data // Include request data for POST request
    }).then(response => {
      dispatch(removeAuthToken())

      return response
    })
  })
}

export const useUserUpdatePassword = () => {
  const callApi = useAxios()

  const { url, method } = userUpdatePassword.post

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      data // Include request data for POST request
    }).then(response => {
      return response
    })
  })
}

export const useUserForgotPassword = () => {
  const { url } = forgotPassword.post

  return useMutation(data =>
    axios.post(url, data).then(response => {
      return response.data
    })
  )
}

export const useUserVerifyOtp = () => {
  const { url } = verifyOtp.post

  return useMutation(data =>
    axios.post(url, data).then(response => {
      return response.data
    })
  )
}

export const useUserUpdateForgotPassword = () => {
  const { url } = updateForgotPassword.post

  return useMutation(data =>
    axios.post(url, data).then(response => {
      return response.data
    })
  )
}

export const useUserMe = () => {
  const callApi = useAxios()
  const dispatch = useDispatch()
  const { url, method } = user.get

  return useMutation(() => {
    return callApi({
      method: method,
      url: url
    }).then(data => {
      dispatch(setUser(data?.data?.user))

      return data
    })
  })
}

export const useUpdateUser = () => {
  const callApi = useAxios()
  const { url, method } = user.put

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      data
    }).then(data => {
      return data
    })
  })
}

export const useGetCompany = () => {
  const callApi = useAxios()
  const dispatch = useDispatch()

  const { url, method } = company.get
  const user = useSelector(selectUser)
  const unAuthUser = [userRole?.superAdmin, userRole?.organizationAdmin, userRole?.organizationEmployee]

  return useMutation(data => {
    return callApi({
      method: method,
      params: data,
      url: url
    }).then(data => {
      if (!unAuthUser?.includes(user?.role)) {
        var companyDetails = data?.data?.list?.[0]
        var companyObject = companyDetails?.Company
        dispatch(setCompanyData(companyObject))
      }

      return data
    })
  })
}

export const useUpdateCompany = () => {
  const callApi = useAxios()
  const { url, method } = company.put

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      data
    }).then(data => {
      return data
    })
  })
}

export const useInvite = () => {
  const callApi = useAxios()
  const { url, method } = invite.post

  return useMutation(data => {
    return callApi({
      method: method,
      url: url,
      data
    }).then(data => {
      return data
    })
  })
}

export const useSuperAdminUsers = () => {
  const callApi = useAxios()
  const { url, method } = sausers.get

  return useMutation(data => {
    return callApi({
      url: url,
      params: data,
      method: method
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log('Error :', error)
      })
  })
}

export const useApproved = () => {
  const callApi = useAxios()
  const { url, method } = sausers.put

  return useMutation(data => {
    return callApi({
      method: method,
      url: `${url}/${data.params}`,
      data: data?.value
    }).then(data => {
      return data
    })
  })
}

export const useClient = () => {
  const callApi = useAxios()
  const { url, method } = client.get

  return useMutation(data => {
    return callApi({
      url: url,
      params: data,
      method: method
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log('Error :', error)
      })
  })
}

export const useEmployee = () => {
  const callApi = useAxios()
  const { url, method } = employee.get

  return useMutation(data => {
    return callApi({
      url: url,
      params: data,
      method: method
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log('Error :', error)
      })
  })
}

export const useDeleteEmployee = () => {
  const callApi = useAxios()
  const { url, method } = employee.delete

  return useMutation(userId => {
    return callApi({
      url: `${url}/${userId}`,
      method: method
    }).then(response => {
      return response
    })
  })
}

export const usePowerBi = () => {
  const callApi = useAxios()
  const { url, method } = powerbi.get

  return useMutation(data => {
    return callApi({
      url: url,
      params: data,
      method: method
    })
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log('Error :', error)
      })
  })
}

export const useAddPowerBi = () => {
  const callApi = useAxios()
  const { url, method } = powerbi.post

  return useMutation(data => {
    return callApi({
      url: url,
      method: method,
      data
    }).then(response => {
      return response
    })
  })
}

export const useUpdatePowerBi = () => {
  const callApi = useAxios()
  const { url, method } = powerbi.put

  return useMutation(data => {
    return callApi({
      url: `${url}/${data?.id}`,
      method: method,
      data: data?.payload
    }).then(response => {
      return response
    })
  })
}

export const useDeletePowerBi = () => {
  const callApi = useAxios()
  const { url, method } = powerbi.delete

  return useMutation(data => {
    return callApi({
      url: `${url}/${data}`,
      method: method
    }).then(response => {
      return response
    })
  })
}

export const useChangeEmail = () => {
  const callApi = useAxios()
  const { url, method } = changeemail.put

  return useMutation(data => {
    return callApi({
      url: url,
      method: method,
      data
    }).then(response => {
      return response
    })
  })
}

export const useVerifyChangeEmail = () => {
  const callApi = useAxios()
  const { url, method } = verifychangeEmail.post

  return useMutation(data => {
    return callApi({
      url: url,
      method: method
    }).then(response => {
      return response
    })
  })
}

export const useDashboardAnalysis = () => {
  const callApi = useAxios()
  const { url, method } = analysis.get

  return useMutation(() => {
    return callApi({
      url: url,
      method: method
    }).then(response => {
      return response.data
    })
  })
}
