const User = require("../models/userModel");
const Product = require("../models/productModel");
const bcrypt = require("bcrypt");
const movementLog = require("../models/movementModel");

exports.dashboard = async (req, res) => {
    const users = await User.find();
    const productCount = await Product.countDocuments();
    const logs = await movementLog
        .find()
        .sort({ createdAt: -1 })
        .limit(100);

    res.render("admin/dashboard", {
        users,
        productCount,
        logs,
        user: req.session.user
    });
};

exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
        return res.render("admin/createUser", {
            error: "Uživatel už existuje"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        password: hashedPassword,
        role
    });
    res.redirect("/admin/dashboard");
};


exports.changeRole = async (req, res) => {
    if (req.params.id === req.session.user.id) {
        return res.status(400).send("Nelze změnit vlastní roli");
    }

    await User.findByIdAndUpdate(req.params.id, {
        role: req.body.role
    });

    res.redirect("/admin/dashboard");
};

exports.deleteUser = async (req, res) => {
    if (req.params.id === req.session.user.id) {
        return res.status(400).send("Nelze smazat vlastní účet");
    }

    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
};

exports.resetMovements = async (req, res) => {
    await movementLog.deleteMany({});
    res.redirect("/admin/dashboard");
};
