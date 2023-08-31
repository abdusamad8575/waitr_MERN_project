import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'
// import { autoPlay } from 'react-swipeable-views-utils';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Cards = ({ details }) => {
  return (
    <>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
          <CardMedia
                component="img"
                sx={{maxHeight:'450px'}}
                image={details?.images[0]}
                alt="green"
              />
          {/* <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {details.images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: 'block',
                      maxWidth: 400,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews> */}
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
