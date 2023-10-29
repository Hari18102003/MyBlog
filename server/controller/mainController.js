const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Blog = require("../schema/blog");
const User = require("../schema/user");

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
        const username = req.session.myblog.username;
        const blogs = await Blog.find().sort({ "_id": -1 });
        res.render("viewmore.ejs", { blogs, username });

    } catch (error) {
        console.log(error);
    }
}

// ViewBlog page

exports.viewblog = async function (req, res) {

    try {
        const username = req.session.myblog.username;
        const id = req.params.id;
        const blog = await Blog.findById({ _id: id });
        if (username === blog.user) {
            res.render("viewblog.ejs", { blog, username, access: "yes" });
        } else {
            res.render("viewblog.ejs", { blog, username, access: "no" });
        }

    } catch (error) {
        console.log(error);
    }

}

// Search blog

exports.searchblog = async function (req, res) {

    try {
        const username = req.session.myblog.username;
        const searchTerm = req.body.searchTerm;
        let searchblog = await Blog.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render("search.ejs", { searchblog, username });

    } catch (error) {
        console.log(error);
    }

}

// Add blog

exports.modifyblog = async function (req, res) {
    try {
        const username = req.session.myblog.username;
        res.render("modifyblog.ejs", { username });
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
                date: new Date().toJSON().slice(0, 10),
                user: req.session.myblog.username
            });
            await newBlog.save().then(function () {
                console.log("uploaded");
            });
            const blogId = await Blog.findOne({ image: newPath });
            const currentUser = await User.findOneAndUpdate({ _id: req.session.myblog._id });
            currentUser.blog.push(blogId);
            await currentUser.save().then(function () {
                console.log("added blog to user");
            });
        }
        res.redirect("/dashboard/home");
    } catch (error) {
        console.log(error);
        res.redirect("/modifyblog");
    }
}

//Register page open

exports.registerpage = async function (req, res) {
    try {
        res.render("register.ejs");

    } catch (error) {
        console.log(error);
    }
}

//login page open

exports.loginpage = async function (req, res) {
    try {

        res.render("login.ejs");

    } catch (error) {
        console.log(error);
    }
}

// register user

exports.registeruser = async function (req, res) {
    try {

        const user = await User.findOne({ username: req.body.username.trim() });

        if (!user) {
            bcrypt.hash(req.body.password.trim(), 10, async function (err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    const newUser = {
                        username: req.body.username.trim(),
                        password: hash
                    }
                    await User.create(newUser);
                    console.log("user registered");
                }
            });

            res.redirect("/login");
        }
        else {
            res.redirect("/register");
        }

    } catch (error) {
        console.log(error);
        res.redirect("/register");
    }
}

//login user
exports.loginuser = async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username.trim() });
        if (user) {
            bcrypt.compare(req.body.password.trim(), user.password, function (err, result) {
                if (result === true) {
                    req.session.myblog = user;
                    res.redirect("/dashboard/home");
                } else {
                    res.redirect("/login");
                }
            });
        } else {
            console.log("No user found!");
            res.redirect("/register");
        }

    } catch (error) {
        console.log(error);
        res.redirect("/login");
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
