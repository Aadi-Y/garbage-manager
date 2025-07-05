const Garbage = require("../models/garbage");

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
            status = "Pending"
        } = req.body;

        if (!garbageType || !state || !district || !taluk || !area || !landMark || !pincode || !depositedOn || !description || !status) {
            res.status(400).json({
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
            status
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
async function handleGetSingleGarbage(req, res) {
    try {
        const garbageId = await req.params.id;
        const { id } = req.user;

        const garbages = await Garbage.findById({ user: id, _id: garbageId });

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

module.exports = {
    handleCreateGarbage,
    handleDeleteGarbage,
    handleUpdateGarbage,
    handleGetSingleGarbage,
    handleGetAllGarbage
}