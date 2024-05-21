const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");  // all data in Listing Document


let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Database Connected!");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async  () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"661908af708d8ab85bd83d76"}));
    await Listing.insertMany(initData.data);
    console.log("data Was Initilized!");
}

initDB();