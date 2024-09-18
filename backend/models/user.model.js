import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true, // Ensure emails are unique
			match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Simple email validation
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		resetPasswordToken: { type: String }, // Token for resetting password
		resetPasswordExpires: { type: Date }, // Token expiration time
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
