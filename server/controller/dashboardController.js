const mongoose = require("mongoose");
const Blog = require("../schema/blog");
const User = require("../schema/user");


exports.homepage = async function (req, res) {
    try {
        const username = req.session.myblog.username;
        const limitNumber = 5;
        const blogs = await Blog.find().sort({ "_id": -1 }).limit(limitNumber);
        res.render("dashboard.ejs", { blogs, username });

    } catch (error) {
        console.log(error);
    }
}

exports.myblogspage = async function (req, res) {
    try {
        const username = req.session.myblog.username;
        const existUser = await User.findOne({ username: username }).populate("blog");
        const blogs = existUser.blog;
        res.render("myblogs.ejs", { blogs, username });
    } catch (error) {
        console.log(error);
    }
}

exports.logout = async function (req, res) {
    if (req.session) {
        req.session.destroy(function () {
            res.redirect("/");
        });
    }
}