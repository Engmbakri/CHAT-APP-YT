import jwt from "jsonwebtoken";

const generateTokenAnsdSetCookie = (userId, res) => {
	const token = jwt.sign({userId}, process.env.JWT_SECRET, {
		expiresIn: "15 day"
	})

	res.cookie("jwt", token, {
		maxAge: 15 * 60 * 60 * 1000, //MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site requiest forgery attacks
		secure: process.env.NODE_ENV !== "development" // cookies only works in https
	});
}

export default generateTokenAnsdSetCookie;
