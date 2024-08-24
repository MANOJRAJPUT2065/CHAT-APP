import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser'
const generateTokenAndSetCookie = (userId, res) => {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'  // Token expiration time
    });

    // Set the JWT token as a cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,    // Prevent client-side access to the cookie
        sameSite: 'strict', // Mitigate CSRF attacks
       // secure: process.env.NODE_ENV === 'production' // Only use cookies over HTTPS in production
    });
};

export default generateTokenAndSetCookie;
