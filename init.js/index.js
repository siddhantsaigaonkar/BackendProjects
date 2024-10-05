const mongoose = require("mongoose");
const initdata = require("./data");
const Listing = require("../models/listing.js");


main()
  .then(() => console.log(`mongo connection sucessful`))
  .catch((error) => console.log(error));
async function main(params) {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}
const initdb = async function () {
  try {
    let deleteMany = await Listing.deleteMany();
    console.log(`data del`);
    let insertedData = await Listing.insertMany(initdata.data);
    console.log(`Data initialized: ${insertedData.length} listings added`);
  } catch (error) {
    console.error(`Error initializing data: ${error.message}`);
  }
};
initdb();
