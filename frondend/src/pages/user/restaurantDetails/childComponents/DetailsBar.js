import React from 'react'

import { Typography, Box, Paper, Grid, Stack } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const DetailsBar = () => {
    const [value, setValue] = React.useState();
    console.log('date',value);
    return (
        <div>
            <Paper variant="outlined" elevation={3}>
                <Box sx={{ height: '40px', backgroundColor: 'black', borderRadius: '5px 5px 0 0' }}>
                    <Typography
                        variant="h6"
                        color="#fff"
                        sx={{ textAlign: 'center', paddingTop: '5px', }}>
                        Details
                    </Typography>
                </Box>
                <Grid container p={2}>
                    <Grid item >
                        <Stack spacing={2}>
                            <Typography variant='body2'>Select Date</Typography>
                            <Typography variant='body1'>{value ? value.$d.toDateString() : new Date().toDateString()}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar disablePast value={value} onChange={(newValue) => setValue(newValue)}/>
                            </LocalizationProvider>
                        </Stack>

                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default DetailsBar
