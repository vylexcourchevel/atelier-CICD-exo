// env.js
import dotenv from "dotenv"
// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

console.log(process.env.MONGO_URI);
export const ENV  = {
    mongo: process.env.MONGO_URI,
    token: process.env.TOKEN
}