const mongoose = require('mongoose');

const BookListingSchema = new mongoose.Schema({
    listing_id: {
        type: String,
        required: [true,"Listing ID could not be empty"],
    },
    booking_id: {
        type: String,
        required: [true,"Booking ID could not be empty"],
        unique: true
    },
    booking_date: {
        default: Date.now,
        type: Date,
        required: true,
    },
    booking_start: {
        type: Date,
        required: true,
    },
    booking_end: {
        type: Date,
        required: true,
    }, 
    username: {
        type: String,
        required: [true,"Username could not be empty"],
        lowercase: true
    }
})

const BookListing = mongoose.model("booking", BookListingSchema);
module.exports = BookListing;