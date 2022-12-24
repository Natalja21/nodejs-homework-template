const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");

const { schemes } = require("../../models/contacts");

const router = express.Router();
router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getByIdContact));

router.post(
  "/",
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.createContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeByIdContact));

router.put(
  "/:contactId",

  isValidId,
  validateBody(schemes.addSchema),
  ctrlWrapper(ctrl.updateByIdContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemes.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
