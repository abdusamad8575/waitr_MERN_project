import React from 'react'
import { Card, CardContent, Typography, CardActionArea } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const Cards = ({ details }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  };


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
                      maxHeight: { xs: '200px', lg: '450px' ,md:'450px',sm:'350px'},
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


          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {details?.restaurantName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default Cards
