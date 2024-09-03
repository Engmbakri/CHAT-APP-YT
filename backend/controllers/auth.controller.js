import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
	try {
		const {fullname, username, password, confirmpassword, gender} = req.body;
		if (password !== confirmpassword) {
			return res.status(400).json({error: "password do not match"})
		}
		
		const user = await User.findOne({username});
		if (user) {
			return res.status(400).json({error: "user alrady exists"})
		}

		// HASH PASSWORD HERE
		const salt= await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// https://avatar-placeholder.iran.liara.run/
		
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

		const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

		const newUser = new User({
			fullname,
			username,
			password: hashedPassword,
			gender,
			profilePic
		});

		if(newUser) {
			// generate jwt here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullname: newUser.fullname,
				username: newUser.username,
				profilePic: newUser.profilePic
			});
		} else {
			res.status(400).json({error: "Invalid User Data"})
		}

	} catch (err) {
		console.log("erro in signup controller ", err.message);
		res.status(500).json({error:"internal server error"});
	}
};

export const login = async (req, res) => {
	try {
		const {username, password} = req.body;
		const user = await User.findOne({username});
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if(!user || !isPasswordCorrect) {
			return res.status(400).json({error: "Invalid username or password"});
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic
		});

	}  catch (err) {
		console.log("erro in login controller ", err.message);
		res.status(500).json({error:"internal server error"});
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 } );
		res.status(200).json({ message: "Loged Out Successfully" });
	}  catch (err) {
		console.log("erro in logout controller ", err.message);
		res.status(500).json({error:"internal server error"});
	}
};
