const express = require("express");
const { protect } = require("../middleware/protect");
const { handleCreateGarbage, handleGetUserGarbage, handleGetAllGarbage, handleUpdateGarbage, handleDeleteGarbage,handleDisposeStatus,handleGetAllGarbageIds } = require("../controllers/garbageController");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/createGarbage", protect, handleCreateGarbage);
router.get("/getUserGarbage", protect, roleAuthentication(["User", "Admin"]), handleGetUserGarbage);
router.get("/getAllGarbages", protect, roleAuthentication(["User", "Admin"]), handleGetAllGarbage);
router.put("/updateGarbage/:id", protect, roleAuthentication(["User", "Admin"]), handleUpdateGarbage);
router.delete("/deleteGarbage/:id", protect, roleAuthentication(["User", "Admin"]), handleDeleteGarbage);
router.put("/disposeStatus/:id", protect, roleAuthentication(["Driver", "Admin"]), handleDisposeStatus);
router.get("/getAllGarbageIds",protect,roleAuthentication(["Admin"]),handleGetAllGarbageIds);

module.exports = router;