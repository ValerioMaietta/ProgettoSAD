import jwt from "jsonwebtoken"; //andiamo a usare un token JWT (JSON Web Token) che è un metodo per rappresentare informazioni tra due parti in modo sicuro e compatto.
// la funzione sottostante genera un token JWT che contiene l'ID dell'utente (userId).
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    // JWT_SECRET è una chiave segreta utilizzata per firmare il token. Questa chiave dovrebbe essere mantenuta segreta e non condivisa pubblicamente.
    expiresIn: "15d", //indica che il token scadrà in 15 giorni.
  });

  res.cookie("jwt", token, {
    //imposta un cookie chiamato "jwt" con il valore del token generato.
    maxAge: 15 * 24 * 60 * 60 * 1000, // imposta la durata del cookie a 15 giorni, in millisecondi.
    httpOnly: true, // previene attacchi XSS (Cross-Site Scripting)
    sameSite: "strict", // prevenire attacchi CSRF (Cross-Site Request Forgery)
    secure: process.env.NODE_ENV !== "development", //imposta il cookie come sicuro (trasmesso solo su HTTPS)
  });
};

export default generateTokenAndSetCookie;
