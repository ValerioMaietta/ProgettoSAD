import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD
		const salt = await bcrypt.genSalt(10); //il salt è una stringa casuale utilizzata per aggiungere ulteriore casualità all'hashing delle password con un fattore di costo di 10.
		const hashedPassword = await bcrypt.hash(password, salt); //prende la password originale e il sale generato nel passaggio precedente e produce un hash della password. L'hash risultante è una stringa che rappresenta la password in una forma crittografata e sicura.


		//IMMAGINI PROFILO DEFAULT usando api online
        const boyProfilePic = `https://robohash.org/${username}?set=set1`; // avatar maschile
        const girlProfilePic = `https://api.multiavatar.com/${username}.svg?apikey=YOUR_API_KEY&gender=female`;

		// SE NON ENTRO IN QUEGLI IF CREO QUINDI L'UTENTE
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			//andremo a generare qui il token JWT
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			//è andato a buon fine quindi resituisce status 201 e aggiunge i dati al db
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); //quel punto interrogativo si chiede se user è undefined allora user.password è undefined e quindi non esiste il confronto tra password e user.password

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 }); //eliminiamo il cookie chiamato "jwt"
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
