import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import styles from './landingPage.module.css'

import BlogComp from './BlogComp'
import { blogs } from '../shared/utility/helpers'

const BlogComponent = () => {
  return (
    <Container maxWidth='lg' style={{ marginTop: '20px' }}>
      <Box className={styles.blogSection}>
        <Typography
          variant='h4'
          component='h2'
          sx={{ fontWeight: 'bold', mb: 4 }}
          className={styles.landingPageBlogText}
        >
          The Future is Insightful !!
        </Typography>
        <Typography variant='body1' className={styles.landingPageBlogText}>
          As "Insightifi" evolves, it aims to become more than just an analytics platform. It strives to be a partner in
          your business growth, providing insights that are not only relevant but also predictive. With "Insightifi",
          the future of your business is not just data-driven but insight-driven.
        </Typography>
      </Box>

      {/* Blogs Section */}
      <BlogComp title='Blogs' isDetailsPage={false} blogs={blogs} />
    </Container>
  )
}

export default BlogComponent
