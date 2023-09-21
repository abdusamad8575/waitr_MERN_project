import React from 'react'
import { Card, CardContent, Typography, CardActionArea, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import { timeChanges } from '../../../../utils/timeframe';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const Cards = ({ details }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  console.log("details:-", details);
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {details.images.map((step, index) => (
              <div key={step}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      maxHeight: { xs: '200px', lg: '450px', md: '450px', sm: '350px' },
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step}
                    alt={step}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>


          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'start' } }}>
            <Typography gutterBottom variant="h6" component="div">
              {details?.restaurantName}
            </Typography>
            <Grid container >
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'start' } }}>
                <Grid container >
                  <Grid item xs={12} sm={8} sx={{ display: "flex", justifyContent: { xs: 'center', sm: 'start' } }}>
                    <Typography variant="body2" color="text.secondary">
                      {details?.location}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'end' } }} xs={12} sm={4} >
                    <Typography variant="body2" color="text.secondary" xs={6} >
                      {timeChanges(details.startTime)} -
                    </Typography>
                    <Typography variant="body2" color="text.secondary" xs={6}>
                      {timeChanges(details.endTime)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'start' } }}>
                
                  {details.daysOfWeek[0] === '' ? <Typography variant="body2" color="text.secondary" xs={6}>Opens In Every Day</Typography> : <Typography variant="body2" color="text.secondary" xs={6}>Off Days:{details.daysOfWeek.map((value)=>`${value} `)}</Typography>}
                
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card >
    </>
  )
}

export default Cards
