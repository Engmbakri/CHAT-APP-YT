import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL);
		console.log("connected to momgo");
	} catch (error) {
		console.log("error while connecting to mongo", error.message);
	}
};

export default connectToMongoDB;
