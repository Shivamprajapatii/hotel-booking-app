const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");  // all data in Listing Document
require('dotenv').config();

const DB_URL = process.env.ATLASDB_URL;
console.log("DB URL:", process.env.ATLASDB_URL);

if (!DB_URL) {
    throw new Error("Database URL is not defined. Check your environment variables.");
}

main().then(() => {
    console.log("Database Connected!");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(DB_URL);
}

const initDB = async  () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"677d42a4fb5d17a867c4b525"}));
    await Listing.insertMany(initData.data);
    console.log("data Was Initilized!");
}

initDB();