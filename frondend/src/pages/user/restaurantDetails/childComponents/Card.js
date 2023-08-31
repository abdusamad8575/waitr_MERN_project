import React from 'react'
import {Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'
const Cards = ({details}) => {
  return (
    <>
      <Card sx={{ maxWidth: "100%"}}>
            <CardActionArea>
              <CardMedia
                component="img"
                sx={{maxHeight:'450px'}}
                image={details?.images[0]}
                alt="green"
              />
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
