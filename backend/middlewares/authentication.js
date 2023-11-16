const jwt = require("jsonwebtoken");

async function handleauth(req, res, next) {
  try {
    const authHeader = req.header("Authorization"); // Use 'Authorization' with a capital 'A'

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     res.status(400).json({ message: "Invalid or missing token" });
    //     return;
    // }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log(token);
    const auth = jwt.verify(token, process.env.KEY);
    // If the token is successfully verified, you can access the payload in 'auth'

    // Your authentication logic here, e.g., checking user roles, etc.

    next();
  } catch (error) {
    // Handle the verification error
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = { handleauth };
