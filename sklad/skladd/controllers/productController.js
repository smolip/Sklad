const Product = require("../models/productModel.js");
const Movement = require("../models/movementModel.js");

const logMovement = async ({
    user,
    product,
    action,
    quantity,
    previousQuantity,
    newQuantity
}) => {
    await Movement.create({
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        },
        product: {
            id: product._id,
            name: product.name
        },
        action,
        quantity,
        previousQuantity,
        newQuantity
    });
};


const ALLOWED_SORT_FIELDS = ["name", "quantity", "category", "createdAt"];


/**
 * GET /dashboard
 * Výpis + řazení
 */
exports.listProducts = async (req, res) => {
    const sortField = ALLOWED_SORT_FIELDS.includes(req.query.field)
        ? req.query.field
        : "name";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    const products = await Product
        .find()
        .sort({ [sortField]: sortOrder });

    res.render("products/index", {
        products,
        user: req.session.user,
        sort: {
            field: sortField,
            order: sortOrder
        }
    });
};

/**
 * Pomocná funkce – hledání podle jména
 */
exports.listProductsByName = async (name) => {
    return await Product.find({ name });
};

/**
 * POST /dashboard/add
 */
exports.addProduct = async (req, res) => {
    const { field, order } = req.query;
    const qty = parseInt(req.body.quantity, 10);

    if (!req.body.name || qty <= 0) {
        return res.redirect(`/dashboard?field=${field}&order=${order}`);
    }

    const existingProducts = await exports.listProductsByName(req.body.name);

    if (existingProducts.length > 0) {
        existingProducts[0].quantity += qty;
        await existingProducts[0].save();
    } else {
        await Product.create({
            name: req.body.name,
            quantity: qty,
            category: req.body.category || "General",
            createdAt: new Date()
        });

        await logMovement({
            user: req.session.user,
            product: {
                _id: existingProducts[0]?._id || null,
                name: req.body.name
            },
            action: "Vytvořit",       
            quantity: qty,
            previousQuantity: 0,
            newQuantity: qty
        });
    }

    res.redirect(`/dashboard?field=${field}&order=${order}`);
};

/**
 * POST /dashboard/delete/:id
 */
exports.deleteProduct = async (req, res) => {
    const { field, order } = req.query;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.redirect(`/dashboard?field=${field}&order=${order}`);
    }

    await logMovement({
        user: req.session.user,
        product,
        action: "Smazat",
        quantity: product.quantity,
        previousQuantity: product.quantity,
        newQuantity: 0
    });

    await product.deleteOne();


    res.redirect(`/dashboard?field=${field}&order=${order}`);
};

/**
 * POST /dashboard/add-quantity/:id
 */
exports.addQuantity = async (req, res) => {
    const { field, order } = req.query;
    const quantityToAdd = parseInt(req.body.quantity, 10);

    if (quantityToAdd > 0) {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.quantity += quantityToAdd;
            await product.save();

            await logMovement({
                user: req.session.user,
                product,
                action: "Přidat",
                quantity: quantityToAdd,
                previousQuantity: product.quantity - quantityToAdd,
                newQuantity: product.quantity
            });
        }
    }

    res.redirect(`/dashboard?field=${field}&order=${order}`);
};

/**
 * POST /dashboard/delete-quantity/:id
 */
exports.deleteQuantity = async (req, res) => {
    const { field, order } = req.query;
    const quantityToDelete = parseInt(req.body.quantity, 10);

    if (quantityToDelete > 0) {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.quantity = Math.max(
                0,
                product.quantity - quantityToDelete
            );
            await product.save();

            await logMovement({
                user: req.session.user,
                product,
                action: "Odebrat",
                quantity: quantityToDelete,
                previousQuantity: product.quantity + quantityToDelete,
                newQuantity: product.quantity
            });
        }
    }

    res.redirect(`/dashboard?field=${field}&order=${order}`);
};
