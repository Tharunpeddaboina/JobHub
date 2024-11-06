const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Check if the authorization header exists
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the JWT token from the authorization header
    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Generate and return a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { jwtAuthMiddleware, generateToken };
