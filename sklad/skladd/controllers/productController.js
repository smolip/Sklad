const Product = require("../models/productModel.js");

exports.listProducts = async (req, res) => {
    const products = await Product.find();
    res.render("products/index", { products, user: req.session.user });
};  

exports.listProductsByName = async (name) => {
    return await Product.find({ name: name });
}

exports.addProduct = async (req, res) => {
    const existingProducts = await exports.listProductsByName(req.body.name);
    if (existingProducts.length > 0) {
        existingProducts[0].quantity += parseInt(req.body.quantity);
        await existingProducts[0].save();
    } else {
        await Product.create({
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category || "General",
        createdAt: new Date()
    });
    }

    res.redirect("/dashboard");
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
};


exports.addQuantity = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const quantityToAdd = parseInt(req.body.quantity);

    if (product && quantityToAdd > 0) {
        product.quantity += quantityToAdd;
        await product.save();
    }

    res.redirect("/dashboard");
}

exports.deleteQuantity = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const quantityToDelete = parseInt(req.body.quantity);

    if (product && quantityToDelete > 0) {
        product.quantity = Math.max(0, product.quantity - quantityToDelete);
        await product.save();
    }

    res.redirect("/dashboard");
}

exports.sortBy = async (req, res) => {
    const sortField = req.query.field || 'name';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;

    const products = await Product.find().sort({ [sortField]: sortOrder });
    res.render("products/index", { products, user: req.session.user });
}









   
