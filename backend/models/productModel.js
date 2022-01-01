const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter Product name"],
        trim: true,
    },
    description: {
        type: String,
        require: [true, "Please enter Product Description"],
    },
    price: {
        type: Number,
        require: [true, "Please enter Product Price"],
        maxLength: [8, "Price can't exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    image: [
        {
            public_id: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            },
        },
    ],
    category: {
        type: String,
        require: [true, "Please Enter Product Category"],
    },
    stock: {
        type: Number,
        require: [true, "Please Enter Proudct Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                require: true,
            },
            rating: {
                type: Number,
                require: true,
            },
            comment: {
                type: String,
                require: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
