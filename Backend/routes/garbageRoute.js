const express = require("express");
const { protect } = require("../middleware/protect");
const { handleCreateGarbage, handleGetSingleGarbage, handleGetAllGarbage, handleUpdateGarbage, handleDeleteGarbage } = require("../controllers/garbageController");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/createGarbage", protect, handleCreateGarbage);
router.get("/getOneGarbage/:id", protect, roleAuthentication(["User", "Admin"]), handleGetSingleGarbage);
router.get("/getAllGarbages", protect, roleAuthentication(["User", "Admin"]), handleGetAllGarbage);
router.put("/updateGarbage/:id", protect, roleAuthentication(["User", "Admin"]), handleUpdateGarbage);
router.delete("/deleteGarbage/:id", protect, roleAuthentication(["User", "Admin"]), handleDeleteGarbage);

module.exports = router;