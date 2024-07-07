import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  //prendi gli utenti cliccando dalla lista degli utenti (vedrai dall'interfaccia grafica)
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers); //ritorna la lista di utenti dopo il filtraggio
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
