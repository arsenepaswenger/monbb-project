const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// ✅ 1. CONFIGURATION INDISPENSABLE
app.use(cors()); // Autorise React à parler au serveur
app.use(express.json()); // Permet de lire les données JSON envoyées par React

// ✅ 2. CONFIGURATION GMAIL (SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jhereserickson@gmail.com',
    pass: 'bvfwvqmteaopazlv' 
  },
  tls: {
    // Cette option permet de passer outre l'erreur de certificat
    rejectUnauthorized: false
  }
});

// ✅ 3. LA ROUTE QUE REACT APPELLE
app.post('/send-email', (req, res) => {
  const { to, name } = req.body;
  
  console.log(`📩 Requête reçue pour envoyer un mail à : ${to}`);

  const mailOptions = {
    from: 'jhereserickson@gmail.com',
    to: to,
    subject: 'Haute Couture vous ouvre ses portes !',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
        <h1 style="color: #333;">Félicitations ${name} !</h1>
        <p>Ton compte a été créé avec succès .</p>
        <p style="font-style: italic; color: #666;">On vous attend...</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Erreur SMTP :", error);
      return res.status(500).json({ message: "Erreur lors de l'envoi" });
    }
    console.log("✅ Mail envoyé avec succès : " + info.response);
    res.status(200).json({ message: "Email envoyé !" });
  });
});

// ✅ 4. LANCEMENT DU SERVEUR SUR LE PORT 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`✅ Serveur SMTP opérationnel sur le port ${PORT}`);
  console.log(`-----------------------------------------`);
});