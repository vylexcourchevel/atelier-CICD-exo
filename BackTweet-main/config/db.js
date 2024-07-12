import mongoose from "mongoose";


const connectDB = (mongoURL) => {
    mongoose.connect(mongoURL, {dbName: 'x'  })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((error) => console.error('Erreur de connexion à MongoDB :', error));
};

export default connectDB;
