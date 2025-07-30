const Area = require("../models/area");
const Driver = require("../models/driver");
const generateId = require("../helper/generateID");

async function handleAssignId(id = generateId()){
    const existing = await Area.findOne({areaId:id});
    if(existing){
        return await handleAssignDriver(id);
    }
    return id;
}

// @decr It is used to Assign Garbages to driver
// @route POST /api/garbage/assignGarbage;
// @access Private
async function handleAssignGarbage(req, res) {
    try {
        const { garbages } = req.body;
        const driverId = req.params.id;

        const driver = await Driver.findByIdAndUpdate({ _id: driverId },
            {$push: {assignedRequest: { $each: garbages } }}, 
            {new: true,}
        )
            .populate("assignedRequest");

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            })
        }

        await driver.save();

        res.status(201).json({
            error: true,
            message: "Garbage is assinged",
            driver
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to Assign drivers to area
// @route POST /api/garbage/assignDriver;
// @access Private
async function handleAssignDriver(req, res) {
    try {
        const { drivers } = req.body;
        const areaId = req.params.id;

        const area = await Area.findById({ _id: areaId });

        if (!area) {
            return res.status(404).json({
                error: true,
                message: "Area not found"
            })
        }
        const driversDoc = await Promise.all(
            drivers.map((driverId) => {
                return driverId
            })
        )

        area.assignedDrivers = driversDoc;
        area.save();

        const populatedArea = await Area.findById(areaId)
            .populate("assignedDrivers");

        res.status(201).json({
            error: false,
            message: "Driver is assigned",
            populatedArea
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to remove the assigned driver from area
// @route POST /api/garbage/removeDriver;
// @access Private
async function handleRemoveDriver(req, res) {
    try {
        const { driverId } = req.body;
        const areaId = req.params.id;

        const area = await Area.findById(areaId);

        if (!area) {
            return res.status(404).json({
                error: true,
                message: "Area not found"
            });
        }

        // Remove the driver
        area.assignedDrivers = area.assignedDrivers.filter(
            (id) => id.toString() !== driverId
        );

        await area.save();

        res.status(201).json({
            error: false,
            message: "Assigned driver removed successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}


// @decr It is used to remove assigned garbages from driver
// @route POST /api/garbage/removeGarbage;
// @access Private
async function handleRemoveGarbage(req, res) {
    try {
        const { garbageId } = req.body;
        const driverId = req.params.id;

        const driver = await Driver.findById(driverId);

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            });
        }

        driver.assignedRequest = driver.assignedRequest.filter(
            (id) => id.toString() !== garbageId
        );

        await driver.save();

        res.status(201).json({
            error: false,
            message: "Assigned garbage has been removed from the driver"
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

// @decr It is used to create a area
// @route POST /api/garbage/createArea;
// @access Private
async function handleCreateArea(req, res) {
    try {
        const { areaName, areaLocation, areaPincode,assignedDrivers } = req.body;

        if (!areaName) {
            return res.status(400).json({
                error: true,
                message: "Please enter areaName"
            })
        }

        if (!areaLocation) {
            return res.status(400).json({
                error: true,
                message: "Please enter location"
            })
        }

        if (!areaPincode) {
            return res.status(400).json({
                error: true,
                message: "Please enter pincode"
            })
        }

        if (assignedDrivers?.length === 0) {
            return res.status(400).json({
                error: true,
                message: "Please assign driver"
            })
        }
        const newArea = {
            areaName,
            areaLocation,
            areaPincode,
            areaId:await handleAssignId()
        }
        const area = await Area.create(newArea);

        res.status(201).json({
            error: false,
            message: "Area is created Successfully",
            area
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to get all the area
// @route POST /api/garbage/getArea;
// @access Private
async function handleGetArea(req, res) {
    try {
        const area = await Area.find({});

        res.status(200).json({
            error: false,
            message: "All area got fetched",
            area
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to get all the assinged areas
// @route POST /api/garbage/getAreaForDriver;
// @access Private
async function handleGetForDriver() {
    try {
        const { id } = req.user;
        const area = Area.findById({ id });

        res.status(200).json({
            error: false,
            message: "All area fetched successfully",
            area
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to update the a particular area
// @route POST /api/garbage/updateArea;
// @access Private
async function handleUpdateArea(req, res) {
    try {
        const areaId = req.params.id;
        const area = await Area.findByIdAndUpdate({ _id: areaId }, {
            ...req.body
        })

        if (!area) {
            return res.status(404).json({
                error: true,
                message: "Area not found"
            })
        }

        res.status(201).json({
            error: false,
            message: "Area is updatead successfully",
            area
        })

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @decr It is used to delete the a particular area
// @route POST /api/garbage/deleteArea;
// @access Private
async function handleDeleteArea(req, res) {
    try {
        const areaId = req.params.id;
        const area = await Area.findByIdAndDelete({ _id: areaId });

        if (!area) {
            return res.status(404).json({
                error: true,
                message: "Area not found"
            })
        }

        res.status(202).json({
            error: false,
            message: "Area deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    handleAssignDriver,
    handleAssignGarbage,
    handleRemoveGarbage,
    handleRemoveDriver,
    handleCreateArea,
    handleUpdateArea,
    handleDeleteArea,
    handleGetArea,
    handleGetForDriver
}