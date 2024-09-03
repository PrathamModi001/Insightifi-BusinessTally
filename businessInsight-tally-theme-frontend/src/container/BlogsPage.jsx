import React from 'react'
import { blogs } from '../shared/utility/helpers'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material'
import styles from './landingPage.module.css'

import bannerImg from '../assets/images/blogBanner.svg'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import { useRouter } from 'next/router'
import { getMaxWord } from 'src/@core/layouts/utils'

const BlogsPage = () => {
  const navigate = useRouter()

  const handleReadMoreButtonClick = id => {
    navigate.push(`/blogs/${id}`)
  }

  return (
    <>
      <Box sx={{ paddingTop: '85px' }}>
        <Box className={styles.blogMain_container}>
          <Box className={styles.bannerContainer}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography sx={{ color: '#FFFFFF' }} variant='h4' component='h1' gutterBottom>
                Blogs
              </Typography>
              <span style={{ width: '100px', height: '1px', backgroundColor: '#ffffff', marginLeft: '10px' }}></span>
            </Box>
            <CardMedia component='img' className={styles.blogBannerImg} image={bannerImg.src} alt='Blog-image' />
          </Box>

          <Box className={styles.card_container}>
            {blogs?.map((blog, index) => (
              <Grid item key={blog.title} xs={12} md={4}>
                <Card className={styles.card_item}>
                  <CardMedia
                    component='img'
                    className={styles.cardMediaImage}
                    image={blog.image.src}
                    alt={blog.title}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography sx={{ lineHeight: '24px', fontWeight: '700' }} variant='h5' component='div'>
                      {blog.title}
                    </Typography>
                    <Box className={styles.subTilteSection}>
                      <Typography sx={{ lineHeight: '18px', fontWeight: '500' }} variant='p' component='p'>
                        {blog.subTitle}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {blog.date} • {blog.readTime}
                      </Typography>
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                      {getMaxWord(blog.description, 20)}...
                    </Typography>
                    <Button
                      size='small'
                      sx={{
                        backgroundColor: '#FF5959',
                        color: '#ffffff',
                        paddingLeft: '16px',
                        marginTop: '10px',
                        paddingRight: '24px',
                        maxWidth: '150px',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          color: '#FF5959'
                        }
                      }}
                      onClick={e => {
                        handleReadMoreButtonClick(blog?.id)
                      }}
                    >
                      Read more...
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
      <FooterNoAuth />
    </>
  )
}

export default BlogsPage
