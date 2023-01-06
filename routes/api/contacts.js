const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemes } = require("../../models/contacts");

const router = express.Router();
router.get("/", authenticate, ctrlWrapper(ctrl.getAllContacts));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getByIdContact)
);

router.post(
  "/",
  authenticate,
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.createContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeByIdContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.updateByIdContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemes.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
