import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 1. Get the token from the header
  const authHeader = req.header('Authorization');

  // Check if no token is present
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // 2. Format the token
  let token;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; 
  } else {
    // Fallback in case the client sends just the token without "Bearer"
    token = authHeader;
  }

  try {
    // 3. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user ID to the request object
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;