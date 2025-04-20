import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Box, TextField } from '@mui/material';

import { Header, CustomButton } from '../../Components';
import './qr.css'

const QRCodeGenerator = () => {
    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <>
            <Header navigate={navigate} />
            <Box 
            className='QR'
            >
                <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <form onSubmit={handleSubmit} style={{ textAlign: 'center', display: 'flex' }}>
                        <TextField
                            type='url'
                            name='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter the URL"
                            variant="outlined"
                            sx={{ width: '300px', mb: 2, mt:10 }}
                        />
                        <br />
                        <CustomButton
                            type="submit"
                            variant="contained"
                            sx={{ width: '130px', mb: 2, ml: 2, mt:10 , whiteSpace: 'nowrap', textTransform: 'none' }}
                        >
                            Generate QR Code
                        </CustomButton>
                    </form>

                    {show && url && (
                        <Box mt={3}>
                            <QRCode value={url} bgColor='transparent' />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default QRCodeGenerator;