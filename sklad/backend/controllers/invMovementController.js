const invMovement = require('../models/InventoryMovement');

// Získat všechny inventární pohyby
exports.getAllMovements = async (req, res) => {
  try {
    const movements = await invMovement.find().populate('product').populate('performedBy');
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání inventárních pohybů', error });
  }
};

// Získat inventární pohyb podle ID
exports.getMovementById = async (req, res) => {
  try {
    const movement = await invMovement.findById(req.params.id).populate('product').populate('performedBy');
    if (!movement) {
      return res.status(404).json({ message: 'Inventární pohyb nenalezen' });
    }
    res.json(movement);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání inventárního pohybu', error });
  }
};

// Vytvořit nový inventární pohyb
exports.createMovement = async (req, res) => {
  try {
    const movement = await invMovement.create(req.body);
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření inventárního pohybu', error });
  }
};

// Aktualizovat inventární pohyb podle ID
exports.updateMovement = async (req, res) => {
  try {
    const movement = await invMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movement) {
      return res.status(404).json({ message: 'Inventární pohyb nenalezen' });
    }
    res.json(movement);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při aktualizaci inventárního pohybu', error });
  }
};

// Smazat inventární pohyb podle ID
exports.deleteMovement = async (req, res) => {
  try {
    const movement = await invMovement.findByIdAndDelete(req.params.id);
    if (!movement) {
      return res.status(404).json({ message: 'Inventární pohyb nenalezen' });
    }
    res.json({ message: 'Inventární pohyb smazán' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při mazání inventárního pohybu', error });
  }
};  