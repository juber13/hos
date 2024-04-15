import { Router } from "express";
import * as controller from '../controllers/user.controller.js'

const router = Router();



router.post('/user/register', controller.register)


export default router;