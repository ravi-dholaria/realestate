import express from "express";
const router = express.Router();
import { addpropertyController,myPropertiesController,updatePropertyController,deletePropertyController} from './../controllers/propertyController.js';
import { isSignIn } from './../middleware/isSignIn.js';

router.post('/add', isSignIn,addpropertyController);        //Create
router.get('/', isSignIn,myPropertiesController);         //Read
router.put('/:id', isSignIn,updatePropertyController);         //Update
router.delete('/:id', isSignIn, deletePropertyController);      //Delete
export default router;  