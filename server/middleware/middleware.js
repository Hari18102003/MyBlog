exports.isAlreadyLogin = function (req, res, next) {
    if (req.session && req.session.myblog) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

exports.isLogin = function (req, res, next) {
    if (req.session && req.session.myblog) {
        return res.redirect("/dashboard/home");
    } else {
        return next();
    }
}
