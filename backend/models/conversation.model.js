import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to User model
		}
	],
	message: [
		{
			type: mongoose.Schema.Types.ObjectId, // Corrected ObjectId
			ref: "Message", // Reference to Message model
			default: [], // Default is an empty array
		}
	]
}, 
	// Adds createdAt and updatedAt fields automatically
	{timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
