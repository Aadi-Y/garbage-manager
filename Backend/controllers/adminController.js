const Area = require("../models/area");
const Driver = require("../models/driver");
const generateId = require("../helper/generateID");

async function handleAssignId(id = generateId()) {
    const existing = await Area.findOne({ areaId: id });
    if (existing) {
        return await handleAssignDriver(id);
    }
    return id;
}

// @decr It is used to Assign Garbages to driver
// @route PUT /api/garbage/assignGarbage;
// @access Private
async function handleAssignGarbage(req, res) {
    try {
        const { garbages } = req.body; 
        const driverId = req.params.id;

        if (!garbages) {
            return res.status(400).json({
                error: true,
                message: "Garbage ID do not null or duplicate",
            });
        }

        const driver = await Driver.findById(driverId);

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found.",
            });
        }

        // Check for duplicates
        const alreadyAssigned = driver.assignedRequest.some(
            id => id.toString() === garbages
        );

        if (alreadyAssigned) {
            return res.status(400).json({
                error: true,
                message: "Garbage ID is already assigned to the driver.",
                driver,
            });
        }

        // Add the new garbage ID
        driver.assignedRequest.push(garbages);
        await driver.save();

        await driver.populate("assignedRequest");

        res.status(201).json({
            error: false,
            message: "Garbage assigned",
            driver,
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
}


//@desc It is used to get all the assigned garbages Id
//Route GET /api/area/getAssignedGarbages
//Access Private
async function handleGetAssignedGarbages(req, res) {
    try {
        const driverId = req.params.id;

        // Find the driver by ID and get only the assignedRequest field
        const driver = await Driver.findById(driverId).select("assignedRequest");

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            });
        }

        const assignedGarbages = driver.assignedRequest;

        const garbageIds = assignedGarbages.map(g => g);

        res.status(200).json({
            error: false,
            message: "Assigned garbages fetched successfully",
            garbageIds,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}



// @decr It is used to Assign drivers to area
// @route PUT /api/garbage/assignDriver;
// @access Private
async function handleAssignDriver(req, res) {
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

        // Avoid duplicate assignments
        if (!area.assignedDrivers.includes(driverId)) {
            area.assignedDrivers.push(driverId);
            await area.save();
        }

        const populatedArea = await Area.findById(areaId)
            .populate("assignedDrivers");

        res.status(201).json({
            error: false,
            message: "Driver assigned",
            area: populatedArea
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}


// @decr It is used to remove the assigned driver from area
// @route PUT /api/garbage/removeDriver;
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
            message: "Driver removed"
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
}


// @decr It is used to remove assigned garbages from driver
// @route PUT /api/garbage/removeGarbage;
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

        driver.assignedRequest = driver.assignedRequest
            .filter(id => id)
            .filter(id => id.toString() !== garbageId);


        await driver.save();

        res.status(201).json({
            error: false,
            message: "Garbage Removed"
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
        const { areaName, areaLocation, areaPincode, assignedDrivers } = req.body;

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

        // if (assignedDrivers?.length === 0) {
        //     return res.status(400).json({
        //         error: true,
        //         message: "Please assign driver"
        //     })
        // }
        const newArea = {
            areaName,
            areaLocation,
            areaPincode,
            areaId: await handleAssignId(),
            assignedDrivers:[]
        }
        const area = await Area.create(newArea);

        res.status(201).json({
            error: false,
            message: "Area Created",
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
        const area = await Area.find({})
        .populate("assignedDrivers")
        .exec();

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
// @route GET /api/garbage/getAreaForDriver;
// @access Private
async function handleGetAreaForDriver(req,res) {
    try {
        const { id } = req.user;
        const area = await Area.find({assignedDrivers:id})
        .populate("assignedDrivers");

        if(!area || area.length === 0){
            return res.status(400).json({
                error:true,
                message:"No area is assigned to you"
            })
        }

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
            message: "Area deleted"
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

async function handleGetAllDriverId(req,res){
    try{
        const availableIds = await Driver.find({}).select("driverId");
        const driverId = availableIds;

        res.status(200).json({
            error:true,
            message:"All the driver id are fetched",
            driverId
        });
    }catch(error){
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}

async function handleGetGarbagesForDriver(req,res){
    try{
        const {id} = req.user;
        
        let garbages = await Driver.find({userId:id}).select("assignedRequest -_id")
        .populate("assignedRequest")
        .exec();

        garbages = garbages[0].assignedRequest;

        res.status(200).json({
            error:true,
            message:"All the garbage assigned to this driver is fetched",
            garbages
        })
    }catch(error){
        res.status(500).json({
            error:true,
            message:error.message
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
    handleGetAreaForDriver,
    handleGetAssignedGarbages,
    handleGetAllDriverId,
    handleGetGarbagesForDriver
}