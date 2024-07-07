import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema( //gruppi di utenti che conversano => ho un vettore di partecipanti e di messaggi
	{
		participants: [ //vettore di partecipanti
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [//è un array di tutti i messaggi che saranno ovviamente di tipo Message
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;