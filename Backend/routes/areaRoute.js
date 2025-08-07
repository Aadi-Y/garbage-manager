const express = require("express");
const {
    handleAssignDriver,
    handleAssignGarbage,
    handleRemoveDriver,
    handleRemoveGarbage,
    handleCreateArea,
    handleUpdateArea,
    handleDeleteArea,
    handleGetArea,
    handleGetAreaForDriver,
    handleGetAssignedGarbages,
    handleGetAllDriverId,
    handleGetGarbagesForDriver
} = require("../controllers/adminController");
const { protect } = require("../middleware/protect");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/createArea", protect, roleAuthentication(["Admin"]), handleCreateArea);
router.get("/getArea", protect, roleAuthentication(["Admin", "Driver"]), handleGetArea);
router.get("/getAssignedGarbages/:id", protect, roleAuthentication(["Admin", "Driver"]), handleGetAssignedGarbages);
router.get("/getAreaForDriver", protect, roleAuthentication(["Admin", "Driver"]), handleGetAreaForDriver);
router.put("/updateArea/:id", protect, roleAuthentication(["Admin"]), handleUpdateArea);
router.delete("/deleteArea/:id", protect, roleAuthentication(["Admin"]), handleDeleteArea);
router.put("/assignDriver/:id", protect, roleAuthentication(["Admin"]), handleAssignDriver);
router.put("/removeDriver/:id", protect, roleAuthentication(["Admin"]), handleRemoveDriver);
router.put("/assignGarbage/:id", protect, roleAuthentication(["Admin"]), handleAssignGarbage);
router.put("/removeGarbage/:id", protect, roleAuthentication(["Admin"]), handleRemoveGarbage);
router.get("/getAllDriverId", protect, roleAuthentication(["Admin"]), handleGetAllDriverId);
router.get("/getGarbageForDriver",protect,roleAuthentication(["Admin","Driver"]),handleGetGarbagesForDriver);



module.exports = router;
