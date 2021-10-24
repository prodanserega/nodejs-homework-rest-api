const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");
const {
  validateContact,
  validateStatusContact,
  validateId,
} = require("./validation");
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");

router.get("/", guard, wrapError(getContacts));

router.get("/:id", guard, validateId, wrapError(getContact));

router.post("/", guard, validateContact, wrapError(saveContact));

router.delete("/:id", guard, validateId, wrapError(removeContact));

router.put(
  "/:id",
  guard,
  [validateId, validateStatusContact],
  wrapError(updateContact)
);

router.patch(
  "/:id/favorite/",
  guard,
  [validateId, validateStatusContact],
  wrapError(updateStatusContact)
);

module.exports = router;
