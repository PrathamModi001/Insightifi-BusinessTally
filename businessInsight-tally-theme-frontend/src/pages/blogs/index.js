import BlogsPage from 'src/container/BlogsPage'

import BlankLayout from 'src/@core/layouts/BlankLayout'

BlogsPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default BlogsPage
