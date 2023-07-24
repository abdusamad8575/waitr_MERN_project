const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token24=" + token);
    if (!token) {
        console.log('no token');
        return res.status(404).json({ message: 'No token found' });
    } else {
        console.log('token is valid');
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
              console.log(err.name)
              if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again' });
              }
              return res.status(400).json({ message: 'Invalid Token' });
            }
        
            console.log('id', user.id);
            req.id = user.id;
            next();
          });
    }
}
module.exports = {
    verifyToken,
}