const mongoose = require("mongoose"); // Anything to do with the database requires mongoose

const restaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter restaurant name"]  // The second paramter is a validation message. If the user doesn't enter anything, the value in the 2nd paramter will show.
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        cuisine: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// Now we can create the restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;