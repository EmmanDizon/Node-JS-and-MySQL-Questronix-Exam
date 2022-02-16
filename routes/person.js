const express = require("express");
const router = express.Router();

const {
  newPerson,
  getAllPersons,
  deletePersonById,
  updatePersonById,
  getPersonById,
} = require("../controller/person_controller");

router.route("/new").post(newPerson);

router.route("/get_all_persons").get(getAllPersons);
router.route("/get_person_by_id/:id").get(getPersonById);

router.route("/delete_person_by_id/:id").delete(deletePersonById);

router.route("/update_person_by_id/:id").put(updatePersonById);
module.exports = router;
