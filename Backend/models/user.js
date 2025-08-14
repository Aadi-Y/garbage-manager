const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["User","Admin","Driver"],
        required:true
    },
    userId:{
        type:String,
        requied:true
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver"
    }
},
    {
        timestamps: true
    }

)

module.exports = mongoose.model("User",userSchema);