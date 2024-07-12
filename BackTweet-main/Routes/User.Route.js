import express from 'express';
import { signup , signIn, getAll, getOne, updateUser, deleteUser} from "../Controllers/User.Controller.js";
import { verifieToken } from '../Utils/Auth.js';


const router = express.Router();



router.post("/login", signIn);
router.post("/register", signup);
router.get("/all", verifieToken,  getAll);
router.get("/get/:id", verifieToken,  getOne);
router.put("/update/:id", verifieToken,  updateUser);
router.delete("/delete/:id",verifieToken,  deleteUser);

export default router;