import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
} from "../controller/user-controller.js";
import { getFeedbacks, giveFeedback } from "../controller/feedback-controller.js";

const router = express.Router();

//Routes
//To upload file
router.post("/send-feedback", giveFeedback);

router.get("/feedbacks",getFeedbacks)
//login user
router.post("/login", loginUser);
//register user
router.post("/register", registerUser);

router.get("/users", getUsers);

router.delete("/:id",deleteUser)

export default router;
