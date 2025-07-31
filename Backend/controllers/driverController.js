const Driver = require("../models/driver");
const Garbage = require("../models/garbage");
const generateId = require("../helper/generateID");

async function handleAssignId(id = generateId()){
    const existing = await Driver.findOne({driverId:id});
    if(existing){
        return await handleAssignId(id);
    }
    return id;
}

// @desc It is used to create a new driver
// @routes POST /api/driver/createDriver
// @access Private
async function handleCreateDriver(req, res) {
    try {
        const {
            name,
            phoneNumber,
            age,
            licence,
            aadharId,
            vehicle,
            vehicleNumber,
            availability,
            currentLocation
        } = req.body;

        const { id } = req.user;

        const existing = await Driver.findOne({userId:id});

        if(existing){
            return res.status(400).json({
                error:true,
                message:"Driver is aldready exist, Please login"
            })
        }

        if (!name || !phoneNumber || !age || !licence || !aadharId || !vehicle || !vehicleNumber || !availability || !currentLocation) {
            return res.status(400).json({
                error: true,
                message: "Please give all the required fields"
            })
        }

        const driverDetails = {
            userId: id,
            name,
            phoneNumber,
            age,
            licence,
            aadharId,
            vehicle,
            vehicleNumber,
            availability,
            currentLocation,
            driverId:await handleAssignId()
        }

        const driver = await Driver.create(driverDetails);

        res.status(201).json({
            error: false,
            message: "Driver Created Successfully",
            driver
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: `Create Driver : ${error.message}`
        })
    }
}

// @desc It is used to get the driver
// @routes GET /api/driver/getDriver
// @access Private
async function handleGetDriver(req, res) {
    try {
        console.log(req.user);
        const { id } = req.user;

        const driver = await Driver.find({ userId: id })
            .populate("userId")
            .exec();

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            })
        }

        res.status(200).json({
            error: false,
            message: "Driver is Fetched Successfully",
            driver
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Getting Single Driver : ${error.message}`
        })
    }
}

//@desc It is used to get all the drivers
//routes GET /api/driver/getAllDrivers
//access Private
async function handleGetAllDriver(req,res){
    try{
        const drivers = await Driver.find();

        res.status(200).json({
            error:true,
            message:"All drivers are fetched successfully",
            drivers
        });
    }catch(error){
        req.status(500).json({
            error:true,
            message:`Getting all the driver : ${error.message}`
        })
    }
}


// @desc It is used to update the driver
// @routes PUT /api/driver/updateDriver
// @access Private
async function handleUpdateDriver(req, res) {
    try {
        const { id } = req.user;
        const driverId = req.params.id;

        const driver = await Driver.findByIdAndUpdate({ _id: driverId, userId: id }, { ...req.body });

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            })
        }

        await driver.save();

        res.status(201).json({
            error: false,
            message: "Driver Updated Successfully",
            driver
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: `Update Driver : ${error.message}`
        })
    }
}

// @desc It is used to delete the driver
// @routes DELETE /api/driver/deleteDriver
// @access Private
async function handleDeleteDriver(req, res) {
    try {
        const { id } = req.user;
        const driverId = req.params.id;

        const driver = await Driver.findByIdAndDelete({ _id: driverId, userId: id });

        if (!driver) {
            return res.status(404).json({
                error: true,
                message: "Driver not found"
            })
        }

        res.status(202).json({
            error: false,
            message: "Driver Deleted Successfully"
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: `Delete Driver : ${error.message}`
        })
    }
}



module.exports = {
    handleCreateDriver,
    handleGetDriver,
    handleGetAllDriver,
    handleUpdateDriver,
    handleDeleteDriver
}