import UploadBlog from 'src/container/BlogUpload/UploadBlog'

import AuthLayout from 'src/layouts/AuthLayout'

const Output = () => {
  return (
    <AuthLayout pageName='blogsUpload'>
      <UploadBlog />
    </AuthLayout>
  )
}

export default Output
