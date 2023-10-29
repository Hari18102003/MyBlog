const mongoose = require("mongoose");
const Blog = require("../schema/blog");

// Homepage

exports.homepage = async function (req, res) {

    try {
        const limitNumber = 5;
        const blogs = await Blog.find().sort({ "_id": -1 }).limit(limitNumber);
        res.render("index.ejs", { blogs });

    } catch (error) {
        console.log(error);
    }
};

// Viewmore page

exports.viewmore = async function (req, res) {

    try {
        const blogs = await Blog.find().sort({ "_id": -1 });
        res.render("viewmore.ejs", { blogs });

    } catch (error) {
        console.log(error);
    }
}

// ViewBlog page

exports.viewblog = async function (req, res) {

    try {
        const id = req.params.id;
        const blog = await Blog.findById({ _id: id });
        res.render("viewblog.ejs", { blog });

    } catch (error) {
        console.log(error);
    }

}

// Search blog

exports.searchblog = async function (req, res) {

    try {
        const searchTerm = req.body.searchTerm;
        let searchblog = await Blog.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render("search.ejs", { searchblog });

    } catch (error) {
        console.log(error);
    }

}

// Add blog

exports.modifyblog = async function (req, res) {
    try {
        res.render("modifyblog.ejs");
    } catch (error) {
        console.log(error);
    }
}


//post blog

exports.postblog = async function (req, res) {
    try {
        if (req.file) {
            console.log(req.file);
            let sample = req.file.path;
            let sampleArray = sample.split("\\");
            const newPath = sampleArray[1] + "/" + sampleArray[2];
            const newBlog = new Blog({
                title: req.body.title,
                content: req.body.content,
                image: newPath,
                date: new Date().toJSON().slice(0, 10)
            });
            await newBlog.save().then(function () {
                console.log("uploaded");
            });
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/modifyblog");
    }
}







// async function insert(){
//   await Blog.insertMany([
//     {
//       title: "A Visit to Meenakshi Amman Temple",
//       content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-1.jpg",
//       date: new Date().toJSON().slice(0, 10)
//     },
//     {
//       title: "Taj Mahal",
//       content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-2.jpg",
//       date: new Date().toJSON().slice(0, 10)
//     },
//     {
//       title: "Queen of Hills - kodaikanal",
//       content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-3.jpg",
//       date: new Date().toJSON().slice(0, 10)
//     }
//     ,{
//       title: "Paris",
//       content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-4.jpg",
//       date: new Date().toJSON().slice(0, 10)
//     }
//     ,
//     {
//       title: "Ladakh",
//       content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-5.jpg",
//       date: new Date().toJSON().slice(0, 10)
//     },
// {
//   title: "Philippines",
//     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reprehenderit,nesciunt vel inventore rema sapiente quaerat delectus eos iure?",
//       image: "img/blog-6.jpeg",
//         date: new Date().toJSON().slice(0, 10)

// }
//   ]);
// }
// insert();
