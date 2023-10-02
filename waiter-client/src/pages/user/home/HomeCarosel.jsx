import React, { useState, useEffect } from "react";
import ReactCardCarousel from "react-card-carousel";

  function MyCarousel() {
  const CONTAINER_STYLE = {
    marginTop:'10px',
    position: "relative",
    height: "50vh",
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
  };

  const CARD_STYLE = {
    height: "270px",
    width: "245px",  
    // paddingTop: "80px",
    textAlign: "center",
    background: "#f9fafb",
    color: "#FFF",
    fontFamily: "sans-serif",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "10px",
    boxSizing: "border-box",
  };

  const images=[
    'https://i.pinimg.com/originals/c8/dd/a4/c8dda499474c2608ea0ec01679cb27c6.png',
    'https://cdn.dribbble.com/users/80266/screenshots/15531157/media/815ce598cfd9cb96b3d5c5081a54a2c6.png?resize=800x600&vertical=center',
    'https://items.epicpxls.com/uploads/photo/20f4d0f794aad0db46f592f712ddbcba'
  ]
  // You can use the `useState` hook to manage state
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAutoplay(true); // Enable autoplay
    }, 2500);

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, []);

  return (
    <div style={CONTAINER_STYLE}>
      <ReactCardCarousel autoplay={autoplay} autoplay_speed={2500}>
       {images.map((value)=>
       ( <div style={CARD_STYLE}>
       <img src={value} style={{height:'100%',width:'100%',borderRadius:'10px'}}/>
   </div>)
       )  }
      </ReactCardCarousel>
    </div>
  );
}

export default MyCarousel;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<MyCarousel />, rootElement);
