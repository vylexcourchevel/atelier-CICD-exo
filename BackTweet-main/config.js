import dotenv from 'dotenv' ;

dotenv.config();

export const env = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    compassURI: process.env.COMPASS_URI,
    localURI: process.env.MONGO_URI_LOCAL,
    token: process.env.TOKEN
}