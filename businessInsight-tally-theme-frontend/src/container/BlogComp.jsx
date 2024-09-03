import React, { useEffect, useState } from 'react'

// import { blogs } from '../shared/utility/helpers'
import styles from './landingPage.module.css'
import { Container, Box, Grid, Typography, Card, CardMedia, CardContent, IconButton, Button } from '@mui/material'
import { useRouter } from 'next/router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useRef } from 'react'

const BlogComp = ({ isDetailsPage, title, blogs }) => {
  const navigate = useRouter()
  const carouselRef = useRef(null)
  const intervalRef = useRef(null)

  const handleRoute = () => {
    navigate.push('/blogs')
  }

  const handleBlogDetailsRoute = id => {
    navigate.push(`/blogs/${id}`)
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      scrollRight()
    }, 2000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <Box sx={{ padding: '0px 10px' }}>
      <Box display='flex' alignItems='center' flexDirection='column' mb={3}>
        <div className={styles.blogFeatureHeader}>{title}</div>
      </Box>
      {!isDetailsPage && (
        <Box className={styles.allBtn}>
          <Button onClick={handleRoute} variant='text' sx={{ textTransform: 'none' }}>
            See All
          </Button>
        </Box>
      )}
      {/* Blog Cards */}
      <Grid container spacing={4} className={styles.blogContainer}>
        <Grid item xs={1} display='flex' justifyContent='center' alignItems='center'>
          <IconButton onClick={scrollLeft}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10} className={styles.carouselWrapper}>
          <Box className={styles.carouselContainer} ref={carouselRef}>
            {blogs?.map(blog => (
              <div key={blog.title} className={styles.carouselItem}>
                <Card
                  sx={{ cursor: 'pointer' }}
                  className={styles.cardContainer}
                  onClick={() => handleBlogDetailsRoute(blog?.id)}
                >
                  <CardMedia
                    className={styles.imageBorderRadius}
                    component='img'
                    height='140'
                    image={blog.image.src}
                    alt={blog.title}
                  />
                  <div className={styles.contentContainer}>
                    <Typography sx={{ lineHeight: '24px', fontWeight: '700' }} variant='h6' component='h4'>
                      {blog.title}
                    </Typography>
                    <Box>
                      <Typography sx={{ marginTop: '12px' }}>{blog.author}</Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {blog.date} • {blog.readTime}
                      </Typography>
                    </Box>
                  </div>
                </Card>
              </div>
            ))}
          </Box>
        </Grid>
        <Grid item xs={1} display='flex' justifyContent='center' alignItems='center'>
          <IconButton onClick={scrollRight}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BlogComp
