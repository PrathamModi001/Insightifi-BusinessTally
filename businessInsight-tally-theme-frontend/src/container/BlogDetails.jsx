import React, { useEffect } from 'react'
import styles from './BlogDetails.module.css'
import FirstBlog from './BlogViews/FirstBlog'
import ForthBlog from './BlogViews/ForthBlog'
import FiveBlog from './BlogViews/FiveBlog'
import ThirdBlog from './BlogViews/ThirdBlog'
import SecondBlog from './BlogViews/SecondBlog'
import { useRouter } from 'next/router'

import { blogs } from '../shared/utility/helpers'
import { useState } from 'react'
import FooterNoAuth from 'src/@core/layouts/landingComponent/noAuthFooter'
import BlogComp from './BlogComp'

const BlogDetails = () => {
  const [blogsDataById, setBlogsDataById] = useState()

  const navigate = useRouter()
  const blogCardId = parseInt(navigate?.query?.id)

  const setBlogsData = id => {
    const data = blogs.filter(blog => blog?.id !== id)
    setBlogsDataById(data)
  }

  useEffect(() => {
    setBlogsData(blogCardId)
  }, [blogCardId])

  return (
    <div className={styles.firstDiv}>
      <div className={styles.containerBlockCenter}>
        <div className={styles.container}>
          {blogCardId === 1 && (
            <>
              <FirstBlog />
              <BlogComp title='Related Blogs' isDetailsPage={true} blogs={blogsDataById} />
            </>
          )}
          {blogCardId === 2 && (
            <>
              <SecondBlog />
              <BlogComp title='Related Blogs' isDetailsPage={true} blogs={blogsDataById} />
            </>
          )}
          {blogCardId === 3 && (
            <>
              <ThirdBlog />
              <BlogComp title='Related Blogs' isDetailsPage={true} blogs={blogsDataById} />
            </>
          )}
          {blogCardId === 4 && (
            <>
              <ForthBlog />
              <BlogComp title='Related Blogs' isDetailsPage={true} blogs={blogsDataById} />
            </>
          )}
          {blogCardId === 5 && (
            <>
              <FiveBlog />
              <BlogComp title='Related Blogs' isDetailsPage={true} blogs={blogsDataById} />
            </>
          )}
        </div>
      </div>
      <FooterNoAuth />
    </div>
  )
}

export default BlogDetails
