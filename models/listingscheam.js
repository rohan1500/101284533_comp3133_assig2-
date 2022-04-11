const mongoose = require('mongoose');

const CreateListingSchema = new mongoose.Schema({
    listing_id: {
        type: String,
        required: [true,"Listing ID could not be empty"],
    },
    listing_title: {
        type: String,
        required: [true,"Listing Title could not be empty"],
    },
    description: {
        type: String,
        required: [true,"Description could not be empty"],
    },
    street: {
        type: String,
        required: [true,"Street could not be empty"],
    },
    city: {
        type: String,
        required: [true,"City could not be empty"],
    },
    postal_code: {
        type: String,
        required: [true,"Postal Code could not be empty"],
        match: [/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/, 'Please fill a valid postal code'],
    },
    price: {
        type: Number,
        required: [true,"Price could not be empty"],
        min: 0
    },
    email: {
        type: String,
        required: [true,"Email could not be empty"],
        lowercase: true,
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Enter a valid email",
          }
    },
    username: {
        type: String,
        required: [true,"Username could not be empty"],
        lowercase: true
    }


})

const CreateListing = mongoose.model("listing", CreateListingSchema);
module.exports = CreateListing;