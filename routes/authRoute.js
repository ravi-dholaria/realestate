import express from "express";
const router = express.Router();
import { registerController, loginController, testController } from "../controllers/authController.js";
import { listPropertiesController } from './../controllers/propertyController.js';

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/list-properties', listPropertiesController);

export default router;  