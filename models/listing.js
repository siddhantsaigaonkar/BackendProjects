const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapersafari.com%2Ftropical-island-sunset-wallpaper%2F&psig=AOvVaw1LnEaPX-O7O0qAX76okCyA&ust=1728043266303000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjWvviU8ogDFQAAAAAdAAAAABAK",
      set: (v) =>
        v === ""
          ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpapersafari.com%2Ftropical-island-sunset-wallpaper%2F&psig=AOvVaw1LnEaPX-O7O0qAX76okCyA&ust=1728043266303000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOjWvviU8ogDFQAAAAAdAAAAABAK"
          : v,
    }
  },
  price: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing;