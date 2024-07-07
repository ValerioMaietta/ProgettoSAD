import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(//"Schema" è una struttura di dati che definisce la forma e i vincoli dei documenti memorizzati in una collezione MongoDB.
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",//praticamente sto dicendo che il senderId è di tipo User
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		
	},
	{ timestamps: true } //è una configurazione che può essere passata al costruttore dello schema per aggiungere automaticamente due campi ai documenti della collezione: createdAt e updatedAt. Questi campi registrano rispettivamente
);// la data e l'ora in cui un documento è stato creato e l'ultima volta che è stato aggiornato. ES. MESSAGGIO CREATO ALLE 14:30

const Message = mongoose.model("Message", messageSchema);

export default Message;
