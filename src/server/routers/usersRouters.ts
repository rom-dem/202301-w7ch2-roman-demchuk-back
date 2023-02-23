import { Router } from "express";
import multer from "multer";
import { createUser, loginUser } from "../controllers/usersControllers.js";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(
      null,
      `${Date.now()}-${(Math.random() * 1000).toFixed(0)}-${file.originalname}`
    );
  },
});

const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/create", upload.single("avatar"), createUser);

export default usersRouter;
