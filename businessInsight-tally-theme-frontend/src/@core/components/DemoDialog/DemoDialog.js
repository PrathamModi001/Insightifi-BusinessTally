import React from 'react';
import { CustomModal } from '../modal';
import { Box, Typography } from '@mui/material';
import ErrorLogo from 'src/assets/images/error.png'
import Image from 'next/image';
import { useTheme } from '@mui/material/styles'

const DemoDialog = ({ open, close }) => {
    const theme = useTheme()

    const handleClose = () => {
        close(false)
    }

    return (
        <CustomModal open={open} onClose={handleClose} header='Employee'>
            <div style={{ mb: 6 }}>
                <Box sx={{display:'flex', justifyContent:'center'}}>
                    <Image src={ErrorLogo} alt="ErrorLogo" width={48} />
                </Box>
                <Typography variant='h5' sx={{
                    fontWeight: 600, padding: '2rem 1rem',
                    [theme.breakpoints.down(570)]: {
                        fontSize: '16px',
                    } }}>
                    You are using Demo Account right now so you can't change anything.
                </Typography>
            </div>
        </CustomModal>
    );
};

export default DemoDialog;
