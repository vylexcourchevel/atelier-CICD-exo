import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import modelUser from "../Models/user.Model.js"
import dotenv from "dotenv";
import userModel from "../Models/user.Model.js";
import {io} from "../Services/Socket.js"
import { env } from '../config.js'

dotenv.config();

const signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        await userModel.create({...req.body, password: hashedPassword});
        res.status(201).json("User has been created!");
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Error creating user");
        
    }
}

const signIn = async (req, res, next) => {
    try {

        const user = await userModel.findOne({email: req.body.email});

        const pswBdd = await  bcrypt.compare(req.body.password, user.password);
        const {password, ...other} = user._doc;


        if(user !== null  && pswBdd ){
             //envoi le jeton (token) JWT sous forme de cookie HTTPOnly
            const token = jwt.sign({id: user._id}, env.token, {expiresIn: "24h"});
            console.log("token => ", token, "id_user => ", user._id);

            res.cookie("access_token", token, { httpOnly: true,  }).status(200).json(other);  
                res.end();                  
        }    
    } catch (error) {
        res.status(400).json("la connexion a échoué");
    }
}

const getAll = async (req, res, next) => {
    try {
        const users = await userModel.findAll();
    res.status(200).json(users);
    } catch (error) {
        res.status(400).json("echec");

    }
    
}
const getOne = async (req, res, next) =>{
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json("echec");
    }
}
const updateUser = async (req, res, next) => {
    try {
        const result = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        io.emit('updateUser', result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("erreur lors de la modification")
    }
}
const deleteUser = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("supprimé avec succès");
    } catch (error) {
        res.status(400).json("erreur lors de la suppréssion");
    }
}

export {
    signup , signIn, getAll, getOne, updateUser, deleteUser
}
