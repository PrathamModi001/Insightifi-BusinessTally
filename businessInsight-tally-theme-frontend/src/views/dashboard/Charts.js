// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// import { LineChart } from '@mui/x-charts/LineChart';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports

const LineCharts = () => {
    // ** Hook
    const theme = useTheme()

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 9,
                distributed: true,
                columnWidth: '40%',
                endingShape: 'rounded',
                startingShape: 'rounded'
            }
        },
        stroke: {
            width: 2,
            colors: [theme.palette.background.paper]
        },
        legend: { show: false },
        grid: {
            strokeDashArray: 7,
            padding: {
                top: -1,
                right: 0,
                left: -12,
                bottom: 5
            }
        },
        dataLabels: { enabled: false },
        colors: [
            theme.palette.background.default,
            theme.palette.background.default,
            theme.palette.background.default,
            theme.palette.primary.main,
            theme.palette.background.default,
            theme.palette.background.default
        ],
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            tickPlacement: 'on',
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
                offsetX: -17,
                formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
            }
        }
    }

    return (
        <Card>
            <CardHeader
                title='Weekly Overview'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
                action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                        <DotsVertical />
                    </IconButton>
                }
            />
            <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
                {

                    // <LineChart
                    //     xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    //     series={[
                    //         {
                    //             data: [2, 5.5, 2, 8.5, 1.5, 5],
                    //             area: true,
                    //         },
                    //     ]}
                    //     width={500}
                    //     height={300}
                    // />
                }
                <Typography variant='h2'>Chart</Typography>
                <Typography variant='h4'>Design Here</Typography>
                <br/>
                <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h5' sx={{ mr: 4 }}>
                        45%
                    </Typography>
                    <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
                </Box>
                <Button fullWidth variant='contained'>
                    Details
                </Button>
            </CardContent>
        </Card>
    )
}

export default LineCharts
