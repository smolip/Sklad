const User = require('../models/User');

// Získat všechny uživatele
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání uživatelů', error });
  }
};

// Získat uživatele podle ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Uživatel nenalezen' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při získávání uživatele', error });
  }
};

// Vytvořit nového uživatele
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při vytváření uživatele', error });
  }
};

// Aktualizovat uživatele podle ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Uživatel nenalezen' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Chyba při aktualizaci uživatele', error });
  }
};

// Smazat uživatele podle ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Uživatel nenalezen' });
    }
    res.json({ message: 'Uživatel smazán' });
  } catch (error) {
    res.status(500).json({ message: 'Chyba při mazání uživatele', error });
  }
};

