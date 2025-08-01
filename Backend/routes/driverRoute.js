const express = require("express");
const { handleCreateDriver, handleUpdateDriver, handleDeleteDriver, handleGetDriver,handleGetAllDriver } = require("../controllers/driverController");
const { protect } = require("../middleware/protect");
const { roleAuthentication } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/createDriver", protect, handleCreateDriver);
router.get("/getDriver", protect, roleAuthentication(["Driver", "Admin"]), handleGetDriver);
router.put("/updateDriver/:id", protect, roleAuthentication(["Driver", "Admin"]), handleUpdateDriver);
router.delete("/deleteDriver/:id", protect, roleAuthentication(["Driver", "Admin"]), handleDeleteDriver);
router.get("/getAllDrivers",protect,roleAuthentication(["Admin"]),handleGetAllDriver);

module.exports = router;