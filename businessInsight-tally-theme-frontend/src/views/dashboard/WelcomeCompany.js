// ** MUI Imports
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { useSelector } from 'react-redux'
import { selectCompany, selectUser } from 'src/redux/reducers/authSlice'
import { userRole } from 'src/shared/utility/helpers'

const WelcomeCompany = () => {
    const companyData = useSelector(selectCompany)
    const theme = useTheme()
    const user = useSelector(selectUser)
    const unAuthUser = [userRole?.superAdmin, userRole?.organizationAdmin, userRole?.organizationEmployee]

    const welcomeName = !unAuthUser?.includes(user?.role) ? companyData.name : user.firstname + " " + user.lastname

    return (
        <Card sx={{
            padding: '20px 60px', [theme.breakpoints.down(600)]: {
                padding: '20px 20px'
            },
}}>
            <CardHeader
                sx={{ padding: '0px' }}
                subheader={
                    <Box sx={{
                        display: 'flex', alignItems: 'baseline', gap: '8px', color: 'text.primary', flexDirection: 'row', [theme.breakpoints.down(900)]: {
                            flexDirection: 'column',
                            gap: '15px'
                        }
                    }}>
                        <Typography sx={{
                            fontWeight: 400, fontSize: '32px !important', lineHeight: '69px', [theme.breakpoints.down(600)]: {
                                fontSize: '28px !important',
                                lineHeight: '28px'
                            },
                            [theme.breakpoints.down(500)]: {
                                fontSize: '30px !important',
                                lineHeight: '28px'
                            }
                        }}> Hey {welcomeName}, </Typography>
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '8px',
                            [theme.breakpoints.down(450)]: {
                                flexDirection: 'column'
                                , gap: '15px'
                            }
                        }}>
                            <Typography sx={{
                                fontWeight: 600, fontSize: '32px !important', lineHeight: '69px', [theme.breakpoints.down(600)]: {
                                    fontSize: '28px !important',
                                    lineHeight: '28px'
                                },
                                [theme.breakpoints.down(500)]: {
                                    fontSize: '30px !important',
                                    lineHeight: '28px'
                                }
                            }}>Welcome to</Typography>
                            {" "}
                            <Typography sx={{
                                fontWeight: 600, fontSize: '54px !important', lineHeight: '69px', [theme.breakpoints.down(900)]: {
                                    fontSize: '44px !important',
                                    lineHeight: '44px'
                                },
                                [theme.breakpoints.down(600)]: {
                                    fontSize: '38px !important',
                                    lineHeight: '34px'
                                }
                            }}>Insightifi ! </Typography>
                        </Box>
                    </Box>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important'
                    }
                }}
            />

        </Card>
    )
}

export default WelcomeCompany
