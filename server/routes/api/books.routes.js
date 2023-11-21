const router = require('express').Router();
const { Book } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const book = await Book.findAll({ order: [['id', 'ASC']] });
    res.status(200).json(book);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOne({ where: { id: bookId } });
    res.status(200).json(book);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const result = await Book.destroy({ where: { id: bookId } });
    if (result > 0) {
      res.status(200).json({ message: 'success' });
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.status(400).json({ meassage });
  }
});

router.post('/', async (req, res) => {
  try {
    const { userId, title, description, img } = req.body;
    const book = await Book.create({
      userId,
      title,
      description,
      img,
    });
    res.status(201).json(book);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { title, description, img, status } = req.body;
    const book = await Book.update(
      {
        title,
        description,
        img,
        status,
      },
      { where: { id: bookId } }
    );
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(400).json();
  }
});

module.exports = router;
