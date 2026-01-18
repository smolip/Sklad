const Product = require("../models/productModel.js");

exports.listProducts = async (req, res) => {
    const products = await Product.find();
    res.render("products/index", { products, user: req.session.user });
};  

exports.listProductsByName = async (name) => {
    const products = await Product.find({ name: name });
    return products;
}

exports.addProduct = async (req, res) => {
    const existingProducts = await exports.listProductsByName(req.body.name);
    if (existingProducts.length > 0) {
        existingProducts[0].quantity += parseInt(req.body.quantity);
        await existingProducts[0].save();
    } else {
        await Product.create({
        name: req.body.name,
        quantity: req.body.quantity
    });
    }

    res.redirect("/dashboard");
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
};
