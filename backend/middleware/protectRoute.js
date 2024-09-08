import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// Extract token from cookies
		const token = req.cookies.jwt;

		// Check if token is provided
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify token and decode it
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if token is valid
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Find user by ID (make sure decoded.UserId matches how you encoded it)
		const user = await User.findById(decoded.userId).select("-password");

		// Check if user exists
		if (!user) {
			return res.status(404).json({ error: "User Not Found" });
		}

		// Attach the user to the req object
		req.user = user;

		// Continue to the next middleware or route handler
		next();

	} catch (error) {
		console.error("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default protectRoute;
