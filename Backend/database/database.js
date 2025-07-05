const mongoose = require("mongoose");

async function handleDatabase(){
   try{
    await  mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connected Successfully");
    }catch(error){
        console.log("Error while connecting to database : ",error.message);
        process.exit(1);
    }
}

module.exports = {handleDatabase};