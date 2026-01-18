const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.render("auth/login", { error: "Neplatné přihlášení" });
    }

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) {
        return res.render("auth/login", { error: "Neplatné přihlášení" });
    }

    req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    res.redirect("/dashboard");
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
