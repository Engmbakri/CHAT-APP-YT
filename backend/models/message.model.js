import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // Reference to User model
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId, // Added receiverId field
        ref: "User", // Reference to User model
        required: true
    },

    message: {
        type: String, // Message content
        required: true
    }
}, {timestamps: true}); // Automatically adds createdAt and updatedAt timestamps

const Message = mongoose.model("Message", messageSchema);

export default Message;
