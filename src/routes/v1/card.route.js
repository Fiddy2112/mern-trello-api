import express from "express";
import { CardController } from "../../controllers/card.controller.js";
import { CardValidation } from "../../validations/card.validation.js";

const router = express.Router();

router.route("/").post(CardValidation.createNew, CardController.createNew);
router.route("/id").put(CardValidation.update, CardController.update);

export const cardRoutes = router;
