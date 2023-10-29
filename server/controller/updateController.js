const mongoose = require("mongoose");
const Blog = require("../schema/blog");

// update blog

exports.updateblog = async function (req, res) {
    try {
        const id = req.params.id;
        const blog = await Blog.findById({ _id: id });
        res.render("update.ejs", { blog });
    } catch (error) {
        console.log(error);
    }
}

// update blog on post

exports.updateblogpost = async function (req, res) {
    try {
        const id = req.params.id;
        const presentBlog = await Blog.findById({ _id: id });
        if (req.file) {
            let sample = req.file.path;
            let sampleArray = sample.split("\\");
            const newPath = sampleArray[1] + "/" + sampleArray[2];
            const updationBlog = await Blog.findOneAndUpdate({ _id: id },
                {
                    title: req.body.title || presentBlog.title,
                    content: req.body.content || presentBlog.content,
                    image: newPath || presentBlog.image,
                    date: new Date().toJSON().slice(0, 10) || presentBlog.date
                });
            console.log("updation success");
            res.redirect("/");
        } else {
            const date = new Date();
            const updationBlog = await Blog.findOneAndUpdate({ _id: id },
                {
                    title: req.body.title,
                    content: req.body.content,
                    image: presentBlog.image,
                    date: date.toJSON().slice(0, 10)
                });
            console.log("updation success");
            res.redirect("/");
        }

    } catch (error) {
        console.log(error);
    }
}