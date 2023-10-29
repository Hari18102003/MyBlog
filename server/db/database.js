const mongoose = require("mongoose");

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        return mongoose.connect("mongodb://127.0.0.1:27017/myblogDB").then(function () {
            console.log("DB connected");
        }).catch(function (err) {
            console.log(err);
        });
    }
}

// main();

// async function main() {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017/myblogDB");
//         console.log("DB connected");
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

// const blogSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date
//     }
// });

module.exports = new Database();
// module.exports = mongoose.model("Blog", blogSchema);



