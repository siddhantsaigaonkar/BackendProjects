const express = require("express");
const app = express();
const mongoose = require('mongoose'); 
const port = 8081;
const listing = require("./models/listing")
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))

main()
  .then(()=> console.log(`mongo connection sucessful`))
  .catch((error) => console.log(error)
)
async function main(params) {
     await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

app.get("/", (req, res) => {
  res.send("working");
});


app.get("/listings", async (req, res) => {
  let data = await listing.find({});
  res.render("listings/index.ejs",{data})
})

// showroute

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const list = await listing.findById(id)
  console.log(list); 
  res.render("listings/showroute",{list})
})

// create new listing
app.get("/createNew", (req, res) => {
  res.render("listings/createNew")
});

// createPost

app.post("/listings", async (req, res) => {
  let { title, description, price, location, country } = req.body;
  let newPost = new listing({
    title: title,
    description: description,
    price: price,
    location: location,
    country :country
  })
  await newPost.save();
   res.redirect("/listings")
})

// edit

app.get("/listing/:id/edit",  (req, res) => {
  let { id } = req.params
  listing.findById(id)
    .then((result) => {
    res.render("listings/edit",{result})
    })
    .catch((error) => {
    console.log(error);
    
  })
})

// update

app.put("/listing/:id", async(req, res) => {
  let { id } = req.params;
  await listing.findByIdAndUpdate(id, {...req.body.listing })
  res.redirect(`/listing/${id}`)
})


// DELETE

app.delete("/listing/:id", async(req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id)
  res.redirect("/listings")
})

app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
