import React from 'react'

import { Typography, Box, Paper, Grid, Stack ,AppBar,Tabs,Tab, Button} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';


import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    console.log("cxcx", children, value, index, other);
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    console.log("index",index);
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const DetailsBar = ({details}) => {
  console.log("54sa:-",details.startTime);
    const [value, setValue] = React.useState();
    console.log('date', value);

    const theme = useTheme();
  const [values, setValues] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  const handleChangeIndex = (index) => {
    setValues(index);
  };


    return (
        <div>
            <Scrollbar style={{ height: '500px' }}>
            <Paper variant="outlined" elevation={3} >
                <Box sx={{ height: '40px', backgroundColor: 'black', borderRadius: '5px 5px 0 0' }}>
                    <Typography
                        variant="h6"
                        color="#fff"
                        sx={{ textAlign: 'center', paddingTop: '5px', }}>
                        Details
                    </Typography>
                </Box>
                <Grid container p={1} >
                    <Grid item sx={{ width: '100%' }}>
                        <Stack spacing={2} sx={{ alignItems: 'center' }}>
                            <Typography variant='body2'>Select Date</Typography>
                            <Typography variant='body1'>{value ? value.$d.toDateString() : new Date().toDateString()}</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar disablePast value={value} onChange={(newValue) => setValue(newValue)} />
                            </LocalizationProvider>
                        </Stack>

                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                        <Box sx={{ bgcolor: 'background.paper', width: '100%'}}>
                            <AppBar position="static">
                                <Tabs
                                    value={values}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                  {/* {details.mealsType.forEach((element,index) => {
                                  console.log(element , index);
                                    <Tab label = {element} {...a11yProps(index)} />
                                })} */}
                                    <Tab label="Breakfast" {...a11yProps(0)} />
                                    <Tab label="Lunch" {...a11yProps(1)} />
                                    <Tab label="Dinner" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={values}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={values} index={0} dir={theme.direction}>
                                 {details.startTime } <Button>5:30</Button>
                                </TabPanel>
                                <TabPanel value={values} index={1} dir={theme.direction}>
                                    Lunch
                                </TabPanel>
                                <TabPanel value={values} index={2} dir={theme.direction}>
                                    Dinner
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </Grid>

                </Grid>
            </Paper>
            </Scrollbar>
        </div>
    )
}

export default DetailsBar
