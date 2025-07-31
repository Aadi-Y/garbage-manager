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
    handleGetForDriver } = require("../controllers/adminController");
const { protect } = require("../middleware/protect");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/createArea", protect, roleAuthentication(["Admin"]), handleCreateArea);
router.get("/getArea", protect, roleAuthentication(["Admin","Driver"]), handleGetArea);
router.get("/getAreaForDriver", roleAuthentication(["Admin","Driver"]), protect, handleGetForDriver);
router.put("/updateArea/:id", protect, roleAuthentication(["Admin"]), handleUpdateArea);
router.delete("/deleteArea/:id", protect, roleAuthentication(["Admin"]), handleDeleteArea);
router.put("/assignDriver/:id", protect, roleAuthentication(["Admin"]), handleAssignDriver);
router.put("/removeDriver/:id", protect, roleAuthentication(["Admin"]), handleRemoveDriver);
router.put("/assignGarbage/:id", protect, roleAuthentication(["Admin"]), handleAssignGarbage);
router.put("/removeGarbage/:id", protect, roleAuthentication(["Admin"]), handleRemoveGarbage);



module.exports = router;
