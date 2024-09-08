import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;  // Logged-in user ID

		console.log("req.user:", req.user);  // Debug log

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,  // Using senderId here
			receiverId,  // And receiverId
			message,
		});

		if (newMessage) {
			conversation.message.push(newMessage._id);
		}

		// Socket Io Functionality Will Go Here

		//await conversation.save();
		//await newMessage.save();
		
		// This Will Run In Parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		res.status(201).json(newMessage);

	} catch (error) {
		console.log("Error in sendMessage Controller: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getMessage = async (req, res) => {
	try {
		const {id:userToChatId} = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },

		}).populate("message");

		if(!conversation) return res.status(201).json([]);
		
		const messages = conversation.message;

		res.status(200).json(messages); // not reference but the actual message

	} catch (error) {
		console.log("Error in getMessage Controller: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
