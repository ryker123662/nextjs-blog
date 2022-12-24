import { MongoClient } from "mongodb";

const Handler = async (req, res) => {
	if (req.method === "POST") {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim() === "" ||
			!message ||
			message.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input" });
			return;
		}

		// store in database
		const newMessage = {
			email,
			name,
			message,
		};

		let client;

		const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.v9it5dq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

		try {
			client = await MongoClient.connect(connectionString);
			// "mongodb+srv://ryker123:piesgofer1@cluster0.v9it5dq.mongodb.net/my-site?retryWrites=true&w=majority"
		} catch (error) {
			res.status(500).json({ message: "Couldn't connect to database" });
			return;
		}

		const db = client.db();

		try {
			const result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (error) {
			client.close();
			res.status(500).json({ message: "Succesful insert message" });
			return;
		}

		client.close();

		res
			.status(201)
			.json({ message: "Successfully stored message!", message: newMessage });
	}
};

export default Handler;
