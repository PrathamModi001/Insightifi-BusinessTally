import { baseURL } from 'src/shared/utility/helpers'

export const authorization = {
  register: {
    post: {
      query: 'REGISTER',
      method: 'POST',
      url: `${baseURL}user/`
    }
  },
  login: {
    post: {
      query: 'LOGIN',
      method: 'POST',
      url: `${baseURL}user/login`
    }
  },
  logout: {
    post: {
      query: 'LOGOUT',
      method: 'POST',
      url: `${baseURL}user/logout`
    }
  },
  blogUpload: {
    post: {
      query: 'BLOG_UPLOAD',
      method: 'POST',
      url: `${baseURL}user/blog-upload`
    }
  },
  contactUs: {
    post: {
      query: 'CONTACT_US',
      method: 'POST',
      url: `${baseURL}user/contact-us`
    }
  },
  inviteSetPassword: {
    post: {
      query: 'INVITEE_SET_PASSWORD',
      method: 'POST',
      url: `${baseURL}invite/setpassword`
    }
  },
  verify: {
    post: {
      query: 'VERIFY',
      method: 'POST',
      url: `${baseURL}user/verify-email`
    }
  },
  user: {
    get: {
      query: 'USER',
      method: 'GET',
      url: `${baseURL}user`
    },
    put: {
      query: 'USER',
      method: 'PUT',
      url: `${baseURL}user`
    }
  },
  invite: {
    post: {
      query: 'INVITE',
      method: 'POST',
      url: `${baseURL}invite`
    }
  },
  userUpdatePassword: {
    post: {
      query: 'USER_UPDATE_PASSWORD',
      method: 'POST',
      url: `${baseURL}user/update-password`
    }
  },
  forgotPassword: {
    post: {
      query: 'USER_FORGOT_PASSWORD',
      method: 'POST',
      url: `${baseURL}user/forgot-password`
    }
  },
  verifyOtp: {
    post: {
      query: 'USER_VERIFY_OTP',
      method: 'POST',
      url: `${baseURL}user/verify-otp`
    }
  },
  updateForgotPassword: {
    post: {
      query: 'USER_UPDATE_FORGOT_PASSWORD',
      method: 'POST',
      url: `${baseURL}user/update-forgot-password`
    }
  },
  client: {
    get: {
      query: 'USER_CLIENT',
      method: 'GET',
      url: `${baseURL}user/client`
    }
  },
  employee: {
    get: {
      query: 'USER_CLIENT',
      method: 'GET',
      url: `${baseURL}user/employee`
    },
    delete: {
      query: 'DELETE_EMPLOYEE',
      method: 'DELETE',
      url: `${baseURL}user/delete-employee`
    }
  },
  company: {
    get: {
      query: 'GET_COMPANY',
      method: 'GET',
      url: `${baseURL}company`
    },
    put: {
      query: 'UPDATE_COMPANY',
      method: 'PUT',
      url: `${baseURL}company`
    }
  },
  powerbi: {
    get: {
      query: 'POWER-BI',
      method: 'GET',
      url: `${baseURL}power-bi/`
    },
    post: {
      query: 'ADD-POWER-BI',
      method: 'POST',
      url: `${baseURL}power-bi/`
    },
    put: {
      query: 'UPDATE-POWER-BI',
      method: 'PUT',
      url: `${baseURL}power-bi/`
    },
    delete: {
      query: 'DELETE-POWER-BI',
      method: 'DELETE',
      url: `${baseURL}power-bi/`
    }
  },
  changeemail: {
    put: {
      query: 'UPDATE_EMAIL',
      method: 'PUT',
      url: `${baseURL}user/update-email`
    }
  },
  verifychangeEmail: {
    post: {
      query: 'VERIFY_CHANGE_EMAIL',
      method: 'POST',
      url: `${baseURL}user/verified-change-email`
    }
  },
  sausers: {
    get: {
      query: 'USERS',
      method: 'GET',
      url: `${baseURL}organization`
    },
    put: {
      query: 'USERS',
      method: 'PUT',
      url: `${baseURL}organization`
    }
  },
  analysis: {
    get: {
      query: 'GET_DASHBOARD_DATA',
      method: 'GET',
      url: `${baseURL}payment/analysis/`
    }
  }
}
