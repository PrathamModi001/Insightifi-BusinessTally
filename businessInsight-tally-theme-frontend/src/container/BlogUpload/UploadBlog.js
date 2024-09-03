// components/UploadBlog.js
import FileUpload from './FileUpload'
import { Button, CardContent, Divider, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import TextEditor from './TextEditor'
import * as Yup from 'yup'
import { BlogUpload } from 'src/shared/utility/services/hooks/register'
import { useState } from 'react'

function UploadBlog() {
  const { mutate: blogMutate } = BlogUpload()
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')

  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required')
    }),
    onSubmit: values => {
      blogMutate(values)
    }
  })

  const handleSubmit = e => {
    formik.setFieldValue('content', content)
    formik.setFieldValue('image', files[0])
    formik.handleSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <CardContent>
          <Typography sx={{ mb: 4 }} variant='h5'>
            Upload Blog
          </Typography>
          <FileUpload setFiles={setFiles} files={files} />
          <Typography sx={{ mb: 2, fontWeight: 'bold' }} variant='h6'>
            Title
          </Typography>
          <TextField
            fullWidth
            name='title'
            placeholder='Add text here'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <Divider />
          <Typography sx={{ mb: 2, fontWeight: 'bold' }} variant='h6'>
            Add Content
          </Typography>
          <TextEditor setHtml={setContent} />
        </CardContent>
      </Paper>
      <Button type='submit' variant='contained' sx={{ mt: 3 }}>
        Upload
      </Button>
    </form>
  )
}

export default UploadBlog
