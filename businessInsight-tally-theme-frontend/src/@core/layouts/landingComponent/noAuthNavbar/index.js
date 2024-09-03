// ** MUI Components
import MenuIcon from '@mui/icons-material/Menu'
import { Button, createTheme, ThemeProvider } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import InsightifiLogo from 'src/assets/images/InsightifiLogo.svg'
import styles from './styles.module.css'

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: '20px !important'
        }
      }
    }
  }
})

const LandingNav = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleHome = () => {
    router.push('/')
    setAnchorEl(null)
  }

  const handleSignUp = () => {
    router.push('/register')
    setAnchorEl(null)
  }

  const handleSignIn = () => {
    router.push('/login')
    setAnchorEl(null)
  }

  const handleBlog = () => {
    router.push('/blogs')
    setAnchorEl(null)
  }

  const pathName = router?.pathname

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className={`${styles.containerBlockCenter} ${styles.navPosition}`}>
        <div className={styles.container}>
          <div className={styles.navDiv}>
            <div className={styles.LeftBlock}>
              <Image src={InsightifiLogo} alt='InsightifiLogo' onClick={() => handleHome()} />
            </div>
            <div className={styles.containerBlockAlignCenter}>
              <div className={styles.navList}>
                <div className={styles.navListDiv}>
                  <div
                    className={`${styles.navListFont} ${styles.pointer} ${pathName === '/' && styles.openTab}`}
                    onClick={() => handleHome()}
                  >
                    Home
                  </div>
                  <div
                    className={`${styles.navListFont} ${styles.pointer} ${pathName === '/register' && styles.openTab}`}
                    onClick={() => handleSignUp()}
                  >
                    Sign up
                  </div>
                  <div
                    className={`${styles.navListFont} ${styles.pointer} ${pathName === '/login' && styles.openTab}`}
                    onClick={() => handleSignIn()}
                  >
                    Login
                  </div>
                  <div
                    className={`${styles.navListFont} ${styles.pointer} ${pathName === '/blogs' && styles.openTab}`}
                    onClick={() => handleBlog()}
                  >
                    Blogs
                  </div>
                </div>
                <div className={styles.navListDiv}>
                  <Button variant='contained' className={styles.navBtn} onClick={() => router.push('/contact-us')}>
                    Get in touch
                  </Button>
                </div>
              </div>
              <ThemeProvider theme={theme}>
                <div className={styles.navMenuDiv}>
                  <Button
                    id='basic-button'
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className={styles.navMenuIcon}
                  >
                    <MenuIcon style={{ size: '40px' }} />
                  </Button>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={() => handleHome()} className={styles.navMenuList}>
                      Home
                    </MenuItem>
                    <MenuItem onClick={() => handleSignUp()} className={styles.navMenuList}>
                      SignUp
                    </MenuItem>
                    <MenuItem onClick={() => handleSignIn()} className={styles.navMenuList}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => handleBlog()} className={styles.navMenuList}>
                      Blogs
                    </MenuItem>
                    <MenuItem className={styles.navMenuButtonDiv} onClick={() => router.push('/contact-us')}>
                      <Button className={styles.MenuBtn}>Get in touch</Button>
                    </MenuItem>
                  </Menu>
                </div>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingNav
