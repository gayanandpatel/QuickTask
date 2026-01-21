import { verify } from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the header
  const token = req.header('Authorization');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 2. Verify the token 
    const decoded = verify(token, process.env.JWT_SECRET);

    // 3. Attach the user ID to the request object
    req.user = decoded;
    next(); // Move to the next middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;