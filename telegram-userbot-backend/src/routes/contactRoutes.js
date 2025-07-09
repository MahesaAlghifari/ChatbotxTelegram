const express = require("express");
const {
  saveContact,
  getAllContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const router = express.Router();

router.get("/", getAllContacts);
router.post("/contact", saveContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
