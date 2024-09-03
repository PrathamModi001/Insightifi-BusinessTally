// ** React Imports
import { Fragment } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/'

// Styled Components
/* const MaskImg = styled('img')(() => ({
  // bottom: 0,
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const Tree1Img = styled('img')(() => ({
  left: 0,
  bottom: 0,
  position: 'absolute'
}))

const Tree2Img = styled('img')(() => ({
  right: 0,
  bottom: 0,
  position: 'absolute'
})) */

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  maxWidth: '100%', // Constrain the maximum width of the image
  width: 'auto', // Ensure the image maintains its aspect ratio
  position: 'absolute'
}))

const Tree1Img = styled('img')(() => ({
  left: 0,
  bottom: 0,
  position: 'absolute',
  maxWidth: '50%', // Constrain the maximum width of the image to 50% of its container
  width: 'auto' // Ensure the image maintains its aspect ratio
}))

const Tree2Img = styled('img')(() => ({
  right: 0,
  bottom: 0,
  position: 'absolute',
  maxWidth: '50%', // Constrain the maximum width of the image to 50% of its container
  width: 'auto' // Ensure the image maintains its aspect ratio
}))

const FooterIllustrationsV1 = props => {
  // ** Props
  const { image1, image2 } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  if (!hidden) {
    return (
      <Fragment>
        {/* <div className={styles.footer}> */}
        {image1 || <Tree1Img alt='tree' src='/images/pages/auth-v1-tree.png' />}
        <MaskImg alt='mask' src={`/images/pages/auth-v1-mask-${theme.palette.mode}.png`} />
        {image2 || <Tree2Img alt='tree-2' src='/images/pages/auth-v1-tree-2.png' />}
        {/* </div> */}
      </Fragment>
    )
  } else {
    return null
  }
}

export default FooterIllustrationsV1
