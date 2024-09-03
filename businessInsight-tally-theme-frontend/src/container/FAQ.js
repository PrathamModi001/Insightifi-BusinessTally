// ** MUI Components
import { Box, Typography, useTheme, useMediaQuery, CardContent, Button } from '@mui/material'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import styles from './landingPage.module.css'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { CustomModal } from 'src/@core/components/modal'
import Form from './common/Form'
import * as Yup from 'yup'
import CustomButton from './common/Button'
import { useFormik } from 'formik'
import InputField from './common/InputField'

const FAQ = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [modalOpen, setModalOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      question: ''
    },
    validationSchema: Yup.object({
      question: Yup.string()
        .trim()
        .min(3, ' Question must be at least three characters long')
        .required('Please enter your question')
    }),
    onSubmit: values => {
      values.name = values.question.replace(/\s+/g, ' ').trim()
      handlePopUpClose()
      formik.resetForm()

      //mutate ask quetion
    }
  })

  const handlePopUpClose = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.containerBlockCenter}>
          <div className={styles.container}>
            <Box className={styles.section1Div} sx={{ height: '100% !important', background: 'white' }}>
              <Box
                sx={{
                  paddingTop: '100px',
                  paddingBottom: '100px',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
                className={styles.container}
              >
                <Box
                  sx={{
                    height: '100%',

                    //   border: '2px solid Black',
                    width: '100%'
                  }}
                >
                  <Box sx={{}}>
                    <h1
                      style={{
                        margin: '0',
                        padding: '20px 0 0 0',
                        textAlign: 'center'
                      }}
                    >
                      FAQ
                    </h1>
                  </Box>

                  <Box sx={{ width: '100%' }}>
                    <ul
                      style={{
                        width: '100%',
                        listStyleType: 'none',
                        padding: '0',
                        padding: isMobile ? '0 18px 0 18px' : '0'
                      }}
                    >
                      <li>
                        <h2>Is the data to be provided limited to any format ?</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          No, there is no static format of data to be followed, insightifi can generate tailored
                          dashboards with spreadsheets, Databases, ERP etc with help of credentials or in case of
                          spreadsheets- SOP will be provided by Team Insightifi. For further query, contact us.
                        </Typography>
                      </li>
                      <li>
                        <h2>Who can use insightifi ?</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Using Insightifi is not limited to a bunch of categories , whosoever having their data
                          collected in either digital format can use insightifi. Also a Partner can use insightifi to
                          keep an eye on data or business of his client base at a higher level by becoming a partner to
                          us. (CA, Associates, Finance personnel, Businessman, Sole proprietor etc.) can subscribe its
                          business on insightifi)
                        </Typography>
                      </li>
                      <li>
                        <h2>How can I join insightifi? As a business or as an individual?</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          If you are a CA or a finance professional having huge data of individuals in numericals or
                          reports then you can join as a business with insightifi. However, if you are an individual
                          with humongous data and want to see the pulse of your business solely then you can join as an
                          individual.
                        </Typography>
                      </li>
                      <li>
                        <h2>Is any preprocessing required at the customer end ?</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          No, we are here to do an end to end process with your data.Just provide raw data from the
                          source.
                        </Typography>
                      </li>
                      <li>
                        <h2> How secure is Insightifi?</h2>
                        <Typography sx={{ textAlign: 'justify' }}>
                          Security is a top priority for us. Insightifi includes built-in authentication and
                          authorization mechanisms, ensuring your data and user information are protected.
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  <CardContent sx={{ padding: 'unset' }}>
                    <Button onClick={() => setModalOpen(true)} variant='contained' startIcon={<AddIcon />}>
                      Ask your question
                    </Button>
                  </CardContent>
                  {modalOpen && (
                    <CustomModal open={modalOpen} onClose={handlePopUpClose}>
                      <Typography variant='h5' sx={{ fontWeight: 600, padding: '1.5rem', textAlign: 'center' }}>
                        Add Your question
                      </Typography>
                      <Form onSubmit={formik.handleSubmit}>
                        <InputField size='small' label='Write your question' name='question' formikData={formik} />
                        <Box
                          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}
                        >
                          <CustomButton type='submit'>Submit</CustomButton>
                        </Box>
                      </Form>
                    </CustomModal>
                  )}
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <FooterNoAuth />
    </>
  )
}

export default FAQ
