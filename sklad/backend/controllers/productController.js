const Product = require('../models/Product');

// Získat všechny produkty
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání produktů', error });
  }
};

// Získat produkt podle ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produkt nenalezen' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání produktu', error });
  }
};

// Vytvořit nový produkt
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // Vytvoření produktu z dat v req.body
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření produktu', error });
  }
};

// Aktualizovat produkt podle ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Produkt nenalezen' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při aktualizaci produktu', error });
  }
};

// Smazat produkt podle ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produkt nenalezen' });
    }
    res.json({ message: 'Produkt smazán' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při mazání produktu', error });
  }
}; 