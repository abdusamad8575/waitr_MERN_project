import React from 'react'
import './HomeContents.css';

function HomeContents() {
    return (
        <div className="homepage-container">
            <div className="article-section">
                <h3 className='MainHeader'>Download the Waitr App</h3>
                <div className="header">
                    <div className="logo1" />
                    <h6 className='h6Header'>Book a Table</h6>
                </div>
                <p className='pTag'>
                    Free reservations at 12000+ restaurants in Delhi, Mumbai, Bangalore,
                    Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Chandigarh, Goa,
                    Jaipur, Lucknow, Indore, Udaipur, Agra, Vadodara, Nagpur, Kochi,
                    Surat and Ludhiana.
                </p>
                <div className="header">
                    <div className="logo2" />
                    <h6 className='h6Header'>Waitr Pay</h6>
                </div>
                <p className='pTag'>
                    Pay your restaurant bills through the waitr app.
                </p>
                <div className='buttonDiv'>
                    <button className="custom-button">Download</button>
                    </div>
            </div>
            <div className="image-section">
                <img
                    src="/assets/img.webp"
                    alt="Sample"
                    width="300"
                    height="350"
                />
            </div>
        </div>
    )
}

export default HomeContents
