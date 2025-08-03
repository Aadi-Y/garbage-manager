const Garbage = require("../models/garbage");
const generateId = require("../helper/generateID");

async function handleAssignId(id = generateId()) {
    const existing = await Garbage.findOne({ garbageId: id });
    if (existing) {
        return await handleAssignId(garbageId);
    }
    return id;
}

// @desc It is used to create a new garbage
// @route POST /api/garbage/createGarbage
// @access Private
async function handleCreateGarbage(req, res) {
    try {
        const {
            garbageType,
            state,
            district,
            taluk,
            area,
            landMark,
            pincode,
            depositedOn,
            description,
            status = "Pending",
            weight
        } = req.body;

        if (!garbageType || !state || !district || !taluk || !area || !landMark || !pincode || !depositedOn || !description || !status || !weight) {
            return res.status(400).json({
                error: true,
                message: "Please fill all necessary field"
            })
        }

        const { id } = await req.user

        if (!id) {
            res.status(404).json({
                error: true,
                message: "User not found"
            })
        }

        const garbageDetails = {
            user: id,
            garbageType,
            state,
            district,
            taluk,
            area,
            landMark,
            pincode,
            depositedOn,
            description,
            status,
            weight,
            garbageId: await handleAssignId(),
        }

        const garbage = await Garbage.create(garbageDetails);


        res.status(201).json({
            error: false,
            message: "Garbage is created Successfully",
            garbage
        })
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to get single garbage
// @route POST /api/garbage/getSingleGarbage
// @access Private
async function handleGetUserGarbage(req, res) {
    try {
        const { id } = req.user;

        const garbages = await Garbage.find({ user: id });

        res.status(200).json({
            error: false,
            message: "All garbage based on user is fetched",
            garbages
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to get all the garbage
// @route POST /api/garbage/getAllGarbage
// @access Private
async function handleGetAllGarbage(req, res) {
    try {

        const garbages = await Garbage.find({});


        res.status(200).json({
            error: false,
            message: "All garbage based on user is fetched",
            garbages,
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to get all the garbages ID
// @route POST /api/garbage/getAllGarbageId
// @access Private
async function handleGetAllGarbageIds(req, res) {
    try {

        const garbages = await Garbage.find({}).select("-garbageId _id");
        const garbageIds = garbages.map(g => g._id);

        res.status(200).json({
            error: false,
            message: "All garbage Ids are fetched",
            garbageIds,
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to update the garbage
// @route POST /api/garbage/updateGarbage
// @access Private
async function handleUpdateGarbage(req, res) {
    try {
        const { id } = req.user;
        const garbageId = req.params.id;

        const garbage = await Garbage.findByIdAndUpdate({ user: id, _id: garbageId }, { ...req.body });

        if (!garbage) {
            return res.status(404).json({
                error: true,
                message: "Garbage not found"
            })
        }

        await garbage.save();

        res.status(201).json({
            error: false,
            message: "Garbage Updated Successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// @desc It is used to delete the garbage
// @route POST /api/garbage/deleteGarbage
// @access Private
async function handleDeleteGarbage(req, res) {
    try {
        const { id } = req.user;
        const garbageId = req.params.id;

        const garbage = await Garbage.findByIdAndDelete({ user: id, _id: garbageId });

        if (!garbage) {
            return res.status(404).json({
                error: false,
                message: "Garbage not found"
            })
        }

        res.status(201).json({
            error: false,
            message: "Garbage Deleted Successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

async function handleDisposeStatus(req, res) {
    try {
        const garbageId = req.params.id;

        const garbage = await Garbage.findById(garbageId);

        if (!garbage) {
            return res.status(404).json({
                error: true,
                message: "Garbage not found"
            })
        }

        garbage.disposed = !garbage.disposed;

        await garbage.save();

        res.status(201).json({
            error: false,
            message: "Garbage disposed status changed"
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

module.exports = {
    handleCreateGarbage,
    handleDeleteGarbage,
    handleUpdateGarbage,
    handleGetUserGarbage,
    handleGetAllGarbage,
    handleDisposeStatus,
    handleGetAllGarbageIds
}